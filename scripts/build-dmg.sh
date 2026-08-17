#!/bin/bash
# Build BlockForge.app and wrap it into a standard install .dmg:
#   BlockForge.app  +  Applications  (drag-and-drop alias)
# macOS-only (uses hdiutil/sips/iconutil/SetFile). Run after `npm run build`.
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
OUT="$ROOT/downloads"
APP="$OUT/BlockForge.app"
STAGE="$OUT/dmg-stage"
ICON_SRC="$ROOT/public/BlockForge.png"

if [ ! -d "$DIST" ]; then
  echo "[DMG] dist/ missing — run npm run build first"
  exit 1
fi
if [ "$(uname)" != "Darwin" ]; then
  echo "[DMG] requires macOS (hdiutil)"
  exit 1
fi

mkdir -p "$OUT"
rm -rf "$APP" "$STAGE"

mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

cat > "$APP/Contents/MacOS/BlockForge" <<'EOF'
#!/bin/bash
RES="$(cd "$(dirname "$0")/../Resources" && pwd)"
open "$RES/index.html"
EOF
chmod +x "$APP/Contents/MacOS/BlockForge"

cat > "$APP/Contents/Info.plist" <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>BlockForge</string>
  <key>CFBundleDisplayName</key><string>BlockForge</string>
  <key>CFBundleIdentifier</key><string>com.blockforge.game</string>
  <key>CFBundleVersion</key><string>1.0</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>CFBundleExecutable</key><string>BlockForge</string>
  <key>CFBundleIconFile</key><string>BlockForge</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSMinimumSystemVersion</key><string>10.13</string>
  <key>NSHighResolutionCapable</key><true/>
</dict>
</plist>
EOF

cp -R "$DIST"/. "$APP/Contents/Resources/"
rm -rf "$APP/Contents/Resources/downloads" "$APP/Contents/Resources/.DS_Store"

# App icon from the favicon (BlockForge.png)
if [ ! -f "$ICON_SRC" ]; then ICON_SRC="$DIST/BlockForge.png"; fi
if [ -f "$ICON_SRC" ]; then
  ICONSET="$OUT/BlockForge.iconset"
  rm -rf "$ICONSET"
  mkdir -p "$ICONSET"
  for s in 16 32 128 256 512; do
    d=$((s * 2))
    sips -z "$s" "$s" "$ICON_SRC" --out "$ICONSET/icon_${s}x${s}.png" >/dev/null 2>&1 || true
    sips -z "$d" "$d" "$ICON_SRC" --out "$ICONSET/icon_${s}x${s}@2x.png" >/dev/null 2>&1 || true
  done
  iconutil -c icns "$ICONSET" -o "$APP/Contents/Resources/BlockForge.icns"
  rm -rf "$ICONSET"
fi

for arch in arm64 x64; do
  DMG="$OUT/BlockForge-mac-$arch.dmg"
  TMP="$OUT/BlockForge-mac-$arch-tmp.dmg"

  # Standard install layout: app + Applications alias for drag-and-drop
  mkdir -p "$STAGE"
  cp -R "$APP" "$STAGE/BlockForge.app"
  ln -sf /Applications "$STAGE/Applications"
  SetFile -a B "$STAGE/BlockForge.app" 2>/dev/null || true

  hdiutil create -volname "BlockForge" -srcfolder "$STAGE" -ov -format UDRW "$TMP" >/dev/null

  # Apply the favicon as the mounted volume logo
  MOUNT="$OUT/blockforge-mount"
  rm -rf "$MOUNT"
  mkdir -p "$MOUNT"
  hdiutil attach "$TMP" -mountpoint "$MOUNT" -nobrowse >/dev/null
  cp "$APP/Contents/Resources/BlockForge.icns" "$MOUNT/.VolumeIcon.icns"
  SetFile -a C "$MOUNT" 2>/dev/null || true
  # Bundle bit -> Finder shows BlockForge.app as an app, not a folder
  SetFile -a B "$MOUNT/BlockForge.app" 2>/dev/null || true
  SetFile -a C "$MOUNT/BlockForge.app" 2>/dev/null || true
  hdiutil detach "$MOUNT" >/dev/null 2>&1 || true
  rm -rf "$MOUNT"

  rm -f "$DMG"
  hdiutil convert "$TMP" -format UDZO -o "$DMG" >/dev/null
  rm -rf "$STAGE" "$TMP"
  echo "[DMG] created $DMG ($(du -h "$DMG" | cut -f1))"
done

rm -rf "$APP"
echo "[DMG] Done"
