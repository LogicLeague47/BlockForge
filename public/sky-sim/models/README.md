# Drop Ultra-HD models here

1. Download a Cessna-172-class airplane as **GLB** (glTF Binary), e.g. from:
   - https://poly.pizza (filter: CC0, "cessna" / "airplane")
   - https://kenney.nl/assets (CC0, "planes")
   - https://sketchfab.com (filter: Downloadable, CC-BY / CC0)
2. Save it as `plane.glb` in THIS folder (`public/models/plane.glb`).
3. The sim auto-detects it on next reload. Procedural plane is the fallback.
4. Add attribution to `CREDITS.md` (required for CC-BY).

Ideal model: single mesh with separately-named nodes for
`aileron_L/R, elevator, rudder, flap_L/R, prop, gear_*` so control
surfaces can animate. If yours is a single fused mesh it will still
render — surface animation just stays on the fallback.
