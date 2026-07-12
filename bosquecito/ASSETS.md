# Bosquecito — asset plan & missing-sprites list

Legend: ✅ have & wired · 🟢 have in packs (unused) · 🟡 partial / needs a better fit · ❌ missing (need to source)

Embedding rule: everything ships as base64 data URIs inside `bosquecito.html` (one file, no
external assets). Keep the emoji fallback on every `drawSpr`/`iconFor` call.

---

## 1. Characters — the biggest gap
The 6 family members (Andrés, Angélica, Aurora, Leila + dogs Rubble & Gaia) are single static
hand-drawn poses. Cute, but static and simpler than the new environment. This is what to solve first.

- ✅ 1 idle pose each + procedural blink/bob (code).
- 🟢 In packs, generic (not the family): animated **dogs** (GoldenBarking 11f, SleepDog 8f, Jumping),
  animated **cats** (Pochi full sheet, Mochi idle, SleepingCat 5f), Pig, Frog, Bird — plus a
  top-down generic **human** (PixelCrawler Body_A: idle/walk/run/carry/fishing/watering).
- ❌ Sprites that actually match the 4 **people** with expressions + animation.

Three directions (pick one — this unblocks the most):
- **A. Keep custom, animate in code.** I add tail-wag, ear-flop, hop, bounce, and swap-in
  expression frames — no new art needed. Fastest, keeps identity, but limited.
- **B. Cozy animal cast.** Source one cohesive animated pet set and map all 6 to animals.
- **C. Chibi people set.** Source an animated "villager/chibi" set (idle/happy/sad/eat/sleep) for
  the humans, keep dogs as dogs.

Per character we want frames for: idle, blink ✅, happy, sad, sick, sleeping, eating, playing, walk.

## 2. Expressions & emotes  🟡→❌
Happy, love, sad/tear, sick, sleepy, mischief, surprised, hungry. Today these are emoji/code.
❌ a small **pixel emote-bubble set** would make reactions read much better.

## 3. Environment / scene
- ✅ pine + fir trees, rock, bush (wired into the home scene).
- 🟢 unused: extra trees (PixelCrawler 3 models × sizes), snowy/bare trees, more rocks
  (`Rocks.png`), vegetation/farm props, **water tiles** (`Water_tiles.png` → fishing pond).
- ❌ **dog house / casita**, food bowl, bed/cushion, fence, pond edge, day/night tree variants,
  weather (falling leaves / rain).  ← none of these exist in the packs.

## 4. Minigames
- Frutillas — ✅ fruit sprites done.
- Pescá en el río — 🟡 have Fish/Sardines/Shrimp (food pack) + water tiles, not wired. ❌ fishing
  rod, float/bobber, ripple, pond.
- Saltá troncos — 🟡 logs are code-drawn. 🟢 could use a wood/log prop from `Resources.png`.
- Atrapá luciérnagas — 🟡 bee/bug: could use `Bug.png`/`Grub.png`. ❌ a clean firefly + bee.
- Ritmo del bosque — ❌ a pixel music-note (easy, I can draw it).
- Lucecitas (memoria) — abstract pads, fine; could theme to flowers/mushrooms (🟢 `Vegetation.png`).

## 5. Food & consumables
- ✅ wired: apple, cookie, bread, tart, vitamins, ball, strawberry, cherry, peach, pineapple.
- 🟡 to fix: **Gallo pinto** currently shows a bread sprite (no rice&beans exists ❌); medicine
  bottle reads small/unclear (want a clearer ❌ pill/bottle).
- 🟢 unused, kid-friendly, to expand the menu: watermelon, melon, egg, honey, pie, waffles, cheese,
  roll, potato, tomato, corn, carrot, grapes.
- ❌ rice&beans (gallo pinto), clearer medicine, glass of water/agua.

## 6. UI
- 🟢 have (unused): **pastel UI kit**, **cozy UI kit** — panels, buttons, frames, and likely
  hearts/coins/icons to slice.
- Today: CSS panels + emoji icons (🪙 coin, ❤️ hearts, meter icons 🍚😊⚡🫧, dock icons).
- ❌/replace: pixel coin, pixel heart (meters), pixel meter icons, pixel dock icons, framed buttons.

## 7. Effects / particles  🟡
Today emoji + code bursts (✨💛💗😂💫). ❌ nice-to-have pixel FX sheets: sparkle, poof, heart pop,
splash, star.

---

## Recommended priority order
1. **Pick a character direction (A/B/C)** — unblocks the biggest visual gap + animation.
2. **Home props**: dog house, food bowl, bed (you'll need to grab these).
3. Wire **fish + bugs** minigame sprites (mostly already have).
4. **UI icons** (coin / heart / meters) from the cozy kit we already have.
5. Expression/emote set.

## Where to grab the ❌ items (all free / CC0 / free-to-use)
- **Sprout Lands** (Cup Nooble) — cozy farm: characters, animals, **fences, water, buildings, crops**.
  Very on-brand for Bosquecito.
- **Mystic Woods** (Game Endeavor, free) — forest tileset + a character.
- **LimeZu — Modern Interiors** (free sample) — rooms, **furniture, beds, bowls**, characters.
- **Kenney.nl** (CC0) — "Tiny Town", "Tiny Dungeon", UI packs, **FX** packs, particles.
- **itch.io** searches: `free animated pet sprites`, `dog house pixel`, `pixel emotes`,
  `tamagotchi asset`, `cozy ui pixel`, `pixel food`.
- **OpenGameArt.org** — LPC characters + misc props.

When you drop new zips in, I'll auto-extract, montage them for review, embed the winners, and wire
them up — same pipeline as the food/forest passes.
