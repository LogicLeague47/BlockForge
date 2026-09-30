// BlockForge Sisu verifier — open-source Xbox Live verification sidecar.
//
// Uses the REAL open-source Sisu library (github.com/df-mc/go-xsapi, MIT)
// for the Microsoft → Xbox Live device-auth chain: device codes, MSA
// tokens, and XSTS tokens all come from Sisu. Only the final Minecraft
// Services REST calls (login, entitlements, profile) are plain HTTPS,
// since those are Mojang endpoints, not Xbox Live.
//
// HTTP API (localhost only):
//   POST /device              → {user_code, verification_uri, device_code, expires_in, interval}
//   POST /poll {device_code}  → {done:false} | {done:true, ...verification} | {failed, reason}
//   POST /refresh {refresh_token} → same as poll success/failure (synchronous)
//   GET  /health              → {ok:true}
//
// Nothing is stored on disk. MS refresh tokens are returned to the caller
// (the player's own browser) and never logged.

package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/df-mc/go-xsapi/v2/xal"
	"github.com/df-mc/go-xsapi/v2/xal/sisu"
	"golang.org/x/oauth2"
)

var conf sisu.Config

type pending struct {
	done   bool
	failed bool
	reason string
	data   map[string]any
}

var (
	mu      sync.Mutex
	pendings = map[string]*pending{}
)

func sisuConf() sisu.Config {
	clientID := os.Getenv("MC_CLIENT_ID")
	if clientID == "" {
		clientID = "0000000048183522"
	}
	// Known-good title parameters (Minecraft Bedrock Android, as used by
	// the open-source gophertunnel tooling wrapping this same library).
	return sisu.Config{
		Config: xal.Config{
			Device:    xal.Device{Type: xal.DeviceTypeAndroid, Version: "13"},
			UserAgent: "XAL Android 2025.04.20250326.000",
			TitleID:   1739947436,
			Sandbox:   "RETAIL",
		},
		ClientID:    clientID,
		RedirectURI: "ms-xal-" + clientID + "://auth",
	}
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func mcCall(method, url, bearer string, body any) (int, []byte, error) {
	var rdr io.Reader
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			return 0, nil, err
		}
		rdr = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, url, rdr)
	if err != nil {
		return 0, nil, err
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if bearer != "" {
		req.Header.Set("Authorization", "Bearer "+bearer)
	}
	client := &http.Client{Timeout: 20 * time.Second}
	res, err := client.Do(req)
	if err != nil {
		return 0, nil, err
	}
	defer res.Body.Close()
	b, err := io.ReadAll(io.LimitReader(res.Body, 1<<20))
	return res.StatusCode, b, err
}

// runChain completes verification from an MSA access token using Sisu:
// session → XSTS (Minecraft RP) → MC login → entitlements → profile.
func runChain(ctx context.Context, msa *oauth2.Token) (map[string]any, string) {
	session := conf.New(oauth2.StaticTokenSource(msa), nil)
	xstsCtx, cancel := context.WithTimeout(ctx, 60*time.Second)
	defer cancel()
	xstsTok, err := session.XSTSToken(xstsCtx, "rp://api.minecraftservices.com/")
	if err != nil {
		msg := err.Error()
		// Surface the common Xbox states readably.
		if contains(msg, "2148916233") {
			return nil, "No Xbox profile on this Microsoft account yet — create one in the Xbox app, then retry."
		}
		if contains(msg, "2148916235") {
			return nil, "Xbox Live is not available in this region."
		}
		if contains(msg, "2148916238") {
			return nil, "Child account — ask a parent to approve Xbox sign-in, then retry."
		}
		return nil, "Xbox sign-in failed. Retry."
	}
	identity := xstsTok.String() // "XBL3.0 x=<uhs>;<token>"
	code, body, err := mcCall("POST", "https://api.minecraftservices.com/authentication/login_with_xbox",
		"", map[string]string{"identityToken": identity})
	if err != nil || code != 200 {
		return nil, "Minecraft login failed. Retry."
	}
	var login struct {
		AccessToken string `json:"access_token"`
		ExpiresIn   int    `json:"expires_in"`
	}
	if json.Unmarshal(body, &login) != nil || login.AccessToken == "" {
		return nil, "Minecraft login failed. Retry."
	}
	// Ownership = the actual "certified account" check.
	ownsJava := false
	if code, body, err := mcCall("GET", "https://api.minecraftservices.com/entitlements/mcstore", login.AccessToken, nil); err == nil && code == 200 {
		var ent struct {
			Items []struct {
				Name string `json:"name"`
			} `json:"items"`
		}
		if json.Unmarshal(body, &ent) == nil {
			for _, it := range ent.Items {
				if it.Name == "game_minecraft" || it.Name == "product_minecraft" {
					ownsJava = true
					break
				}
			}
		}
	}
	name, uuid := "", ""
	if code, body, err := mcCall("GET", "https://api.minecraftservices.com/minecraft/profile", login.AccessToken, nil); err == nil && code == 200 {
		var prof struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		}
		if json.Unmarshal(body, &prof) == nil {
			name, uuid = prof.Name, prof.ID
		}
	}
	return map[string]any{
		"ownsJava":  ownsJava,
		"name":      name,
		"uuid":      uuid,
		"mcToken":   login.AccessToken,
		"expiresIn": login.ExpiresIn,
	}, ""
}

