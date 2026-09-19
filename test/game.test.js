import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

function harness({ touch = false } = {}) {
  const elements = new Map(), listeners = new Map(), timers = new Map()
  let nextTimer = 0
  function element(id) {
    if (!elements.has(id)) {
      const handlers = new Map()
      elements.set(id, { style: {}, dataset: {}, classList: { toggle() {} }, innerHTML: '', textContent: '',
        addEventListener(name, fn) { handlers.set(name, fn) },
        dispatch(name, extra = {}) { handlers.get(name)?.({ preventDefault() {}, pointerId: 1, ...extra }) },
        setPointerCapture() {}, releasePointerCapture() {}, appendChild() {}, focus() {}, setAttribute() {},
      })
    }
    return elements.get(id)
  }
  const context = vm.createContext({ console, performance, innerWidth: 1000, innerHeight: 800, devicePixelRatio: 1,
    setTimeout(fn) { const id=++nextTimer; timers.set(id, fn); return id }, clearTimeout(id) { timers.delete(id) },
    setInterval(fn) { const id=++nextTimer; timers.set(id, fn); return id }, clearInterval(id) { timers.delete(id) },
    requestAnimationFrame() {},
    document: { hidden: false, getElementById: element, addEventListener(name,fn) { listeners.set('document:'+name,fn) }, createElement: () => element('created') },
    addEventListener(name, fn) { listeners.set(name, fn) },
  })
  context.window = context
  if (touch) context.ontouchstart = null
  vm.runInContext(readFileSync(new URL('../public/vendor/three-r128.min.js', import.meta.url), 'utf8'), context)
  vm.runInContext(readFileSync(new URL('../public/game.js', import.meta.url), 'utf8'), context)
  return { run: (script) => vm.runInContext(script, context), element, timers,
    emit: (event, extras={}) => listeners.get(event)?.({preventDefault(){},...extras}) }
}

test('display time carries rounded tenths across minute boundaries', () => {
  const h=harness()
  for(const [seconds, expected] of [[0,'0:00.0'],[9.96,'0:10.0'],[59.96,'1:00.0'],[3599.96,'60:00.0']])
    assert.equal(h.run(`formatTime(${seconds})`),expected)
})

test('focus loss clears controls instead of leaving acceleration pressed', () => {
  const h=harness();h.run("gameState='racing'")
  h.emit('keydown',{code:'ArrowUp'});assert.equal(h.run('!!keys.ArrowUp'),true)
  h.emit('blur');assert.equal(h.run('!!keys.ArrowUp'),false)
})

test('cancelled pointer releases its steering input', () => {
  const h=harness({touch:true});h.run("gameState='racing'")
  h.element('btnLeft').dispatch('pointerdown');assert.equal(h.run('!!keys.ArrowLeft'),true)
  h.element('btnLeft').dispatch('pointercancel');assert.equal(h.run('!!keys.ArrowLeft'),false)
})

test('a projectile collision removes the bullet from the scene, while shared obstacles stay valid', () => {
  const h=harness()
  const actual=h.run(`(() => {
    scene=new THREE.Scene();
    const geo=new THREE.BoxGeometry(), mat=new THREE.MeshBasicMaterial();let disposed=0;
    geo.addEventListener('dispose',()=>disposed++);mat.addEventListener('dispose',()=>disposed++);
    const obstacle=new THREE.Mesh(geo,mat), sibling=new THREE.Mesh(geo,mat);
    sibling.position.x=20;scene.add(obstacle,sibling);
    const bullet=new THREE.Mesh(new THREE.SphereGeometry(),new THREE.MeshBasicMaterial());scene.add(bullet);
    obstacles3D=[{mesh:obstacle,radius:1},{mesh:sibling,radius:1}];
    projectiles=[{mesh:bullet,vel:new THREE.Vector3(),life:2}];
    updateProjectiles(.1);
    return JSON.stringify({tracked:projectiles.length,attached:!!bullet.parent,siblingAttached:!!sibling.parent,disposed});
  })()`)
  assert.deepEqual(JSON.parse(actual),{tracked:0,attached:false,siblingAttached:true,disposed:0})
})

test('whole-race cleanup disposes shared resources once and preserves application geometry', () => {
  const h=harness()
  const actual=h.run(`(() => {
    scene=new THREE.Scene();initSharedGeo();let owned=0,shared=0,texture=0,instances=0;
    const geo=new THREE.BoxGeometry(),tex=new THREE.Texture(),mat=new THREE.MeshBasicMaterial({map:tex});
    geo.addEventListener('dispose',()=>owned++);mat.addEventListener('dispose',()=>owned++);tex.addEventListener('dispose',()=>texture++);
    SG.chassis.addEventListener('dispose',()=>shared++);
    const a=new THREE.Mesh(geo,mat),b=new THREE.Mesh(geo,mat),c=new THREE.Mesh(SG.chassis,mat);
    const instanced=new THREE.InstancedMesh(geo,mat,2);instanced.addEventListener('dispose',()=>instances++);
    scene.add(a,c,instanced);obstacles3D=[{mesh:b,destroyed:true}];truckGroup=c;
    clearScene();
    return JSON.stringify({owned,shared,texture,instances,children:scene.children.length,player:truckGroup});
  })()`)
  assert.deepEqual(JSON.parse(actual),{owned:2,shared:0,texture:1,instances:1,children:0,player:null})
})

test('paused races freeze delayed effects, and leaving a race cancels them', () => {
  const h=harness()
  h.run("gameState='racing';globalThis.calls=0;scheduleRaceTask(()=>calls++,100)")
  h.run('pauseRace();advanceRaceTasks(2)');assert.equal(h.run('calls'),0)
  h.run('resumeRace();advanceRaceTasks(.11)');assert.equal(h.run('calls'),1)
  h.run('scheduleRaceTask(()=>calls++,100);showTitle();advanceRaceTasks(2)')
  assert.equal(h.run('calls'),1);assert.equal(h.run('gameState'),'title')
})

test('leaving countdown cannot later start an abandoned race', () => {
  const h=harness()
  h.run("gameState='countdown';runCountdown();showTitle()")
  for(let i=0;i<8;i++)h.run('advanceRaceTasks(1)')
  for(const callback of h.timers.values())callback()
  assert.equal(h.run('gameState'),'title')
})

test('resetting the race cancels queued gun shots before a new truck appears', () => {
  const h=harness()
  h.run(`scene=new THREE.Scene();truckGroup=new THREE.Group();
    trackCurve={getTangentAt:()=>new THREE.Vector3(0,0,1)};
    gameState='racing';fireGun();showTitle();truckGroup=new THREE.Group();`)
  h.run('advanceRaceTasks(1)')
  for(const callback of h.timers.values())callback()
  assert.equal(h.run('projectiles.length'),0)
})

test('Escape consumes its default action so opening pause cannot immediately cancel it', () => {
  const h=harness();h.run("gameState='racing'");let prevented=false
  h.emit('keydown',{code:'Escape',preventDefault(){prevented=true}})
  assert.equal(prevented,true)
  assert.equal(h.run('gameState'),'paused')
})

test('sound toggle returns keyboard focus to the active race', () => {
  const h=harness()
  h.run("globalThis.focused=false;renderer={domElement:{focus(){focused=true}}};gameState='racing';toggleSound()")
  assert.equal(h.run('focused'),true)
})
