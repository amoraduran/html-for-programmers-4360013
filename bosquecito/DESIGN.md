# Bosquecito — Game Design Reference

The north star for what Bosquecito *is*, *why anyone plays it*, and *what to build
next*. Grounded in how the best virtual-pet and cozy mobile games actually retain
players (see **Research notes** at the bottom). Consult this before adding or
changing mechanics — if a change doesn't serve the loop or the fantasy below, it
probably shouldn't ship. This is a living doc: update it as the game evolves.

---

## 1. The fantasy (one sentence)
> *You look after a little Costa Rican family — four people and two dogs — and, by
> showing up and caring, you watch their tiny world bloom with them.*

It is **cozy, guilt-free, and warm** — closer to Neko Atsume's calm than
Tamagotchi's anxiety. There is no death, no punishment, no losing. But unlike a
pure toy, it has **goals and a sense of growth** so there's a reason to keep going.

## 2. What is the player actually doing? (the goal, stated plainly)
The #1 problem today: a new player is dropped in with **no stated goal**. The
answer we commit to:

- **Short-term:** keep whoever you picked happy — the four meters full — and play
  a little game with them. (A 30–60 second session.)
- **Medium-term:** grow **cariño** (the bond / XP) with each family member. Higher
  cariño = that character's **world visibly changes** (biome evolves) and unlocks
  new **food, games, cosmetics, and things to do**.
- **Long-term / collection goal:** bond with **all six** of the family. "La familia
  entera te quiere" — get everyone to a high level. This is the Neko-Atsume-style
  "collect them all" spine that gives the open-ended care loop a destination.

The player picks **one character per session** (like choosing who to visit today),
but the meta-goal is **the whole family**. Both are true and should be said out loud
in onboarding.

## 3. The core loops (nested)

**Moment-to-moment (seconds):** tap/hold the character → they react (pet, hop,
*speak*) → dopamine. Tap a meter → fix it → juice (squash, sparkle, sound).

**Session (30–90 s):** check in → notice a need (the attention icon) → feed/clean/
play → play one minigame → earn 🪙 + cariño → see a bit of progress → leave feeling
good. Sessions must be **short and self-contained** (Neko Atsume principle).

**Daily (the appointment):** meters decay in real time, so coming back tomorrow
there's gentle work to do (Tamagotchi's care loop) — but never punishing. The
**daily gift + streak** is the appointment hook: a reason to open the app that isn't
a chore. Variable little rewards ("what did I get today?") beat fixed ones.

**Long-term (weeks):** level up cariño → biome evolves → unlock games/food/cosmetics
→ eventually bond the whole family → prestige/"todos nivel 10" badge.

> A healthy session should always answer: *what do I do now?* (a visible need or
> goal), *what did I get?* (coins/XP/unlock/reaction), and *why come back?* (streak,
> decaying meters, an almost-there level, a new thing dangling).

## 4. The four retention layers (and where Bosquecito stands)

1. **Care obligation (Tamagotchi).** Meters decay; the pet "needs" you; showing up
   is a promise to *someone*. ✅ Have it. Guardrail: keep it guilt-free — the "el
   bosque lo arropó" rescue, never death.
2. **Cute payoff (Neko Atsume).** The reason you *actually* come back is the adorable
   moment — the reaction, the wag, the little voice line. 🟡 Partial: we have wags,
   hops, strolling. ❌ Missing: **the character talking back**, expressions.
3. **Progression (Pou).** Coins → shop; XP → levels → unlocks (food, games, rooms,
   **cosmetics**). ✅ Coins/XP/levels/some unlocks. 🟡 Thin on *aspirational* unlocks
   (cosmetics, new interactions) — the "meaningful progression" pillar.
4. **Appointment / streak.** A reason to open tomorrow. 🟡 Daily gift exists; streak
   is under-celebrated and under-explained.

## 5. Onboarding / FTUE plan
Research: the **first 60 seconds and first session decide** if they stay; teach **one
thing at a time, by doing**, give a **quick win**, use **progressive disclosure**,
and make the **goal legible**. Today Bosquecito throws you straight in with three
stacked toasts — too much, too fast, no goal.

Target flow:
1. **Title** (redesigned, alive) → one clear button: *"Cuidá a la familia"*.
2. **First pick** → a one-line goal card: *"Elegí a quién visitar. Hacé feliz a cada
   uno y su mundo va a florecer."*
