# How Mythic Motors works

> **TL;DR:** This is an arcade racer built around a smooth track curve, procedural geometry, and a small state machine. The complete original game is preserved; the release adds explicit control, timer and resource lifetimes.

## Driving and tracks

Each of the four tracks defines a closed sequence of 3D points, lighting, road style, scenery builder and one chasm. A Three.js Catmull-Rom curve turns those points into a road, side strips and a minimap. The game uses distance along that curve plus a lateral offset, rather than a general rigid-body physics engine.

Acceleration, grip, jump strength and boost power vary by truck. Steering changes the lateral offset; curves add drift and can reduce speed. Road edges bounce the truck inward. Jumping applies vertical velocity and gravity. A chasm has an automatic launch ramp, a gap, and a respawn point before the approach. These are arcade tuning choices, not a vehicle simulation.

The AI rivals use the same curve with difficulty-dependent target speed, wobble and catch-up behavior. There are always three rivals. Each race is two laps. Finish ordering uses actual recorded finish times; rivals who have not finished when the player ends are labeled DNF. Star thresholds depend on elapsed race time. Session bests are tracked by course, across truck and difficulty choices, and reset on reload.

## Power-ups and audio

A shuffled bag produces all three power-ups before refilling. Pickups activate automatically. A rocket adds speed, a jetpack lifts the truck, and a blaster schedules five projectiles. Bullets have their own geometry/material and are retired when they expire or hit an obstacle. Obstacles can share resources with siblings, so destroying one detaches it but leaves those resources until the whole race is cleared.

Models and scenery are generated from Three.js primitives and instancing. Textures are painted on small local canvases. Engine, countdown, jump, collision and power sounds are synthesized with Web Audio. No model, texture or sound asset is fetched from an outside service while playing.

## Screens, controls and time

The game moves through title, track selection, truck selection, countdown, racing and results. Paused is an explicit state that remembers whether the countdown or race was running. Blur or a hidden tab clears inputs and pauses. Resume requires a user action and resumes suspended audio.

Keyboard input and individual touch pointers are tracked separately so releasing one source does not erase another source holding the same control. Cancelling a pointer clears active controls. Track, truck and difficulty choices are native buttons; menu navigation does not consume driving keys.

Countdown, gun bursts and temporary HUD messages use game-time tasks. They advance only while counting down or racing. Every race session has a generation; finishing, restarting, or returning to a menu clears the old generation's tasks. A delayed shot cannot move into a new race or alter a results screen.

Elapsed race time advances with simulation steps, capped at 50 milliseconds per frame. It is not a wall-clock stopwatch. Formatting rounds total tenths before splitting minutes and seconds, so 59.96 seconds displays as 1:00.0.

## Resource ownership

`SG` holds application-owned geometries shared by trucks, item boxes and boost pads. Track changes retain them. The complete old scene, including the player, rivals and detached destroyed obstacles, is traversed together. Unique materials, textures and per-race geometries are deduplicated and disposed once. Instanced meshes also dispose their instance buffers. Arrays and model references are then cleared.

Results may keep the last rendered scene visible until another track is built. Resetting the session cancels controls, effects and looping audio without deleting the scene prematurely.

## Change the game

Edit the `TRACKS`, `TRUCKS` or `POWER_UPS` definitions for the main content. Preserve stable feature counts only while the release documentation still claims them; if you add a track, update its preview, tests and beginner descriptions too. Keep tuning values easy to find. A genuinely new persistence or multiplayer feature needs a deliberate design, not an accidental connection to a personal service.

The original visual identity, four courses, five trucks, all three difficulties and power-ups are retained. The game has no durable save, account, career unlock system or external analytics. Those are explicit limits, not missing setup steps.
