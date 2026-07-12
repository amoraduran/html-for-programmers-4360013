# Bosquecito — virtual pet game (familia del bosque)

Tamagotchi-style mobile web game featuring 6 pixel-art family characters
(Andrés, Angélica, Aurora, Leila, Rubble the boxer, Gaia the dachshund).
Single self-contained file: `bosquecito.html`. No build step, no dependencies.
Deployed by dragging the file into Vercel.

## Architecture (all inside bosquecito.html)

- One `<style>` block, one `<script>` block. Everything is vanilla JS + canvas.
- Sections are marked with `/* ============ NAME ============ */` comments:
  sprites/engine (PAL, SPRITES, EYES, FOOT, TRAITS, drawSprite), 8-bit audio
  (tone/sfx/music), game data (FOODS, ACCS, TRAV, REACT, LOGROS, MISSION_POOL),
  state (G global wallet/inventory, P active pet, per-char saves via LS wrapper),
  real-time tick (decay), scene/draw loop, unified pointer router (grab/fling/
  tickle/scrub/drag-food), 3 minigames (guess, fruit, run), panels, UX shell.
- Persistence: localStorage behind the `LS` try/catch wrapper (memory fallback).
  Keys: `bosquecito_<char>` and `bosquecito_g`. Never call localStorage directly.
- Character sprites are char-grids (strings of palette letters). All rows in a
  sprite MUST be equal width. Palette letters live in PAL. EYES = [colL, colR,
  row, extraW?] for blink; FOOT = empty rows at sprite bottom (ground alignment).
- Pixel-art item sprites (food, fruit, items) are embedded as base64 data URIs
  in `SPR_DATA` (still one file, no external fetch). `SPR_IMG` holds the loaded
  Images; `drawSpr(name, cx, cy, d)` draws one centered on canvas and returns
  false if unavailable (callers fall back to the emoji). `iconFor(k, emoji)`
  returns the sprite `<img class="pxicon">` for HTML lists, emoji fallback
  otherwise. SPR_DATA keys for foods match the FOODS ids (manzana, confite,
  pinto, queque, medicina, pelota). Keep the emoji fallbacks intact — the suite
  and offline canvas rely on them.