3. **Guided first actions** (progressive, one at a time, driven by real state, not a
   wall of text):
   - Pulse the attention icon → *"Algo necesita. Tocá acá."* → they fix it → **quick
     win** (coins + "¡+X! 🪙").
   - Then reveal Jugar → *"Jugá un ratito para ganar monedas y cariño."*
   - Then the bond bar → *"Con cariño, su mundo cambia."*
4. **Skippable.** Returning players / character #2 shouldn't be re-taught.
5. **First-week framing:** surface the streak and the "bond the whole family" goal
   once the basics land.

Onboarding is **woven into play**, not a separate tutorial screen. One coach-mark at
a time, each cleared by *doing* the thing.

## 6. Economy & progression model
- **Coins (🪙):** earned from care + minigames + daily gift. Spent in the shop on
  food, medicine, toys, and (future) **cosmetics**. Keep the faucet gentle and the
  sinks desirable.
- **Cariño (XP → levels 1–10, "Conocidos → …"):** the relationship. Earned by caring
  and playing. Drives the **biome journey** (already in) and gates unlocks.
- **Unlock ladder (make it aspirational — this is where we're thin):**
  - Food/potions (have) · minigames (all unlocked now — consider gating 1–2 behind
    levels so there's something to reach for) · **cosmetics** (❌ future: dress/shirt
    colours, hats, accessories that actually render) · **new interactions / voice
    lines** (❌ future) · **room/scene decor** (🟡 biome evolves; could add player
    choice later).
- **Prestige:** "toda la familia a nivel alto" badge + a small perpetual perk.

## 7. Emotional design — personality & voice
The cheapest, highest-impact upgrade to the "cute payoff" layer: **let them talk.**
- **Tap vs hold:** *hold* = pet (hearts); a *quick tap* = interact → sometimes a
  **speech bubble** with a line in that character's voice (voseo, family-friendly).
- **Per-character voice** (keep a table in code, easy to expand):
  - **Andrés** — hungry, hearty, outdoorsy dad ("¡Qué hambre! ¿Vamos al río?").
  - **Angélica** — warm, needs her calm ("Tomémonos un respiro, ¿sí?").
  - **Aurora** — 4-yr-old, playful, easily bored ("¡Otra vez! ¡jugá conmigo!").
  - **Leila** — baby, mostly coos/onomatopoeia ("¡ajó! 🍼").
  - **Rubble / Gaia** — dogs: barks + actions, not words ("¡guau! 🐾").
- Lines should **change with cariño level** (shy → familiar → warm) and with **mood/
  need** (hungry line vs happy line), so returning players hear new things.
- Never use the banned words (magia/mágico/hada/duende/deseo). Costa Rican voseo.

## 8. World feel — cohesion & interactivity
- **Prop cohesion:** the painted biomes are high-detail; some of our foreground props
  (certain rocks/plants) read as lower-res and "pasted." Fix by re-grading/reworking
  the worst offenders so foreground objects sit in the scene (shadow, palette, scale).
  We accept a *deliberate* style gap (chunky characters on painterly worlds) but not
  *accidental* pasted-sticker objects.
- **Interactable background:** tapping a prop (rock, bush, planter, doghouse) should
  give a tiny **shiver/hop** + sound. Free delight, teaches "the world responds to
  touch," and rewards curiosity (Neko-Atsume "notice the small things").

## 9. Gap analysis → prioritized backlog
Ranked by impact on *"why would someone play and come back?"*

**P0 — clarity & first impression (do now)**
- [x] Redesign the **title/main menu** — living meadow, whole family strolling,
      goal statement + one clear CTA. *(done)*
- [x] **Onboarding**: first-run goal card + progressive, once-only coach-marks
      that point at the real UI. *(done)*
- [x] **Character speech** (tap-to-talk, per-character, mood/level-aware) — SAYINGS
      + moodKey(); warm 'bond' lines unlock at level 5. *(done)*

**P1 — delight & world**
- [x] **Interactable props** (tap → shiver/hop) — tapProp() + propAnim. *(done)*
- [x] **Prop cohesion** — rocks/bushes nestled into base grass; ambient grade +
      contact shadows unify them. *(partial — deeper prop re-art still possible)*
- [ ] **Streak/appointment**: make the daily gift + streak visible and rewarding;
      a small "come back tomorrow" nudge. *(next)*

**P2 — depth & aspiration (near future)**
- [x] **Cosmetics — outfit colours**: unlockable shirt/dress/top colours per person
      (palette-swapped idle/walk/hurt sheets → `pa_*__<colour>`, resolveSheet applies
      them everywhere, swatch picker in Cosas gated by cariño level). *(done)*
- [x] **Cosmetics — dog collar colours**: Rubble & Gaia get an unlockable collar in
      four colours each, drawn on the neck (`drawCollar` + `COLLAR_POS` per-dog anchor);
      same swatch picker, gated by cariño level. The old single "Collar dorado"
      accessory is hidden for dogs (the colour picker, which includes dorado, replaces
      it) so a dog never wears two collars. *(done)*
- [x] **Cosmetics — hats (people)**: four hand-drawn head accessories — gorra (cap),
      sombrero de paja (very Costa Rican), gorro de lana, gorrito de fiesta — added to
      `ACCS`/`HATS`, drawn procedurally in `drawAcc` in the moño/corona style, lowered
      onto the head (bigger drop for villager frames than grid kids). Gated by cariño
      level (1/5/7/9) with milestone toasts. Hats are people-only; dogs are side-profile
      so a front hat reads pasted — they keep the collar system instead. *(done)*
      Considered the uploaded Raven Fantasy + medieval-NPC packs: fantasy combat helmets
      / wizard hoods (off-theme, brush the no-`magia` rule) and portraits of other
      characters — neither fit, so hats were built to match the game's cozy style.
      Still open: more hat variety / seasonal cosmetics.
- [ ] **Meaningful unlock gating**: reach-for-it games/food/interactions by level.
- [x] **Personalized face portraits + expressions**: per-character pixel faces
      (`FACE` + `drawFaceInto`/`facePortrait`) grounded in the family's real photos
      (warm skin tones, near-black hair, brown eyes; Andrés tall man bun + undercut +
      candado; Angélica olive skin + gold hoops + chin mole; Aurora two pigtails +
      earrings + cheek/chin moles; Leila baby with clipped tufts; Rubble cream boxer
      with an eye patch; Gaia lean chocolate dachshund). Expression set
      (happy/hungry/tired/dirty/sad/sick) maps from mood. **Surfaced in three places:**
      the tap-to-talk speech bubble, the character-select cards (each member's current
      mood), and a persistent avatar in the play-screen top bar (always on, tracks
      mood). *(done — keep tuning likeness per new reference)*
- [ ] **Notifications** (if ever packaged as an app): the real appointment hook.

**P3 — collection meta**
- [ ] Explicit **"bond the whole family"** tracker + prestige reward.

## 11. Persistence, hosting & offline (technical)

How a player keeps their progress — and what changes when the game is hosted
(Vercel / a domain) instead of opened as a local file.

**Offline progression works with no server.** Each save stamps `P.ts =
Date.now()`. On reopen the game computes elapsed time and applies decay /
sleep-regen for the gap (gentled by `OFFLINE_FACTOR = 0.35`, floored so stats
never hit zero — the "el bosque lo arropó" rescue covers the rest). So the pet
"lived" while away — simulated on next open, exactly like Tamagotchi/Neko
Atsume. No background process, no backend required.

**Where the save lives.** `localStorage`, per **browser, per device** (keys
`bosquecito_*`, behind the `LS` wrapper with a memory fallback). Survives closing
the tab/app and restarting the phone. **Lost** on: clearing browser data,
switching device/browser, or iOS Safari's ~7-day eviction of unused sites. No
cross-device sync by itself. For a family where each person plays on their own
phone, that's fine — instant play, no login.

**Three layers, cheapest → most robust (all implemented / scaffolded):**

1. **PWA (installable + offline).** Inline web manifest + hand-drawn app icon +
   apple-touch-icon in the `<head>` make the single HTML installable ("Add to
   Home Screen" on iOS, Android shortcut) and it opens standalone. Optional
   sibling **`sw.js`** (cache-first service worker, registered gracefully) gives
   bulletproof offline + Android install; if it isn't deployed alongside, the
   game still runs. *This is also the only path to push notifications later
   (the real "come back tomorrow" hook) — limited on iOS, fine on Android.*

2. **Backup code (no backend).** The "⚙️ Respaldo" panel packs every
   `bosquecito_*` key into a copyable `BQ1-…` code (`exportSave`/`parseSave`/
   `applySaveObj`). Copy it to back up before clearing cache, or paste it on a
   new phone to restore. Keeps the game a single file.

3. **Cloud sync via a code (opt-in backend).** Same `BQ1-` blob, stored under a
   short `BOSQUE-XXXXX` code. Off by default (`window.BOSQUECITO_SYNC_URL`
   empty) so the single-file build is unaffected. To turn on:
   - Deploy the **`bosquecito/` folder** to Vercel (not just the HTML).
   - Vercel → Storage → create a **KV** database (Upstash Redis, free tier); it
     injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`. `@vercel/kv` is in
     `package.json`; the function is **`api/save.js`** (GET `?code=` / POST
     `{code,data}`).
   - Set `window.BOSQUECITO_SYNC_URL = '/api/save'` in the HTML. The "☁️ Nube"
     section then appears in Respaldo: save under your code, or pull with another
     device's code. No accounts, no personal data.

**Recommendation & platform.** Stay on the **web** — instant, no install,
shareable by link, cross-platform. Do PWA + backup-code now (covers ~90% of the
worry, no server); add cloud sync only if you truly want the same pet on phone
*and* tablet. A server-authoritative model is *not* needed for offline
progression; it would only matter for anti-cheat (clock tampering) or push
notifications. Full accounts (email/Google) are overkill for a family game.

## 10. Design guardrails (do not violate)
- Cozy, guilt-free, **no death / no punishment** (rescue instead).
- **Low-pressure but goal-ful:** always a gentle "what next," never a fail state.
- **Short sessions**; respect the player's time.
- All visible text: **Costa Rican voseo**; never magia/mágico/hada/duende/deseo.
- Every gesture keeps a **button fallback**; respect **reduce-motion**.
- One file, no external assets; verify (`node --check` + suite) before shipping.

---

## Research notes (sources)
Synthesized July 2026. Key takeaways used above:

- **Neko Atsume — low pressure + collection + cute payoff + short sessions.** No
  timers/levels/failure; passive progression; the real reward is the adorable
  moment; a "collect them all" goal keeps players checking back.
  - Game Design Breakdown: The Simplicity of Neko Atsume — https://alexiamandeville.medium.com/game-design-breakdown-the-simplicity-of-neko-atsume-a8616a937a47
  - Neko Atsume — Wikipedia — https://en.wikipedia.org/wiki/Neko_Atsume
- **Tamagotchi — care loop + need bars + emotional obligation.** Notify status →
  player acts → values update; 24/7 attention creates connection; a pet is "a
  promise to someone," which is why showing up matters.
  - Pet Companion Design: Why Virtual Pets Win Retention (Yu-kai Chou) — https://yukaichou.com/advanced-gamification/the-pet-companion-design-in-gamification/
  - Tamagotchi, FarmVille, and "Fun Pain" (Game Developer) — https://www.gamedeveloper.com/design/tamagotchi-farmville-and-quot-fun-pain-quot-
- **FTUE / onboarding — first 60 s & first session decide.** Teach one mechanic at a
  time by doing; progressive disclosure; instant play → quick win → reward; mini-goals
  and progress cues; make it skippable.
  - FTUE in Mobile Games (Udonis) — https://www.blog.udonis.co/mobile-marketing/mobile-games/first-time-user-experience
  - Best Practices for Mobile Game Onboarding (AC&A) — https://adriancrook.com/best-practices-for-mobile-game-onboarding/
- **F2P retention — daily rewards, streaks, appointment mechanics, variable rewards,
  meaningful progression.** Habit loop (cue→routine→reward); streaks grow; the return
  driver is the *possibility* of reward; players quit when progression stalls.
  - Daily Rewards, Streaks, and Battle Passes in Player Retention — https://www.designthegame.com/learning/tutorial/daily-rewards-streaks-battle-passes-player-retention
  - Appointment Mechanics (GameRefinery) — https://www.gamerefinery.com/keep-your-players-in-game-with-appointment-mechanics/
- **Pou — the care+minigames+economy+customization template.** Feed/clean/play →
  earn coins in minigames → spend on food/potions/**outfits/wallpapers** → level up
  to unlock food, clothes, scenes. Customization is a core progression sink.
  - Pou (game) — Poupedia — https://poupedia.com/Pou_(game)
  - Pou (Video Game) — TV Tropes — https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/Pou
