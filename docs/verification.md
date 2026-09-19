# Verification

> **TL;DR:** The complete offline file passed ten core regression tests and isolated Chromium gameplay checks on September 19, 2026, with all network requests blocked. The scope below distinguishes rendered selections from completed races.

The browser suite rendered all **60 track/truck/difficulty combinations**, each with three rivals. It completed simulated two-lap races on all four tracks using the fastest truck and Easy rivals, exercising every power-up. It separately checked chasm recovery, keyboard steering/jump/boost, actual touch start/cancellation, pause and countdown freeze, stale-shot cancellation, credits, WebGL startup failure and lost-context help. It does not claim 60 fully played races.

GPU geometry/texture counts were identical on every repeated four-track cycle after rendering all objects: Forest 60/4, Volcano 81/4, Crystal 59/4, Sky 78/4. This checks the cleanup behavior; it is not a promise about every device's frame rate or graphics driver.

The unit tests reproduce time rollover, focus-loss controls, pointer cancellation, projectile collision retirement, deduplicated teardown with retained shared geometry, paused/cancelled tasks, stale countdown/gun callbacks, Escape's default action and sound-button focus. All ten pass.

Phone controls and layouts were checked at 320, 390 and 768 pixels. Desktop gameplay and selection screenshots were checked at 1280 pixels. The exact standalone HTML loads its code, fonts and 3D library without making an external request. No user profile, account or backend is involved.

Tested with Python Playwright 1.58.0 and its Chromium browser. Other browsers, real phones, screen readers and long physical play sessions remain additional compatibility work. The game relies on WebGL and uses visual racing mechanics; it is not a nonvisual accessible game. Frame time is capped for simulation stability.

Run the checks from the source folder:

```sh
npm test
npm run build
python3 scripts/test-browser.py
```

For the Python browser check, install Playwright and its browser in your own environment:

```sh
python3 -m pip install playwright==1.58.0
python3 -m playwright install chromium
```

CI also uses Node 22 and 24 for the core suite, with a separate disposable Linux Chromium job. The offline file is the build output in `artifacts/Mythic-Motors.html`.