- Frame animation: `CHAR_ANIM[key]` = {sheet, fw, fh, frames, fps, disp}; the
  people (andres, angelica) use recolored FreeVillager idle sheets, dogs + kids
  (aurora toddler, leila baby) keep their drawn char-grids. `CHAR_WALK[key]` =
  the 6-frame FreeVillager WALK cycle, recolored to the family by the same
  idle→family colour map (see scratchpad/walk_recolor.py — skip transparent
  source pixels or the bg fills with the outline colour). Used by Saltá troncos
  (frame advances with run.scroll; a leap frame mid-air) and Frutillas (walks
  facing its move direction, idle when still). Dogs' CHAR_ANIM already IS a walk.
  In the home scene, settled awake characters STROLL (pick a target, walk there
  via `stroll`/charOX, then drift back); the sprite shows the walk cycle whenever
  `_oxVel` (charOX velocity) is non-trivial, flipped by `walkDir`. `CHAR_HURT` is
  the recolored 2-frame hurt sheet — frame 1 (hunched recoil) shows when a person
  is P.sick or dizzy; frame 0 is the RPG red-flash, unused. All new motion is
  reduce-motion gated. `drawAnimFrame(a,
  cx, groundY, opts)` draws the current frame (opts.h overrides height; opts.frame
  forces one; opts.flip mirrors). The main draw + fruit/run minigames branch on
  CHAR_ANIM: animated chars draw a villager frame, others draw the grid. `pw/ph`
  are the rendered dims used by both paths (hitbox, shadow, mood icons). Dogs are
  scaled down via `PET_SCALE`/`petSize()` (their grids are bigger than people's).
  Scene props (trees, rock, bush, doghouse, bowl) draw via `drawSprBottom`.
  Full sprite gap-analysis + sourcing notes live in ASSETS.md.
- Scene depth (outdoor `draw()`): far hill silhouette + a small far tree row
  (parallax) + horizon haze, then a cached ground gradient (`_groundGrad`),
  then the near tree row; SCENE props get a contact-shadow ellipse; grass/
  flowers are drawn as clustered tufts (bigger toward the foreground), not a
  uniform speckle. During an action minigame (`inGame`) the yard props +
  foliage are skipped so each game paints its own scene (real river for fish,
  dusk + fireflies for bugs, flower pads for memoria, hit-zone for ritmo).
- Accessories (`drawAcc`) anchor to each animated sprite's real head via
  `ACC_ANCHOR[cur]` (villagers sit in the left quarter of their frame, so a
  box-center anchor floats the moño/corona off the head — don't use it).
- Painted biome stages: `BG_DATA`/`BG_IMG` hold 8 craftpix scenes (340×250,
  48-col). `BIOME[key]` = {fg1,fg2 (foreground grass colors), lift (px the
  painting shifts up), amb (light color-grade)}. `BG_JOURNEY[cur]` is the
  per-character progression (3 biomes by cariño level 1-3/4-6/7-10); `bgKey()`
  resolves character+level → biome key. `drawSceneBG()` paints the lifted
  image, then `drawNightSky()` at night (dark mask + stars + moon + animated
  aurora ribbons, over ANY biome), then `drawFgBand()` — our grass foreground
  drawn IN FRONT (soft grass edge, contact shadow, tufts) at `FG_TOP` so
  characters/props stand on real ground, never on painted water/sky. `_grade`/
  `applyGrade()` washes the whole frame (bg+props+chars) to match the scene's
  light; it runs in the main scene and every minigame. Everything falls back
  to the procedural depth scene when an image isn't ready, so the jsdom suite
  still passes (drawSceneBG returns false without a loaded image).

## Hard rules (do not violate)

- All visible text: Costa Rican Spanish with voseo (tocá, elegí, alzalo).
- NEVER use these words in visible text: magia, mágico, hada, duende, deseo
  (family constraint). Internal identifiers may keep legacy names.
- Family-friendly always: no death mechanics (use the "el bosque lo arropó"
  rescue), no dark themes.
- Keep it one file. No frameworks, no external assets (the font is embedded).
- Gestures are optional delights: every gesture must keep a button fallback.
- New rewards/actions must route coins through `addCoins()` (juice + save),
  XP through `addXP()`, and missions through `missionProg()`.

## Verify before declaring done (always)

```bash
# 1. syntax
node -e "const m=require('fs').readFileSync('bosquecito.html','utf8').match(/<script>([\s\S]*)<\/script>/); require('fs').writeFileSync('/tmp/b.js', m[1])" && node --check /tmp/b.js

# 2. full behavior suite (39 tests, jsdom; npm i jsdom first time)
node tests/suite.js
```

Also grep-audit after UI changes: every `$('id')` in JS must exist as an
HTML id, every `onclick="fn("` must have a `function fn`, no duplicate
function declarations, and the banned vocabulary list above must stay absent
from visible (non-script) content.

## Testing conventions

- `tests/suite.js` boots the real file in jsdom (canvas + AudioContext stubbed),
  injects a `window.__D` accessor for script-scoped state, and drives real
  PointerEvents. Add a test whenever you add a mechanic; simulate the pointer
  path, not just the function call.
- Known gotchas the suite exists to catch: physics states that never settle
  (velocity must reach 0), seeded pickers that can loop forever, functions
  referenced before defined, interactions blocked by leftover state
  (dizzy/heldChar/dropFood must reset on pick() and endGame()).

## Design language

- Pixel aesthetic: 'Pixelify Sans' (cozy rounded pixel font, embedded as a
  base64 @font-face so the game is fully self-contained — no external assets at
  all now), palette in CSS `:root` (--plum borders,
  --gold highlights, --petal pink, forest greens). Chunky 3px borders +
  bottom box-shadow for the pressed-button look.
- The play screen is a "consolita" (Tamagotchi shell): canvas screen, tappable
  colored stat meters, 4-button care dock, small nav row. Meters tap to their
  fix; the attention icon shows the actual need and taps to fix it.
- Juice on everything: squash & stretch, floatText, burst, shake, vib, sfx.

## Deploy

User drags `bosquecito.html` into Vercel manually. Saves are per-device
(localStorage), so never rename the storage keys without a migration.
