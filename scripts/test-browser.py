#!/usr/bin/env python3
"""Exercise the exact offline game with network blocked and invented play only."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

ROOT = Path(__file__).resolve().parents[1]
ARTIFACT = ROOT / 'artifacts/Mythic-Motors.html'
OUT = ROOT / 'artifacts/browser-checks'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width':1280,'height':800})
        external, errors = [], []
        def block(route):
            external.append(route.request.url); route.abort()
        context.route('http://**/*', block); context.route('https://**/*', block)
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(ARTIFACT.as_uri())
        page.wait_for_function("gameState==='title' && !!renderer")
        assert not page.locator('#graphicsError').is_visible()
        page.screenshot(path=str(OUT/'title-1280.png'))
        page.get_by_role('button', name='Sound on', exact=True).click()
        page.get_by_role('button', name='RACE', exact=True).click()
        assert page.get_by_role('button', name='Enchanted Forest, Easy', exact=True).count() == 1
        # Native buttons support a complete keyboard-only selection path.
        page.get_by_role('button', name='Enchanted Forest, Easy', exact=True).focus(); page.keyboard.press('Enter')
        page.get_by_role('button', name='Mossy Mutt', exact=True).focus(); page.keyboard.press('Enter')
        page.get_by_role('button', name='Pause', exact=True).click()
        before = page.evaluate('JSON.stringify([...raceTasks].map(t=>t.remaining))')
        page.wait_for_timeout(200)
        assert page.evaluate('gameState') == 'paused'
        assert page.evaluate('JSON.stringify([...raceTasks].map(t=>t.remaining))') == before
        page.get_by_role('button', name='Resume', exact=True).click()
        # The simulation caps each frame at 50 ms. A software-rendered CI
        # machine can take longer in wall time for the real countdown to run.
        try:
            page.wait_for_function("gameState==='racing'", timeout=60000, polling=100)
        except Exception:
            print('Countdown diagnostics:', page.evaluate("({state:gameState,remaining:[...raceTasks].map(t=>t.remaining),frames:renderer.info.render.frame,hidden:document.hidden,focused:document.hasFocus()})"), flush=True)
            raise
        page.keyboard.press('Escape');assert page.evaluate('gameState') == 'paused'
        page.keyboard.press('Escape');assert page.evaluate('gameState') == 'racing'
        page.get_by_role('button', name='Sound off', exact=True).click()
        assert page.evaluate('document.activeElement === renderer.domElement')
        page.get_by_role('button', name='Sound on', exact=True).click()
        page.keyboard.down('ArrowUp');page.wait_for_timeout(300)
        assert page.evaluate('playerSpeed') > 0
        page.evaluate("window.dispatchEvent(new Event('blur'))")
        assert page.evaluate('gameState') == 'paused' and not page.evaluate('keys.ArrowUp')
        page.keyboard.up('ArrowUp')
        page.get_by_role('button', name='Resume', exact=True).click()
        page.keyboard.down('ArrowRight');page.wait_for_timeout(100);page.keyboard.up('ArrowRight')
        assert page.evaluate('playerLateral') > 0
        page.keyboard.press('Space');page.wait_for_timeout(100)
        assert page.evaluate('jumpCharge') < 100
        page.keyboard.down('Shift');page.wait_for_timeout(100);page.keyboard.up('Shift')
        assert page.evaluate('boostFuel') < 100
        page.screenshot(path=str(OUT/'race-1280.png'))
        # Every track/truck/difficulty remains selectable and renders with 3 rivals.
        combos = 0
        for track in range(4):
            for truck in range(5):
                for difficulty in range(3):
                    result = page.evaluate('''([track,truck,difficulty]) => {
                      showTrackSelect();selectedTrack=track;showSelect();setDifficulty(difficulty);startRace(truck);
                      renderer.render(scene,camera);
                      return {rivals:aiCars.length,geometry:renderer.info.memory.geometries,track:TRACKS[selectedTrack].id};
                    }''', [track,truck,difficulty])
                    assert result['rivals'] == 3 and result['geometry'] > 0
                    combos += 1
        print('Rendered all 60 selections.', flush=True)
        # Render all owned objects to make resource counts independent of culling.
        cycles = []
        for cycle in range(3):
            counts = []
            for track in range(4):
                counts.append(page.evaluate('''track => {
                  selectedTrack=track;startRace(4);
                  scene.traverse(object=>object.frustumCulled=false);renderer.render(scene,camera);
                  return {...renderer.info.memory};
                }''', track))
            cycles.append(counts)
        assert cycles[1] == cycles[2], cycles
        print('GPU resource counts plateau across all tracks.', flush=True)
        # Exercise actual physics, power-ups and finish flow in accelerated fixed steps.
        races = []
        for track in range(4):
            result = page.evaluate('''track => {
              selectedTrack=track;setDifficulty(0);startRace(4);
              for(let i=0;i<300&&gameState==='countdown';i++)advanceRaceTasks(1/60);
              const seen=new Set();let recovered=false, prior=playerTrackT;
              for(let i=0;i<18000&&gameState==='racing';i++){
                keys.ArrowUp=true;keys.ShiftLeft=boostFuel>40;
                // Steer toward the lane center, as a simple deterministic driver.
                keys.ArrowLeft=playerLateral>1;keys.ArrowRight=playerLateral< -1;
                if(i===60||i===120||i===180){endActivePower();currentPowerUp=POWER_UPS[(i/60)-1];activatePowerUp();}
                if(activePower)seen.add(activePower.id);
                advanceRaceTasks(1/60);updateGame(1/60);
                if(playerTrackT<prior-.01&&lapCount===0)recovered=true;prior=playerTrackT;
              }
              renderer.render(scene,camera);
              return {track:TRACKS[track].id,state:gameState,time:raceTime,place:playerWon,seen:[...seen],recovered,best:bestTimes[TRACKS[track].id],text:document.getElementById('resultStats').textContent};
            }''',track)
            assert result['state'] == 'results', result
            assert result['best'] == result['time'] and 'You:' in result['text'],result
            assert set(result['seen']) == {'rocket','gun','jetpack'},result
            races.append(result)
            print('Completed physics and all power-ups: '+result['track'],flush=True)
        page.screenshot(path=str(OUT/'results-1280.png'))
        # Failing a chasm safely returns the player before the jump.
        result=page.evaluate('''() => {
          selectedTrack=0;startRace(0);gameState='racing';raceTasks.clear();
          const t=TRACKS[0];playerTrackT=t.chasmT;playerHeight=-9;playerVY=-2;playerOnGround=false;chasmLaunched=true;chasmFalling=true;
          updateGame(1/60);
          return {t:playerTrackT,expected:t.chasmT-t.chasmWidth/2-t.chasmRespawn,height:playerHeight,falling:chasmFalling};
        }''')
        assert abs(result['t']-result['expected']) < 1e-9 and result['height'] == 0 and not result['falling'],result
        # No scheduled shot can cross a menu transition.
        result=page.evaluate('''() => {gameState='racing';fireGun();showTitle();for(let i=0;i<120;i++)advanceRaceTasks(1/60);return {state:gameState,bullets:projectiles.length,tasks:raceTasks.size}}''')
        assert result == {'state':'title','bullets':0,'tasks':0},result
        page.get_by_role('button',name='Credits and licenses',exact=True).click()
        assert page.locator('#offlineCredits').is_visible()
        assert 'Permission is hereby granted' in page.locator('#offlineCredits').inner_text()
        page.get_by_role('button',name='Close credits',exact=True).click()
        # Every phone control fits and touch cancellation clears active input.
        for width in (320,390,768):
            mobile = browser.new_context(viewport={'width':width,'height':844},has_touch=True,is_mobile=True)
            mobile.route('http://**/*',block);mobile.route('https://**/*',block)
            tab=mobile.new_page();tab.on('pageerror',lambda error:errors.append(str(error)))
            tab.goto(ARTIFACT.as_uri());tab.wait_for_function("gameState==='title' && !!renderer")
            tab.evaluate("selectedTrack=0;startRace(0);for(let i=0;i<300&&gameState==='countdown';i++)advanceRaceTasks(1/60)")
            # Real touch input creates an active pointer that capture can own.
            cdp=mobile.new_cdp_session(tab);rect=tab.locator('#btnGas').bounding_box()
            point={'x':rect['x']+rect['width']/2,'y':rect['y']+rect['height']/2}
            cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[point]})
            assert tab.evaluate('!!keys.ArrowUp')
            cdp.send('Input.dispatchTouchEvent',{'type':'touchCancel','touchPoints':[]})
            assert not tab.evaluate('keys.ArrowUp')
            cdp.detach()
            boxes=tab.locator('#mobileControls button').evaluate_all('(buttons)=>buttons.map(b=>({x:b.getBoundingClientRect().x,right:b.getBoundingClientRect().right,width:b.getBoundingClientRect().width}))')
            assert all(b['x']>=0 and b['right']<=width and b['width']>=44 for b in boxes),boxes
            assert tab.evaluate('document.documentElement.scrollWidth<=innerWidth')
            tab.screenshot(path=str(OUT/f'race-{width}.png'))
            mobile.close()
        # WebGL unavailable and lost-context paths produce visible help.
        no_gl=browser.new_context();no_gl.route('http://**/*',block);no_gl.route('https://**/*',block)
        tab=no_gl.new_page();tab.add_init_script("const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type.startsWith('webgl')||type==='experimental-webgl')return null;return orig.call(this,type,...args)}")
        tab.goto(ARTIFACT.as_uri());assert tab.locator('#graphicsError').is_visible()
        assert 'WebGL' in tab.locator('#graphicsError').inner_text();no_gl.close()
        page.evaluate("renderer.domElement.dispatchEvent(new Event('webglcontextlost',{cancelable:true}))")
        assert page.locator('#graphicsError').is_visible()
        assert not external,external
        assert not errors,errors
        browser.close()
        print(json.dumps({'selection_combinations':combos,'resource_cycles':cycles,'completed_races':races,'chasm_recovery':'pass','keyboard_and_touch':'pass','pause_and_cancel':'pass','webgl_fallback':'pass','external_requests':external,'browser_errors':errors}))


if __name__ == '__main__':
    main()
