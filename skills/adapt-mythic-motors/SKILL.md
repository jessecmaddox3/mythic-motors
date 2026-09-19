---
name: adapt-mythic-motors
description: Adapt the Mythic Motors browser racing game while preserving its offline distribution, complete gameplay, resource cleanup, and procedural visual identity.
---

# Adapt Mythic Motors

Read `README.md` and `docs/design.md`, then inspect the actual code and tests. Keep the complete original courses, truck choices, AI rivals and power-ups unless the requested change explicitly changes them.

Content and gameplay live in `public/game.js`; visual styles in `public/game.css`; screens and controls in `public/index.html`. Keep reusable changes in this engine. Personal websites should import a reviewed commit rather than maintain a separate fork.

Treat controls, tasks and resources as owned state. Clear inputs on cancellation and transitions. Use the race-generation task scheduler for delayed race effects, so pause freezes them and old shots cannot enter a new race. Preserve application-owned `SG` geometry when disposing the previous scene. Destroyed obstacles can share resources with surviving siblings; dispose them together at teardown. Retire a projectile on collision as well as expiry.

Keep the single-file download usable without a network or account. Never introduce a personal endpoint, analytics, token, household story, photo or private test fixture. Record origin and license before adding assets. Preserve bundled notices.

Reproduce a gameplay defect with a meaningful test, fix it, and run `npm test` and `npm run build`. Use `python3 scripts/test-browser.py` for gameplay, input, responsive and lifecycle changes. Inspect an actual screenshot after a visual change. Update user-facing instructions only when behavior changes; do not imply persistent saves or multiplayer that the game does not implement.
