# Phase 2: Shader Overhaul Plan

## Overview
Replace Three.js MeshLambertMaterial with custom ShaderMaterial on all chunk
geometry, retexture leaves with real transparency holes, and add screen-space
god rays post-processing.

## 1. Custom Shader System (`src/shaders.js`)

### Opaque Terrain Shader
- Vertex: pass position, UV, color (AO/biome tint), normal, worldPosition
- Fragment:
  - Sample atlas texture (nearest filter, no mipmap)
  - Multiply by vertex color (baked AO + biome tint)
  - Directional light (sun) with shadow mapping
  - Ambient + hemisphere light
  - Simple fog (linear, matches scene fog)
  - Approximate diffuse (no normal map needed for pixel art)

### Transparent Block Shader (leaves, glass, glass panes)
- Same as opaque but:
  - `transparent: true`, `depthWrite: false`
  - Alpha test for leaf holes (discard fragments below threshold)
  - Alpha comes from atlas texture + vertex color alpha

### Water Shader
- Vertex: add sine wave displacement for surface animation
- Fragment:
  - Blue tint (0x2f62bc base)
  - Animated UV scroll for ripple effect
  - Semi-transparent (opacity ~0.55)
  - Depth-based fade (fade out at distance)

## 2. Shadow Mapping

### Current state
- Single directional light shadow (4096x4096 PCFSoft)
- Camera frustum used for shadow frustum

### Changes
- Keep existing shadow map setup (it works)
- Add shadow map uniform to opaque shader
- Sample shadow map in fragment shader for directional shadows
- Use `bias` and `normalBias` already set on the light
- For transparent blocks: skip shadow receiving (too expensive, MC doesn't do it)

## 3. Leaf Retexture (`src/tiles.js`)

### Current `leaves()` painter (line 306)
- Solid green fill with painted darker patches
- No actual transparent pixels

### New approach
- Draw leaf pattern with holes:
  - Base: scattered green clumps (leaf clusters)
  - Gaps: leave pixels transparent (alpha = 0)
  - Result: ~60-70% opaque, 30-40% transparent holes
- Same for `dark_leaves()` (line 920)
- The atlas canvas already supports alpha (it's a Canvas2D)

### Meshing impact
- Leaves already go into `trans` (transparent) mesh bucket
- `alphaTest: 0.1` in transparent material handles the discard
- No meshing changes needed — just the texture

## 4. Screen-Space God Rays (`src/godrays.js`)

### Algorithm (Hugo Elias / NVIDIA approach)
1. Render scene normally to framebuffer
2. Extract bright pixels (sun disk + sky) to smaller buffer
3. Blur horizontally, then vertically (two-pass Gaussian)
4. Radial blur from sun's screen-space position
5. Additively blend result onto scene

### Implementation
- Create `GodRayPass` class using Three.js EffectComposer
- Needs: RenderPass, ShaderPass (custom godray shader), UnrealBloomPass (optional)
- Sun position projected to screen space each frame
- Intensity varies with time of day (full at noon, zero at night)

### Dependencies to add
- `three/addons/postprocessing/EffectComposer`
- `three/addons/postprocessing/RenderPass`
- `three/addons/postprocessing/ShaderPass`
- `three/addons/postprocessing/UnrealBloomPass` (optional, for bloom)

## 5. Integration Points

### Files to create
- `src/shaders.js` — all GLSL shader code + material factory
- `src/godrays.js` — post-processing pipeline

### Files to modify
- `src/chunkmesh.js` — swap materials from MeshLambertMaterial to custom
- `src/tiles.js` — rewrite `leaves()` and `dark_leaves()` painters
- `src/main.js` — wire up EffectComposer, pass renderer through
- `src/viewmodel.js` — keep separate simple material (doesn't need terrain shader)

### Files unchanged
- `src/mesher.js` — vertex layout stays the same (pos, uv, col, nor)
- `src/world.js`, `src/player.js`, etc. — no changes

## 6. Performance Considerations
- God rays at half resolution (cheap)
- Shadow map already 4096 — adequate for this scale
- Opaque shader is simpler than MeshLambert (no PBR overhead)
- Water shader adds sine computation per vertex — negligible
- Total new GPU cost: ~15-20% over current (offset by removing Lambert's PBR eval)

## 7. Build Order
1. Create `src/shaders.js` with all three shader programs
2. Update `src/chunkmesh.js` to use new materials
3. Retexture leaves in `src/tiles.js`
4. Create `src/godrays.js` post-processing
5. Wire everything in `src/main.js`
6. Test and tune