func contains(s, sub string) bool {
	return bytes.Contains([]byte(s), []byte(sub))
}

// finishDevice runs DeviceAccessToken in the background: it blocks until
// the user approves (or the code expires), so it must never run inline.
func finishDevice(deviceCode string, da deviceAuth) {
	ctx, cancel := context.WithTimeout(context.Background(), 16*time.Minute)
	defer cancel()
	tok, err := conf.DeviceAccessToken(ctx, da.resp)
	mu.Lock()
	p := pendings[deviceCode]
	mu.Unlock()
	if p == nil {
		return
	}
	if err != nil {
		mu.Lock()
		p.failed = true
		p.reason = "Code expired — start over."
		mu.Unlock()
		return
	}
	data, reason := runChain(ctx, tok)
	mu.Lock()
	defer mu.Unlock()
	if reason != "" {
		p.failed = true
		p.reason = reason
		return
	}
	p.done = true
	p.data = data
	p.data["msRefresh"] = tok.RefreshToken
}

type deviceAuth struct {
	resp *oauth2.DeviceAuthResponse
}

func handleDevice(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		writeJSON(w, 405, map[string]string{"reason": "POST only"})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 20*time.Second)
	defer cancel()
	da, err := conf.DeviceAuth(ctx)
	if err != nil || da == nil || da.DeviceCode == "" {
		writeJSON(w, 502, map[string]string{"reason": "Microsoft said no. Try again."})
		return
	}
	mu.Lock()
	pendings[da.DeviceCode] = &pending{}
	mu.Unlock()
	go finishDevice(da.DeviceCode, deviceAuth{resp: da})
	uri := da.VerificationURI
	if uri == "" {
		uri = "https://www.microsoft.com/link"
	}
	writeJSON(w, 200, map[string]any{
		"user_code":        da.UserCode,
		"verification_uri": uri,
		"device_code":      da.DeviceCode,
		"expires_in":       int(da.Expiry.Unix() - time.Now().Unix()),
		"interval":         5,
	})
}

func handlePoll(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		writeJSON(w, 405, map[string]string{"reason": "POST only"})
		return
	}
	var in struct {
		DeviceCode string `json:"device_code"`
	}
	if json.NewDecoder(io.LimitReader(r.Body, 2048)).Decode(&in) != nil || in.DeviceCode == "" {
		writeJSON(w, 400, map[string]string{"reason": "Missing device code."})
		return
	}
	mu.Lock()
	p, ok := pendings[in.DeviceCode]
	if ok && (p.done || p.failed) {
		delete(pendings, in.DeviceCode)
	} else if ok {
		// keep waiting
	}
	mu.Unlock()
	if !ok {
		writeJSON(w, 200, map[string]any{"done": false, "failed": true, "reason": "Code expired — start over."})
		return
	}
	if p.failed {
		writeJSON(w, 200, map[string]any{"done": false, "failed": true, "reason": p.reason})
		return
	}
	if !p.done {
		writeJSON(w, 200, map[string]any{"done": false})
		return
	}
	out := map[string]any{"done": true}
	for k, v := range p.data {
		out[k] = v
	}
	writeJSON(w, 200, out)
}

func handleRefresh(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		writeJSON(w, 405, map[string]string{"reason": "POST only"})
		return
	}
	var in struct {
		RefreshToken string `json:"refresh_token"`
	}
	if json.NewDecoder(io.LimitReader(r.Body, 4096)).Decode(&in) != nil || in.RefreshToken == "" {
		writeJSON(w, 400, map[string]string{"reason": "Missing refresh token."})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 90*time.Second)
	defer cancel()
	tok, err := conf.TokenSource(ctx, &oauth2.Token{RefreshToken: in.RefreshToken}).Token()
	if err != nil || tok == nil || tok.AccessToken == "" {
		writeJSON(w, 200, map[string]any{"done": false, "failed": true, "reason": "Session expired — verify again."})
		return
	}
	data, reason := runChain(ctx, tok)
	if reason != "" {
		writeJSON(w, 200, map[string]any{"done": false, "failed": true, "reason": reason})
		return
	}
	data["msRefresh"] = tok.RefreshToken
	if data["msRefresh"] == "" {
		data["msRefresh"] = in.RefreshToken
	}
	out := map[string]any{"done": true}
	for k, v := range data {
		out[k] = v
	}
	writeJSON(w, 200, out)
}

func main() {
	conf = sisuConf()
	port := os.Getenv("SISU_PORT")
	if port == "" {
		port = "12737"
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/device", handleDevice)
	mux.HandleFunc("/poll", handlePoll)
	mux.HandleFunc("/refresh", handleRefresh)
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, map[string]bool{"ok": true})
	})
	fmt.Println("sisu-auth listening on 127.0.0.1:" + port)
	_ = http.ListenAndServe("127.0.0.1:"+port, mux)
}
