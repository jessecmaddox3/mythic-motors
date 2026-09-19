// ============================================================
// DATA
// ============================================================
const TRACKS=[
  {id:'forest',name:'Enchanted Forest',icon:'🌲',difficulty:'Easy',
   desc:'Bioluminescent woodland of giant conifers and glowing fungi',
   cardBg:'linear-gradient(150deg,#0b2c14,#123920,#0a2210)',cardBorder:'#44aa66',nameColor:'#66ffaa',
   sky:0x081a26,fog:0x0a2030,fogDensity:0.0042,ground:0x0c2012,
   ambientColor:0x3a5a77,ambientInt:0.85,dirColor:0xaabbdd,dirInt:0.9,hemiSky:0x2a4477,hemiGnd:0x142a18,
   roadColor:0x30343a,edgeColor:0x44ff88,edgeOp:0.55,
   points:[[0,0,0],[0,0,-35],[8,1,-70],[25,3,-100],[50,5,-115],[80,4,-110],[105,2,-90],[115,0,-60],[108,0,-30],[100,1,0],[110,3,20],[130,6,30],[150,8,25],[158,6,5],[148,3,-20],[135,1,-45],[145,0,-70],[168,-1,-82],[190,0,-75],[205,3,-55],[208,5,-30],[195,6,-8],[175,4,5],[150,2,15],[120,1,25],[85,0,22],[55,0,15],[25,0,10],[8,0,5]],
   envBuilder:'buildForestEnv',chasmT:0.45,chasmWidth:0.022,chasmRespawn:0.025},
  {id:'volcano',name:'Volcanic Forge',icon:'🌋',difficulty:'Medium',
   desc:'Molten rivers and ashfall beneath smoldering peaks',
   cardBg:'linear-gradient(150deg,#3a1505,#552008,#2a0e02)',cardBorder:'#ff6622',nameColor:'#ff8844',
   sky:0x2a1208,fog:0x2a1508,fogDensity:0.0038,ground:0x2a1a10,
   ambientColor:0x6a4836,ambientInt:0.85,dirColor:0xffa055,dirInt:0.95,hemiSky:0x553320,hemiGnd:0x221008,
   roadColor:0x413838,edgeColor:0xff7733,edgeOp:0.7,
   points:[[0,0,0],[5,0,-30],[-5,2,-65],[10,5,-100],[35,8,-120],[65,10,-115],[90,8,-95],[105,5,-65],[95,2,-35],[80,0,-10],[70,2,15],[85,6,40],[110,10,50],[135,12,35],[145,10,10],[138,6,-20],[120,3,-50],[130,0,-80],[155,2,-95],[180,5,-80],[190,8,-55],[180,10,-30],[160,8,-10],[135,5,5],[105,2,15],[75,0,10],[40,0,5],[15,0,3]],
   envBuilder:'buildVolcanoEnv',chasmT:0.52,chasmWidth:0.025,chasmRespawn:0.028},
  {id:'crystal',name:'Crystal Caverns',icon:'💎',difficulty:'Medium',
   desc:'Underground labyrinth of luminous amethyst spires',
   cardBg:'linear-gradient(150deg,#150e35,#241455,#0e0828)',cardBorder:'#aa66ff',nameColor:'#cc88ff',
   sky:0x0c0a24,fog:0x100c2c,fogDensity:0.0055,ground:0x141026,
   ambientColor:0x4a3878,ambientInt:0.75,dirColor:0xa088dd,dirInt:0.7,hemiSky:0x332266,hemiGnd:0x100a22,
   roadColor:0x2c2a40,edgeColor:0xbb77ff,edgeOp:0.6,
   points:[[0,0,0],[0,1,-30],[10,3,-60],[25,5,-85],[45,3,-100],[70,0,-95],[85,-2,-75],[80,-4,-50],[65,-3,-25],[55,0,0],[60,3,25],[80,6,40],[105,4,45],[125,1,30],[130,-2,5],[120,-4,-25],[100,-3,-50],[110,-1,-75],[135,2,-85],[155,5,-70],[160,3,-45],[150,0,-20],[130,2,0],[105,4,15],[80,2,20],[55,0,15],[30,1,10],[10,0,5]],
   envBuilder:'buildCrystalEnv',chasmT:0.40,chasmWidth:0.027,chasmRespawn:0.030},
  {id:'sky',name:'Sky Citadel',icon:'☁️',difficulty:'Hard',
   desc:'Ancient floating ruins high above a sea of clouds',
   cardBg:'linear-gradient(150deg,#12305a,#1e4a80,#0e2440)',cardBorder:'#66aaff',nameColor:'#88ccff',
   sky:0x2a4a72,fog:0x3a5a80,fogDensity:0.0032,ground:0x2a4a6a,
   ambientColor:0x7a99bb,ambientInt:0.95,dirColor:0xfff2dd,dirInt:1.0,hemiSky:0x99bbdd,hemiGnd:0x445566,
   roadColor:0x9aa8b8,edgeColor:0xffcc44,edgeOp:0.7,
   points:[[0,20,0],[5,22,-35],[15,25,-65],[35,28,-90],[60,32,-100],[90,35,-90],[110,38,-65],[115,35,-35],[105,30,-10],[90,28,10],[100,32,35],[120,38,50],[145,42,45],[160,40,25],[155,35,0],[140,30,-25],[130,28,-50],[145,32,-75],[170,38,-85],[195,42,-70],[200,40,-45],[188,35,-20],[170,30,0],[145,28,10],[115,25,20],[80,22,15],[45,20,10],[15,20,5]],
   envBuilder:'buildSkyEnv',chasmT:0.55,chasmWidth:0.030,chasmRespawn:0.032}
];

const TRUCKS=[
  {name:'Mossy Mutt',tier:0,stars:'',speed:36,accel:1.0,grip:0.85,boostPow:1.2,jumpPow:1.0,bodyColor:0x2d6b3f,accentColor:0x4a9e5e,trimColor:0x88ff88,wheelColor:0x1c1c1c,glowColor:0x33ff77},
  {name:'Fern Fury',tier:1,stars:'★',speed:42,accel:1.15,grip:0.88,boostPow:1.3,jumpPow:1.1,bodyColor:0x1a5c2a,accentColor:0x33aa44,trimColor:0x66ff88,wheelColor:0x161616,glowColor:0x22ff55},
  {name:'Toadstool Titan',tier:2,stars:'★★',speed:48,accel:1.3,grip:0.92,boostPow:1.4,jumpPow:1.2,bodyColor:0x8b2252,accentColor:0xcc3366,trimColor:0xff6699,wheelColor:0x180a0a,glowColor:0xff3388},
  {name:'Phantom Elk',tier:3,stars:'★★★',speed:56,accel:1.5,grip:0.94,boostPow:1.6,jumpPow:1.3,bodyColor:0x1a2a4a,accentColor:0x3366aa,trimColor:0x66aaff,wheelColor:0x0a0a18,glowColor:0x44aaff},
  {name:'Starfire Dragon',tier:4,stars:'★★★★',speed:66,accel:1.7,grip:0.94,boostPow:2.0,jumpPow:1.5,bodyColor:0x4a1a0a,accentColor:0xff6622,trimColor:0xffaa22,wheelColor:0x180a00,glowColor:0xff5511}
];

const POWER_UPS=[
  {id:'rocket',name:'Rocket',icon:'🚀',duration:3.5},
  {id:'gun',name:'Blaster',icon:'🔫',duration:0.3},
  {id:'jetpack',name:'Jetpack',icon:'🎒',duration:4.5}
];
let powerUpBag=[];// shuffled bag => no repeats until all seen
function drawPowerUp(){
  if(powerUpBag.length===0){powerUpBag=[0,1,2];for(let i=powerUpBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[powerUpBag[i],powerUpBag[j]]=[powerUpBag[j],powerUpBag[i]];}}
  return POWER_UPS[powerUpBag.pop()];
}

const AI_COLORS=[
  {body:0x701515,accent:0xbb2828,trim:0xff5555,name:'Crimson'},
  {body:0x144a72,accent:0x2874b8,trim:0x55bbff,name:'Cobalt'},
  {body:0x5f4a10,accent:0xa8901e,trim:0xffd633,name:'Gold'}
];

// ============================================================
// STATE
// ============================================================
let gameState='title',selectedTruck=0,selectedTrack=0,unlockedTier=4,bestTimes={},aiDifficulty=0;
let raceTime=0,boostFuel=100,jumpCharge=100;
let currentPowerUp=null,activePower=null,activePowerTimer=0;
let playerSpeed=0,playerTrackT=0,playerLateral=0;
let playerHeight=0,playerVY=0,playerOnGround=true;
let truckTiltZ=0,truckTiltX=0;
let raceFinished=false,lapCount=0,passedHalf=false;
let chasmLaunched=false,chasmFalling=false;
let wallBounceCooldown=0;
let aiCars=[];
let playerFinishTime=0,playerWon=false;
let lastSpaceTime=0,puPopupTimer=null,lapFlashTimer=null;
let raceGeneration=0,pausedFrom=null;
const raceTasks=new Set();
function scheduleRaceTask(callback,delay){const task={callback,remaining:delay/1000,generation:raceGeneration};raceTasks.add(task);return task;}
function cancelRaceTask(task){raceTasks.delete(task);}
function advanceRaceTasks(dt){
  if(!['racing','countdown'].includes(gameState))return;
  for(const task of [...raceTasks]){
    if(task.generation!==raceGeneration){raceTasks.delete(task);continue;}
    task.remaining-=dt;
    if(task.remaining<=0){raceTasks.delete(task);task.callback();}
  }
}
function resetRaceSession(){
  raceGeneration++;raceTasks.clear();resetInputs();
  stopEngine();stopBoostSound();stopJetpackSound();
  currentPowerUp=null;activePower=null;activePowerTimer=0;pausedFrom=null;
  document.getElementById('pauseScreen').close?.();
  document.getElementById('pauseButton').hidden=true;
  document.getElementById('countdown').style.display='none';
  document.getElementById('countdown').style.color='#ffcc44';
  document.getElementById('powerUpPopup').className='';
  for(const id of ['effectOverlay','powerUpHUD'])document.getElementById(id).style.display='none';
  for(const id of ['chasmWarn','edgeWarn','speedVignette','lapFlash','trackNameHUD'])document.getElementById(id).style.opacity='0';
}
function pauseRace(){
  if(!['racing','countdown'].includes(gameState))return;
  resetInputs();pausedFrom=gameState;gameState='paused';
  document.getElementById('pauseScreen').showModal?.();
  audioCtx?.suspend().catch(()=>{});
}
function resumeRace(){
  if(gameState!=='paused'||document.hidden)return;
  resetInputs();initAudio();gameState=pausedFrom;pausedFrom=null;
  document.getElementById('pauseScreen').close?.();clock?.getDelta();renderer?.domElement.focus();
}


let scene,camera,renderer,clock;
let trackCurve,trackLength=0,trackBounds=null,miniPts=[];
let truckGroup,wheelSpinGroups=[],frontSteerGroups=[],playerFlames=[];
let itemBoxes=[],obstacles3D=[],projectiles=[],envMeshes=[],boostPads=[];
const ROAD_WIDTH=18,SEGS=250;

// ============================================================
// INPUT
// ============================================================
const keys={}, keyboardKeys=new Set(), pointerKeys=new Map();
const controlCodes=new Set(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight']);
function resetInputs(){for(const key of Object.keys(keys))keys[key]=false;keyboardKeys.clear();pointerKeys.clear();}
function releasePointer(id){const key=pointerKeys.get(id);pointerKeys.delete(id);if(key)keys[key]=keyboardKeys.has(key)||[...pointerKeys.values()].includes(key);}
window.addEventListener('keydown',e=>{
  if(e.code==='Escape'&&!e.repeat&&['racing','countdown','paused'].includes(gameState)){e.preventDefault();if(gameState==='paused')resumeRace();else pauseRace();return;}
  if(gameState!=='racing'||!controlCodes.has(e.code)||e.target?.closest?.('button,input,a'))return;
  e.preventDefault();keyboardKeys.add(e.code);keys[e.code]=true;
});
window.addEventListener('keyup',e=>{keyboardKeys.delete(e.code);keys[e.code]=[...pointerKeys.values()].includes(e.code);});
window.addEventListener('blur',()=>{resetInputs();pauseRace();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){resetInputs();pauseRace();}});
const isMobile='ontouchstart' in window;
if(isMobile){
  document.getElementById('controlsHint').style.display='none';
  const map={btnLeft:'ArrowLeft',btnRight:'ArrowRight',btnGas:'ArrowUp',btnBrake:'ArrowDown',btnBoost:'ShiftLeft',btnJump:'Space'};
  Object.entries(map).forEach(([id,key])=>{const el=document.getElementById(id);if(!el)return;
    el.addEventListener('pointerdown',e=>{if(gameState!=='racing')return;e.preventDefault();el.setPointerCapture(e.pointerId);pointerKeys.set(e.pointerId,key);keys[key]=true;});
    el.addEventListener('pointerup',e=>{e.preventDefault();releasePointer(e.pointerId);});
    el.addEventListener('pointercancel',()=>resetInputs());
    el.addEventListener('lostpointercapture',e=>releasePointer(e.pointerId));
  });
}

// ============================================================
// THREE INIT + SHARED GEO
// ============================================================
function initThree(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x081a26);
  scene.fog=new THREE.FogExp2(0x0a2030,0.0042);
  camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,1,380);
  renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance'});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  document.body.insertBefore(renderer.domElement,document.getElementById('ui'));
  clock=new THREE.Clock();
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
}

let SG={};
function initSharedGeo(){
  SG.chassis=new THREE.BoxGeometry(1.7,0.45,2.9);
  SG.hood=new THREE.BoxGeometry(1.5,0.32,0.9);
  SG.cab=new THREE.BoxGeometry(1.4,0.58,1.2);
  SG.windshield=new THREE.PlaneGeometry(1.2,0.5);
  SG.spoilerWing=new THREE.BoxGeometry(1.7,0.08,0.42);
  SG.spoilerStrut=new THREE.BoxGeometry(0.09,0.34,0.09);
  SG.fender=new THREE.BoxGeometry(0.5,0.16,1.0);
  SG.bumper=new THREE.BoxGeometry(1.75,0.22,0.18);
  SG.grill=new THREE.BoxGeometry(1.0,0.3,0.06);
  SG.rollbar=new THREE.BoxGeometry(0.1,0.5,0.1);
  SG.rollbarTop=new THREE.BoxGeometry(1.45,0.1,0.1);
  SG.headlight=new THREE.SphereGeometry(0.1,4,4);
  SG.taillight=new THREE.SphereGeometry(0.08,3,3);
  SG.tire=new THREE.CylinderGeometry(0.56,0.56,0.42,10);
  SG.hub=new THREE.CylinderGeometry(0.24,0.24,0.44,8);
  SG.spoke=new THREE.BoxGeometry(0.1,0.46,0.44);
  SG.nozzle=new THREE.CylinderGeometry(0.15,0.22,0.42,6);
  SG.flame=new THREE.ConeGeometry(0.14,1.0,5);
  SG.flameInner=new THREE.ConeGeometry(0.075,0.72,4);
  SG.stripe=new THREE.PlaneGeometry(0.16,2.7);
  SG.itemBox=new THREE.BoxGeometry(1.8,1.8,1.8);
  SG.padArrow=new THREE.PlaneGeometry(3.2,4.2);
}

// ============================================================
// TRACK GENERATION
// ============================================================
function disposeRoots(roots){
  const keep=new Set(Object.values(SG)),objects=new Set(),geometries=new Set(),materials=new Set(),textures=new Set();
  for(const root of roots){if(!root)continue;root.traverse(object=>{
    if(objects.has(object))return;objects.add(object);
    if(object.isInstancedMesh)object.dispose();
    if(object.geometry&&!keep.has(object.geometry))geometries.add(object.geometry);
    for(const material of [].concat(object.material||[]))materials.add(material);
  });}
  for(const material of materials){for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}
  for(const root of roots)root?.parent?.remove(root);
  for(const texture of textures)texture.dispose();
  for(const material of materials)material.dispose();
  for(const geometry of geometries)geometry.dispose();
}
function retireProjectile(projectile){disposeRoots([projectile.mesh]);}
function clearScene(){
  // Destroyed obstacles are detached, but still share resources with siblings.
  disposeRoots([...scene.children,...obstacles3D.map(o=>o.mesh)]);
  envMeshes=[];obstacles3D=[];itemBoxes=[];projectiles=[];boostPads=[];aiCars=[];
  truckGroup=null;wheelSpinGroups=[];frontSteerGroups=[];playerFlames=[];
}

function rightAt(t){
  const tan=trackCurve.getTangentAt(t);
  return new THREE.Vector3().crossVectors(tan,new THREE.Vector3(0,1,0)).normalize();
}

function generateTrack(){
  clearScene();
  const T=TRACKS[selectedTrack];
  scene.background=new THREE.Color(T.sky);
  scene.fog=new THREE.FogExp2(T.fog,T.fogDensity);
  scene.add(new THREE.AmbientLight(T.ambientColor,T.ambientInt));
  const dir=new THREE.DirectionalLight(T.dirColor,T.dirInt);
  dir.position.set(40,60,20);scene.add(dir);
  scene.add(new THREE.HemisphereLight(T.hemiSky,T.hemiGnd,0.45));

  const pts=T.points.map(p=>new THREE.Vector3(p[0],p[1],p[2]));
  trackCurve=new THREE.CatmullRomCurve3(pts,true,'catmullrom',0.5);// closed=true → continuous loop, no hard seam
  trackLength=trackCurve.getLength();

  // Bounds + minimap points
  let minX=1e9,maxX=-1e9,minZ=1e9,maxZ=-1e9;
  miniPts=[];
  for(let i=0;i<=100;i++){
    const p=trackCurve.getPointAt(i/100);
    minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);
    minZ=Math.min(minZ,p.z);maxZ=Math.max(maxZ,p.z);
    miniPts.push(p);
  }
  trackBounds={minX,maxX,minZ,maxZ};

  // Road with center line texture
  const roadCvs=document.createElement('canvas');roadCvs.width=64;roadCvs.height=64;
  const rc=roadCvs.getContext('2d');
  rc.fillStyle='#'+T.roadColor.toString(16).padStart(6,'0');rc.fillRect(0,0,64,64);
  rc.fillStyle='rgba(255,255,255,0.18)';rc.fillRect(30,4,4,24);
  const roadTex=new THREE.CanvasTexture(roadCvs);
  roadTex.wrapS=roadTex.wrapT=THREE.RepeatWrapping;

  const verts=[],idx=[],uvs=[];
  for(let i=0;i<=SEGS;i++){
    const t=i/SEGS,pt=trackCurve.getPointAt(t);
    const r=rightAt(t),hw=ROAD_WIDTH/2;
    verts.push(pt.x-r.x*hw,pt.y-0.05,pt.z-r.z*hw);
    verts.push(pt.x+r.x*hw,pt.y-0.05,pt.z+r.z*hw);
    uvs.push(0,t*60,1,t*60);
    if(i<SEGS){const b=i*2;idx.push(b,b+1,b+2,b+1,b+3,b+2);}
  }
  const rGeo=new THREE.BufferGeometry();
  rGeo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
  rGeo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  rGeo.setIndex(idx);rGeo.computeVertexNormals();
  const road=new THREE.Mesh(rGeo,new THREE.MeshStandardMaterial({map:roadTex,roughness:0.85}));
  scene.add(road);envMeshes.push(road);

  // Rumble strips
  const stripCount=Math.floor(SEGS/2);
  for(let side of[-1,1]){
    const sV=[],sI=[];
    for(let i=0;i<=stripCount;i++){
      const t=i/stripCount,pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2*side;
      sV.push(pt.x+r.x*hw,pt.y+0.03,pt.z+r.z*hw);
      sV.push(pt.x+r.x*(hw-1.2*side),pt.y+0.03,pt.z+r.z*(hw-1.2*side));
      if(i<stripCount){const b=i*2;sI.push(b,b+1,b+2,b+1,b+3,b+2);}
    }
    const sG=new THREE.BufferGeometry();
    sG.setAttribute('position',new THREE.Float32BufferAttribute(sV,3));sG.setIndex(sI);
    const colors=new Float32Array((stripCount+1)*6);
    const ec=[(T.edgeColor>>16&255)/255,(T.edgeColor>>8&255)/255,(T.edgeColor&255)/255];
    for(let i=0;i<=stripCount;i++){
      const c=(i%2===0)?[1,1,1]:ec;
      for(let k=0;k<2;k++){colors[i*6+k*3]=c[0];colors[i*6+k*3+1]=c[1];colors[i*6+k*3+2]=c[2];}
    }
    sG.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    const strip=new THREE.Mesh(sG,new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:0.38}));
    scene.add(strip);envMeshes.push(strip);
  }

  // Glowing edge lines
  for(let side of[-1,1]){
    const ep=[];
    for(let i=0;i<=SEGS;i++){const t=i/SEGS,pt=trackCurve.getPointAt(t),r=rightAt(t);
      ep.push(new THREE.Vector3(pt.x+r.x*ROAD_WIDTH/2*side,pt.y+0.06,pt.z+r.z*ROAD_WIDTH/2*side));}
    const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(ep),new THREE.LineBasicMaterial({color:T.edgeColor,transparent:true,opacity:T.edgeOp}));
    scene.add(line);envMeshes.push(line);
  }

  // Ground
  const gndY=T.id==='sky'?-5:-0.5;
  const gnd=new THREE.Mesh(new THREE.PlaneGeometry(560,560),new THREE.MeshStandardMaterial({color:T.ground,roughness:1}));
  gnd.rotation.x=-Math.PI/2;gnd.position.y=gndY;scene.add(gnd);envMeshes.push(gnd);

  addTrackSides(T);
  window[T.envBuilder]();
  addItemBoxes();addObstacles();addBoostPads();addFinishLine();addChasm();
}

// ============================================================
// ENVIRONMENTS
// ============================================================
// ============================================================
// TRACK SIDES — embankments, barriers, arches (grounds the road)
// ============================================================
function addTrackSides(T){
  const isSky=T.id==='sky';
  // 1) Embankment skirts: sloped shoulders from road edge down+out to terrain
  const skirtColor=isSky?0x76889c:(()=>{
    // slightly lighter than ground for readability
    const g=T.ground;
    const r=Math.min(255,(g>>16&255)+18),gg=Math.min(255,(g>>8&255)+18),b=Math.min(255,(g&255)+18);
    return (r<<16)|(gg<<8)|b;})();
  const skirtMat=new THREE.MeshStandardMaterial({color:skirtColor,roughness:0.95});
  const drop=isSky?4.5:2.8,spread=isSky?2.2:3.8;
  for(let side of[-1,1]){
    const V=[],I=[];
    for(let i=0;i<=SEGS;i++){
      const t=i/SEGS,pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2*side;
      V.push(pt.x+r.x*hw,pt.y-0.05,pt.z+r.z*hw);
      V.push(pt.x+r.x*(hw+spread*side),pt.y-drop,pt.z+r.z*(hw+spread*side));
      if(i<SEGS){const b=i*2;I.push(b,b+1,b+2,b+1,b+3,b+2);}
    }
    const G=new THREE.BufferGeometry();
    G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();
    const m=new THREE.Mesh(G,skirtMat);m.material.side=THREE.DoubleSide;
    scene.add(m);envMeshes.push(m);
  }
  // Sky track: rocky underside so islands look solid from below
  if(isSky){
    const underMat=new THREE.MeshStandardMaterial({color:0x5a6a7e,roughness:1});
    const V=[],I=[];
    for(let i=0;i<=SEGS;i++){
      const t=i/SEGS,pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2+spread;
      V.push(pt.x-r.x*hw,pt.y-drop,pt.z-r.z*hw,pt.x+r.x*hw,pt.y-drop,pt.z+r.z*hw);
      if(i<SEGS){const b=i*2;I.push(b,b+2,b+1,b+1,b+2,b+3);}
    }
    const G=new THREE.BufferGeometry();
    G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();
    const m=new THREE.Mesh(G,underMat);scene.add(m);envMeshes.push(m);
  }
  // 2) Barrier posts along both edges (instanced)
  const postGeo=new THREE.BoxGeometry(0.22,0.85,0.22);
  const postMat=new THREE.MeshStandardMaterial({color:T.edgeColor,emissive:T.edgeColor,emissiveIntensity:0.35});
  const postsPerSide=56,dummy=new THREE.Object3D();
  const postIM=new THREE.InstancedMesh(postGeo,postMat,postsPerSide*2);
  let pi=0;
  for(let side of[-1,1]){
    for(let i=0;i<postsPerSide;i++){
      const t=i/postsPerSide,pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=(ROAD_WIDTH/2+0.55)*side;
      dummy.position.set(pt.x+r.x*hw,pt.y+0.4,pt.z+r.z*hw);
      dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();
      postIM.setMatrixAt(pi++,dummy.matrix);
    }
  }
  scene.add(postIM);envMeshes.push(postIM);
  // 3) Archways you race through
  const archMat=new THREE.MeshStandardMaterial({color:isSky?0x9aabc0:0x3a3a44,roughness:0.6,metalness:0.3});
  const archTrimMat=new THREE.MeshStandardMaterial({color:T.edgeColor,emissive:T.edgeColor,emissiveIntensity:0.6});
  const pillarGeo=new THREE.BoxGeometry(0.7,6.4,0.7);
  const beamGeo=new THREE.BoxGeometry(ROAD_WIDTH+2.4,0.7,0.7);
  const trimGeo=new THREE.BoxGeometry(ROAD_WIDTH+2.4,0.16,0.76);
  const cS=T.chasmT-T.chasmWidth/2-0.03,cE=T.chasmT+T.chasmWidth/2+0.03;
  for(let i=0;i<8;i++){
    const t=(i+0.5)/8;
    if(t>cS&&t<cE)continue;// don't block the chasm jump
    const pt=trackCurve.getPointAt(t),tan=trackCurve.getTangentAt(t),r=rightAt(t);
    const yaw=Math.atan2(tan.x,tan.z);
    for(let s of[-1,1]){
      const pil=new THREE.Mesh(pillarGeo,archMat);
      pil.position.set(pt.x+r.x*(ROAD_WIDTH/2+1)*s,pt.y+3.2,pt.z+r.z*(ROAD_WIDTH/2+1)*s);
      pil.rotation.y=yaw;
      scene.add(pil);envMeshes.push(pil);
    }
    const beam=new THREE.Mesh(beamGeo,archMat);
    beam.position.set(pt.x,pt.y+6.6,pt.z);beam.rotation.y=yaw;
    scene.add(beam);envMeshes.push(beam);
    const trim=new THREE.Mesh(trimGeo,archTrimMat);
    trim.position.set(pt.x,pt.y+6.2,pt.z);trim.rotation.y=yaw;
    scene.add(trim);envMeshes.push(trim);
  }
}

function scatter(count,minD,maxD,cb){
  for(let i=0;i<count;i++){
    const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
    const side=Math.random()<0.5?-1:1,dist=ROAD_WIDTH/2+minD+Math.random()*(maxD-minD);
    cb(pt.x+r.x*dist*side,pt.y,pt.z+r.z*dist*side,t,i);
  }
}

function buildForestEnv(){
  const trunkGeo=new THREE.CylinderGeometry(0.2,0.32,3,5);
  const trunkMat=new THREE.MeshStandardMaterial({color:0x3a2415});
  const coneGeo=new THREE.ConeGeometry(1.9,5.2,6);
  const coneMat=new THREE.MeshStandardMaterial({color:0x123a1a});
  const cone2Mat=new THREE.MeshStandardMaterial({color:0x1a5226});
  const count=110,dummy=new THREE.Object3D();
  const trunkIM=new THREE.InstancedMesh(trunkGeo,trunkMat,count);
  const coneIM=new THREE.InstancedMesh(coneGeo,coneMat,Math.floor(count/2));
  const cone2IM=new THREE.InstancedMesh(coneGeo,cone2Mat,Math.ceil(count/2));
  let c1=0,c2=0;
  for(let i=0;i<count;i++){
    const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
    const side=Math.random()<0.5?-1:1,dist=ROAD_WIDTH/2+4+Math.random()*26,scale=0.65+Math.random()*0.9;
    const x=pt.x+r.x*dist*side,z=pt.z+r.z*dist*side,y=pt.y-0.5;
    dummy.position.set(x,y+1.5*scale,z);dummy.scale.set(scale,scale,scale);dummy.rotation.set(0,Math.random()*3,0);dummy.updateMatrix();
    trunkIM.setMatrixAt(i,dummy.matrix);
    dummy.position.set(x,y+4.6*scale,z);dummy.updateMatrix();
    if(i%2===0)coneIM.setMatrixAt(c1++,dummy.matrix);else cone2IM.setMatrixAt(c2++,dummy.matrix);
  }
  scene.add(trunkIM,coneIM,cone2IM);envMeshes.push(trunkIM,coneIM,cone2IM);
  const mushMat=new THREE.MeshStandardMaterial({color:0xff4466,emissive:0xff2244,emissiveIntensity:0.5});
  const mushGeo=new THREE.SphereGeometry(0.45,5,4,0,Math.PI*2,0,Math.PI/2);
  scatter(14,2,9,(x,y,z)=>{const m=new THREE.Mesh(mushGeo,mushMat);m.position.set(x,y+0.3,z);scene.add(m);envMeshes.push(m);});
  // fireflies as emissive dots
  const ffMat=new THREE.MeshBasicMaterial({color:0xaaffcc});
  const ffGeo=new THREE.SphereGeometry(0.09,3,3);
  scatter(24,1,18,(x,y,z)=>{const f=new THREE.Mesh(ffGeo,ffMat);f.position.set(x,y+1.5+Math.random()*3,z);scene.add(f);envMeshes.push(f);});
}

function buildVolcanoEnv(){
  const rockGeo=new THREE.DodecahedronGeometry(1.5,0);
  const rockMat=new THREE.MeshStandardMaterial({color:0x342013,roughness:0.95});
  const count=70,dummy=new THREE.Object3D();
  const rockIM=new THREE.InstancedMesh(rockGeo,rockMat,count);
  for(let i=0;i<count;i++){
    const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
    const side=Math.random()<0.5?-1:1,dist=ROAD_WIDTH/2+3+Math.random()*20,scale=0.5+Math.random()*1.3;
    dummy.position.set(pt.x+r.x*dist*side,pt.y-0.3,pt.z+r.z*dist*side);
    dummy.scale.set(scale,scale*0.6,scale);dummy.rotation.set(Math.random(),Math.random(),0);dummy.updateMatrix();
    rockIM.setMatrixAt(i,dummy.matrix);
  }
  scene.add(rockIM);envMeshes.push(rockIM);
  const lavaMat=new THREE.MeshStandardMaterial({color:0xff5510,emissive:0xff3300,emissiveIntensity:1.0,roughness:0.3});
  scatter(12,5,18,(x,y,z,t,i)=>{
    const pool=new THREE.Mesh(new THREE.CircleGeometry(1.2+Math.random()*2,8),lavaMat);
    pool.rotation.x=-Math.PI/2;pool.position.set(x,y-0.3,z);
    scene.add(pool);envMeshes.push(pool);
    if(i%3===0){const glow=new THREE.PointLight(0xff4400,0.9,14);glow.position.set(x,y+0.6,z);scene.add(glow);envMeshes.push(glow);}
  });
  const smokeMat=new THREE.MeshStandardMaterial({color:0x3a3a3a,transparent:true,opacity:0.25});
  scatter(6,8,20,(x,y,z)=>{const h=6+Math.random()*10;
    const smoke=new THREE.Mesh(new THREE.ConeGeometry(0.9,h,5),smokeMat);
    smoke.position.set(x,y+h/2,z);scene.add(smoke);envMeshes.push(smoke);});
  for(let i=0;i<5;i++){
    const angle=i*Math.PI*2/5,dist=120+Math.random()*40,h=25+Math.random()*20;
    const mt=new THREE.Mesh(new THREE.ConeGeometry(15+Math.random()*8,h,6),new THREE.MeshStandardMaterial({color:0x241408}));
    mt.position.set(100+Math.cos(angle)*dist,h/2-5,Math.sin(angle)*dist-50);
    scene.add(mt);envMeshes.push(mt);
    if(i<2){const pk=new THREE.PointLight(0xff3300,1.2,44);pk.position.set(mt.position.x,h-3,mt.position.z);scene.add(pk);envMeshes.push(pk);}
  }
  // ember dots
  const embMat=new THREE.MeshBasicMaterial({color:0xffaa44});
  const embGeo=new THREE.SphereGeometry(0.08,3,3);
  scatter(20,1,16,(x,y,z)=>{const e=new THREE.Mesh(embGeo,embMat);e.position.set(x,y+1+Math.random()*4,z);scene.add(e);envMeshes.push(e);});
}

function buildCrystalEnv(){
  const crystGeo=new THREE.ConeGeometry(0.42,3,5);
  const colors=[0xaa44ff,0x6644ff,0xff44aa,0x44aaff,0x44ffaa];
  const count=100,dummy=new THREE.Object3D();
  for(let c=0;c<2;c++){
    const mat=new THREE.MeshStandardMaterial({color:colors[c],emissive:colors[c],emissiveIntensity:0.45,transparent:true,opacity:0.85});
    const im=new THREE.InstancedMesh(crystGeo,mat,count/2);
    for(let i=0;i<count/2;i++){
      const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
      const side=Math.random()<0.5?-1:1,dist=ROAD_WIDTH/2+2+Math.random()*20,scale=0.5+Math.random()*1.6;
      dummy.position.set(pt.x+r.x*dist*side,pt.y+scale*1.5-0.5,pt.z+r.z*dist*side);
      dummy.scale.set(scale*0.7,scale,scale*0.7);
      dummy.rotation.set(0,Math.random()*Math.PI,(Math.random()-0.5)*0.4);
      dummy.updateMatrix();im.setMatrixAt(i,dummy.matrix);
    }
    scene.add(im);envMeshes.push(im);
  }
  const stalMat=new THREE.MeshStandardMaterial({color:0x4a3866,roughness:0.8});
  const stalGeo=new THREE.ConeGeometry(0.5,4,5);
  for(let i=0;i<18;i++){
    const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
    const lat=(Math.random()-0.5)*ROAD_WIDTH*1.5;
    const stal=new THREE.Mesh(stalGeo,stalMat);
    stal.rotation.z=Math.PI;
    stal.position.set(pt.x+r.x*lat,pt.y+13+Math.random()*5,pt.z+r.z*lat);
    scene.add(stal);envMeshes.push(stal);
  }
  const ceil=new THREE.Mesh(new THREE.PlaneGeometry(560,560),new THREE.MeshStandardMaterial({color:0x241a3a,roughness:1,side:THREE.BackSide}));
  ceil.rotation.x=Math.PI/2;ceil.position.y=21;scene.add(ceil);envMeshes.push(ceil);
  for(let i=0;i<8;i++){
    const t=i/8,pt=trackCurve.getPointAt(t);
    const light=new THREE.PointLight(colors[i%colors.length],0.7,20);
    light.position.set(pt.x+(Math.random()-0.5)*8,pt.y+2.5,pt.z+(Math.random()-0.5)*8);
    scene.add(light);envMeshes.push(light);
  }
}

function buildSkyEnv(){
  const cloudGeo=new THREE.CylinderGeometry(4,5,1.5,8);
  const cloudMat=new THREE.MeshStandardMaterial({color:0xe6ecf4,roughness:0.9,transparent:true,opacity:0.75});
  const count=44,dummy=new THREE.Object3D();
  const cloudIM=new THREE.InstancedMesh(cloudGeo,cloudMat,count);
  for(let i=0;i<count;i++){
    const t=Math.random(),pt=trackCurve.getPointAt(t),r=rightAt(t);
    const side=Math.random()<0.5?-1:1,dist=ROAD_WIDTH/2+5+Math.random()*30,scale=0.5+Math.random()*1.6;
    dummy.position.set(pt.x+r.x*dist*side,pt.y-3-Math.random()*10,pt.z+r.z*dist*side);
    dummy.scale.set(scale,0.3+Math.random()*0.4,scale);dummy.updateMatrix();
    cloudIM.setMatrixAt(i,dummy.matrix);
  }
  scene.add(cloudIM);envMeshes.push(cloudIM);
  const pillarGeo=new THREE.CylinderGeometry(0.6,0.85,12,6);
  const pillarMat=new THREE.MeshStandardMaterial({color:0x9aabc0,roughness:0.7});
  scatter(16,2,12,(x,y,z)=>{const p=new THREE.Mesh(pillarGeo,pillarMat);p.position.set(x,y-4,z);scene.add(p);envMeshes.push(p);});
  const ruinMat=new THREE.MeshStandardMaterial({color:0xb8c4a8,roughness:0.7});
  scatter(12,8,26,(x,y,z)=>{
    const w=1+Math.random()*3,h=0.5+Math.random()*2;
    const rn=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ruinMat);
    rn.position.set(x,y+Math.random()*8-2,z);
    rn.rotation.set(Math.random()*0.3,Math.random(),Math.random()*0.3);
    scene.add(rn);envMeshes.push(rn);});
  const orbMat=new THREE.MeshStandardMaterial({color:0xffcc44,emissive:0xffaa00,emissiveIntensity:0.7});
  for(let i=0;i<6;i++){
    const t=i/6,pt=trackCurve.getPointAt(t);
    const orb=new THREE.Mesh(new THREE.SphereGeometry(0.32,5,5),orbMat);
    orb.position.set(pt.x,pt.y+5,pt.z);scene.add(orb);envMeshes.push(orb);
    if(i%2===0){const l=new THREE.PointLight(0xffcc44,0.6,17);l.position.copy(orb.position);scene.add(l);envMeshes.push(l);}
  }
  const below=new THREE.Mesh(new THREE.PlaneGeometry(560,560),new THREE.MeshStandardMaterial({color:0xd6e2ee,roughness:1,transparent:true,opacity:0.35}));
  below.rotation.x=-Math.PI/2;below.position.y=5;scene.add(below);envMeshes.push(below);
}

// ============================================================
// TRACK OBJECTS
// ============================================================
function addItemBoxes(){
  const qCvs=document.createElement('canvas');qCvs.width=64;qCvs.height=64;
  const qc=qCvs.getContext('2d');
  const grd=qc.createLinearGradient(0,0,64,64);
  grd.addColorStop(0,'#ffb700');grd.addColorStop(1,'#dd7700');
  qc.fillStyle=grd;qc.fillRect(0,0,64,64);
  qc.strokeStyle='rgba(255,255,255,0.55)';qc.lineWidth=4;qc.strokeRect(3,3,58,58);
  qc.fillStyle='#fff';qc.font='bold 46px sans-serif';qc.textAlign='center';qc.textBaseline='middle';qc.fillText('?',32,34);
  const qTex=new THREE.CanvasTexture(qCvs);
  const boxMat=new THREE.MeshStandardMaterial({map:qTex,emissive:0xaa7700,emissiveIntensity:0.45,transparent:true,opacity:0.95});
  for(let i=0;i<14;i++){
    const t=0.06+(i/14)*0.86,pt=trackCurve.getPointAt(t),r=rightAt(t);
    const lat=(Math.random()-0.5)*ROAD_WIDTH*0.4;
    const group=new THREE.Group();group.add(new THREE.Mesh(SG.itemBox,boxMat));
    group.position.set(pt.x+r.x*lat,pt.y+2.4,pt.z+r.z*lat);
    group.userData={collected:false,baseY:pt.y+2.4};
    scene.add(group);itemBoxes.push({group,trackT:t});
  }
}

function addObstacles(){
  const T=TRACKS[selectedTrack];
  const geos={rock:new THREE.DodecahedronGeometry(0.65,0),log:new THREE.CylinderGeometry(0.3,0.34,2.4,6),crystal:new THREE.ConeGeometry(0.22,1.4,4),thorn:new THREE.SphereGeometry(0.65,4,3)};
  const matSets={
    forest:{rock:0x5a5a6a,log:0x6a4422,crystal:0xaa44ff,thorn:0x2a5a1a},
    volcano:{rock:0x453020,log:0x4a3322,crystal:0xff6622,thorn:0x5a2a0a},
    crystal:{rock:0x5a4a70,log:0x3a2a4a,crystal:0x6644ff,thorn:0x3a2a5a},
    sky:{rock:0x8a9aaa,log:0x8a9a7a,crystal:0xffcc44,thorn:0x6a7a6a}
  };
  const cs=matSets[T.id]||matSets.forest;
  const types=['rock','log','crystal','thorn'];
  const mats={};Object.entries(cs).forEach(([k,v])=>{mats[k]=new THREE.MeshStandardMaterial({color:v,roughness:0.9});});
  if(T.id==='crystal'||T.id==='volcano')mats.crystal=new THREE.MeshStandardMaterial({color:cs.crystal,emissive:cs.crystal,emissiveIntensity:0.35});
  for(let i=0;i<20;i++){
    const t=0.05+Math.random()*0.88,pt=trackCurve.getPointAt(t),r=rightAt(t);
    const lat=(Math.random()-0.5)*ROAD_WIDTH*0.55;
    const type=types[Math.floor(Math.random()*types.length)];
    let mesh=new THREE.Mesh(geos[type],mats[type]),radius=0.85;
    if(type==='rock')mesh.scale.y=0.65;
    else if(type==='log'){mesh.rotation.z=Math.PI/2;radius=1.2;}
    else if(type==='thorn')mesh.scale.set(1.1,0.7,1.1);
    mesh.position.set(pt.x+r.x*lat,pt.y+0.3,pt.z+r.z*lat);
    scene.add(mesh);obstacles3D.push({mesh,type,destroyed:false,radius});
  }
}

function addBoostPads(){
  const T=TRACKS[selectedTrack];
  // Arrow texture
  const cvs=document.createElement('canvas');cvs.width=64;cvs.height=84;
  const c=cvs.getContext('2d');
  c.fillStyle='rgba(0,0,0,0)';c.fillRect(0,0,64,84);
  c.fillStyle='#66ffee';
  c.beginPath();c.moveTo(32,4);c.lineTo(58,34);c.lineTo(44,34);c.lineTo(44,56);c.lineTo(20,56);c.lineTo(20,34);c.lineTo(6,34);c.closePath();c.fill();
  c.fillStyle='rgba(102,255,238,0.5)';
  c.beginPath();c.moveTo(32,42);c.lineTo(58,70);c.lineTo(44,70);c.lineTo(44,80);c.lineTo(20,80);c.lineTo(20,70);c.lineTo(6,70);c.closePath();c.fill();
  const tex=new THREE.CanvasTexture(cvs);
  const padTs=[0.14,0.32,0.63,0.82];
  padTs.forEach(t=>{
    const pt=trackCurve.getPointAt(t),tan=trackCurve.getTangentAt(t),r=rightAt(t);
    const lat=(Math.random()-0.5)*ROAD_WIDTH*0.45;
    const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0.85,side:THREE.DoubleSide});
    const pad=new THREE.Mesh(SG.padArrow,mat);
    pad.position.set(pt.x+r.x*lat,pt.y+0.08,pt.z+r.z*lat);
    pad.rotation.x=-Math.PI/2;
    pad.rotation.z=Math.atan2(tan.x,tan.z)+Math.PI;
    scene.add(pad);
    boostPads.push({mesh:pad,trackT:t,lateral:lat,mat,usedLap:-1});
  });
}

function addFinishLine(){
  const pt=trackCurve.getPointAt(0),tan=trackCurve.getTangentAt(0),r=rightAt(0);
  const cCvs=document.createElement('canvas');cCvs.width=128;cCvs.height=32;
  const cc=cCvs.getContext('2d');
  for(let x=0;x<128;x+=8)for(let y=0;y<32;y+=8){cc.fillStyle=((x/8+y/8)%2===0)?'#fff':'#111';cc.fillRect(x,y,8,8);}
  const cTex=new THREE.CanvasTexture(cCvs);
  const cMat=new THREE.MeshBasicMaterial({map:cTex,side:THREE.DoubleSide});
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH,1.6),cMat);
  fl.position.set(pt.x,pt.y+0.02,pt.z);fl.rotation.x=-Math.PI/2;fl.rotation.z=Math.atan2(r.x,r.z);
  scene.add(fl);envMeshes.push(fl);
  for(let s of[-1,1]){
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.13,5.4,5),new THREE.MeshStandardMaterial({color:0xd0d0d0}));
    pole.position.set(pt.x+r.x*ROAD_WIDTH/2*s,pt.y+2.7,pt.z+r.z*ROAD_WIDTH/2*s);
    scene.add(pole);envMeshes.push(pole);
  }
  const banner=new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH,1.1),cMat);
  banner.position.set(pt.x,pt.y+5.1,pt.z);banner.lookAt(pt.x+tan.x,pt.y+5.1,pt.z+tan.z);
  scene.add(banner);envMeshes.push(banner);
}

function addChasm(){
  const T=TRACKS[selectedTrack];
  if(!T.chasmT)return;
  const cStart=T.chasmT-T.chasmWidth/2,cEnd=T.chasmT+T.chasmWidth/2,steps=20;
  function ribbon(y1fn,y2fn,mat,extraW){
    const V=[],I=[];
    for(let i=0;i<=steps;i++){
      const t=cStart+(i/steps)*(cEnd-cStart);
      const pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2+(extraW||0);
      V.push(pt.x-r.x*hw,y1fn(pt,i),pt.z-r.z*hw,pt.x+r.x*hw,y2fn(pt,i),pt.z+r.z*hw);
      if(i<steps){const b=i*2;I.push(b,b+1,b+2,b+1,b+3,b+2);}
    }
    const G=new THREE.BufferGeometry();
    G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();
    const m=new THREE.Mesh(G,mat);scene.add(m);envMeshes.push(m);
  }
  ribbon(pt=>pt.y+0.06,pt=>pt.y+0.06,new THREE.MeshBasicMaterial({color:0x020205}),0.5);
  ribbon(pt=>pt.y-18,pt=>pt.y-18,new THREE.MeshBasicMaterial({color:0x010103}),0.5);
  // Walls
  const wallMat=new THREE.MeshStandardMaterial({color:0x22222c,roughness:0.9});
  for(let side of[-1,1]){
    const V=[],I=[];
    for(let i=0;i<=steps;i++){
      const t=cStart+(i/steps)*(cEnd-cStart);
      const pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2*side;
      V.push(pt.x+r.x*hw,pt.y+0.5,pt.z+r.z*hw,pt.x+r.x*hw,pt.y-18,pt.z+r.z*hw);
      if(i<steps){const b=i*2;I.push(b,b+1,b+2,b+1,b+3,b+2);}
    }
    const G=new THREE.BufferGeometry();
    G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();
    const m=new THREE.Mesh(G,wallMat);scene.add(m);envMeshes.push(m);
  }
  // Launch + landing ramps
  const rampMat=new THREE.MeshStandardMaterial({color:0xd8b428,roughness:0.45,metalness:0.25});
  const rampSteps=8,rampLen=0.008,rampHeight=1.8;
  function rampMesh(startT,dirFlip){
    const V=[],I=[];
    for(let i=0;i<=rampSteps;i++){
      const t=Math.min(0.999,Math.max(0.001,startT+(i/rampSteps)*rampLen));
      const pt=trackCurve.getPointAt(t),r=rightAt(t);
      const hw=ROAD_WIDTH/2-0.5;
      const frac=dirFlip?(1-i/rampSteps):(i/rampSteps);
      const h=frac*frac*rampHeight*(dirFlip?0.6:1);
      V.push(pt.x-r.x*hw,pt.y+h,pt.z-r.z*hw,pt.x+r.x*hw,pt.y+h,pt.z+r.z*hw);
      if(i<rampSteps){const b=i*2;I.push(b,b+1,b+2,b+1,b+3,b+2);}
    }
    const G=new THREE.BufferGeometry();
    G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();
    const m=new THREE.Mesh(G,rampMat);scene.add(m);envMeshes.push(m);
  }
  rampMesh(cStart-rampLen,false);
  rampMesh(cEnd,true);
  // Warning chevrons
  const warnT=Math.max(0.001,cStart-rampLen-0.005);
  const wPt=trackCurve.getPointAt(warnT),wR=rightAt(warnT);
  const chevMat=new THREE.MeshStandardMaterial({color:0xff4400,emissive:0xff2200,emissiveIntensity:0.6});
  for(let s of[-1,1]){
    const chev=new THREE.Mesh(new THREE.BoxGeometry(0.16,2.7,0.16),chevMat);
    chev.position.set(wPt.x+wR.x*ROAD_WIDTH/2*s,wPt.y+1.6,wPt.z+wR.z*ROAD_WIDTH/2*s);
    scene.add(chev);envMeshes.push(chev);
    for(let j=0;j<3;j++){
      const mark=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.13,0.34),chevMat);
      mark.position.set(chev.position.x,wPt.y+0.9+j*0.75,chev.position.z);
      scene.add(mark);envMeshes.push(mark);
    }
  }
}

// ============================================================
// TRUCK BUILDER (shared by player + AI)
// ============================================================
function buildTruckModel(colors){
  const g=new THREE.Group();
  const bodyMat=new THREE.MeshStandardMaterial({color:colors.body,roughness:0.35,metalness:0.35});
  const accentMat=new THREE.MeshStandardMaterial({color:colors.accent,roughness:0.3,metalness:0.45});
  const trimMat=new THREE.MeshStandardMaterial({color:colors.trim,emissive:colors.trim,emissiveIntensity:0.3});
  const darkMat=new THREE.MeshStandardMaterial({color:0x1a1a1e,roughness:0.6,metalness:0.3});
  // Chassis
  const chassis=new THREE.Mesh(SG.chassis,bodyMat);chassis.position.y=0.78;g.add(chassis);
  // Hood (front)
  const hood=new THREE.Mesh(SG.hood,accentMat);hood.position.set(0,1.06,0.95);g.add(hood);
  // Cab
  const cab=new THREE.Mesh(SG.cab,accentMat);cab.position.set(0,1.35,-0.25);g.add(cab);
  // Windshield
  const windMat=new THREE.MeshStandardMaterial({color:0x66aadd,transparent:true,opacity:0.5,metalness:0.8,roughness:0.15});
  const wind=new THREE.Mesh(SG.windshield,windMat);wind.position.set(0,1.42,0.36);wind.rotation.x=-0.25;g.add(wind);
  // Roll bar
  for(let x of[-0.62,0.62]){const rb=new THREE.Mesh(SG.rollbar,darkMat);rb.position.set(x,1.85,-0.75);g.add(rb);}
  const rbTop=new THREE.Mesh(SG.rollbarTop,trimMat);rbTop.position.set(0,2.1,-0.75);g.add(rbTop);
  // Spoiler
  for(let x of[-0.6,0.6]){const st=new THREE.Mesh(SG.spoilerStrut,darkMat);st.position.set(x,1.2,-1.32);g.add(st);}
  const wing=new THREE.Mesh(SG.spoilerWing,trimMat);wing.position.set(0,1.42,-1.34);wing.rotation.x=-0.14;g.add(wing);
  // Fenders
  [[0.85,1.02],[-0.85,1.02],[0.85,-1.02],[-0.85,-1.02]].forEach(([x,z])=>{
    const f=new THREE.Mesh(SG.fender,accentMat);f.position.set(x,1.08,z);g.add(f);});
  // Front bumper + grill
  const bumper=new THREE.Mesh(SG.bumper,darkMat);bumper.position.set(0,0.62,1.5);g.add(bumper);
  const grill=new THREE.Mesh(SG.grill,trimMat);grill.position.set(0,0.9,1.47);g.add(grill);
  // Headlights / taillights
  const hlMat=new THREE.MeshStandardMaterial({color:0xffffcc,emissive:0xffff99,emissiveIntensity:0.95});
  for(let x of[-0.52,0.52]){const hl=new THREE.Mesh(SG.headlight,hlMat);hl.position.set(x,0.9,1.5);g.add(hl);}
  const tlMat=new THREE.MeshStandardMaterial({color:0xff2222,emissive:0xff0000,emissiveIntensity:0.6});
  for(let x of[-0.6,0.6]){const tl=new THREE.Mesh(SG.taillight,tlMat);tl.position.set(x,0.82,-1.48);g.add(tl);}
  // Racing stripe
  const stripe=new THREE.Mesh(SG.stripe,new THREE.MeshBasicMaterial({color:colors.trim,side:THREE.DoubleSide}));
  stripe.position.set(0,1.23,0);stripe.rotation.x=-Math.PI/2;g.add(stripe);
  // Twin jet nozzles + flames
  const nozMat=new THREE.MeshStandardMaterial({color:0x3c3c44,metalness:0.7,roughness:0.25});
  const flames=[];
  for(let x of[-0.42,0.42]){
    const noz=new THREE.Mesh(SG.nozzle,nozMat);noz.position.set(x,0.72,-1.56);noz.rotation.x=Math.PI/2;g.add(noz);
    const outerMat=new THREE.MeshBasicMaterial({color:0xff6600,transparent:true,opacity:0.7});
    const outer=new THREE.Mesh(SG.flame,outerMat);outer.position.set(x,0.72,-1.95);outer.rotation.x=-Math.PI/2;g.add(outer);
    const innerMat=new THREE.MeshBasicMaterial({color:0xffddaa,transparent:true,opacity:0.9});
    const inner=new THREE.Mesh(SG.flameInner,innerMat);inner.position.set(x,0.72,-1.85);inner.rotation.x=-Math.PI/2;g.add(inner);
    flames.push({outer,inner,outerMat,innerMat});
  }
  // Wheels with visible spokes: steer group (yaw) > spin group (roll) > tire+hub+spokes
  const tireMat=new THREE.MeshStandardMaterial({color:colors.wheel||0x1a1a1a,roughness:0.85});
  const hubMat=new THREE.MeshStandardMaterial({color:0xcccccc,metalness:0.75,roughness:0.25});
  const spokeMat=new THREE.MeshStandardMaterial({color:colors.trim,emissive:colors.trim,emissiveIntensity:0.25});
  const spinGroups=[],steerGroups=[];
  [{x:0.95,z:1.02,front:true},{x:-0.95,z:1.02,front:true},{x:0.95,z:-1.02,front:false},{x:-0.95,z:-1.02,front:false}].forEach(wp=>{
    const steer=new THREE.Group();steer.position.set(wp.x,0.56,wp.z);
    const spin=new THREE.Group();
    const tire=new THREE.Mesh(SG.tire,tireMat);tire.rotation.z=Math.PI/2;spin.add(tire);
    const hub=new THREE.Mesh(SG.hub,hubMat);hub.rotation.z=Math.PI/2;spin.add(hub);
    // 3 spokes crossing => rotation is clearly visible from any angle
    for(let k=0;k<3;k++){
      const sp=new THREE.Mesh(SG.spoke,spokeMat);
      sp.rotation.x=k*Math.PI/3;
      spin.add(sp);
    }
    steer.add(spin);g.add(steer);
    spinGroups.push(spin);
    if(wp.front)steerGroups.push(steer);
  });
  return {group:g,spinGroups,steerGroups,flames};
}

function buildPlayerTruck(def){
  if(truckGroup)disposeRoots([truckGroup]);
  const m=buildTruckModel({body:def.bodyColor,accent:def.accentColor,trim:def.trimColor,wheel:def.wheelColor});
  truckGroup=m.group;wheelSpinGroups=m.spinGroups;frontSteerGroups=m.steerGroups;playerFlames=m.flames;
  scene.add(truckGroup);
}

function buildAITrucks(){
  disposeRoots(aiCars.map(ai=>ai.group));aiCars=[];
  const laterals=[-4.5,0,4.5];
  AI_COLORS.forEach((col,idx)=>{
    const m=buildTruckModel({body:col.body,accent:col.accent,trim:col.trim,wheel:0x141414});
    scene.add(m.group);
    aiCars.push({group:m.group,spinGroups:m.spinGroups,flames:m.flames,
      trackT:0.001,speed:0,lateral:laterals[idx],lapCount:0,passedHalf:false,finished:false,finishTime:0,
      chasmLaunched:false,height:0,vy:0,spdMult:[0.98,1.0,1.02][idx],wobblePhase:idx*2.1,name:col.name,trimCss:'#'+col.trim.toString(16).padStart(6,'0')});
  });
}

// ============================================================
// FLAMES
// ============================================================
function updateFlames(flames,speed,maxSpeed,time){
  const r=Math.min(speed/Math.max(maxSpeed,1),1);
  const s=0.25+r*1.4;
  const flick=1+Math.sin(time*30)*0.09+Math.sin(time*47)*0.05;
  let oc,ic;
  if(r<0.4){oc=0xff4400;ic=0xff8833;}
  else if(r<0.7){oc=0xff6600;ic=0xffcc66;}
  else{oc=0xff9944;ic=0xfff2e0;}
  for(const f of flames){
    f.outer.scale.set(0.6+r*0.6,s*flick,0.6+r*0.6);
    f.inner.scale.set(0.5+r*0.55,s*0.7*flick,0.5+r*0.55);
    f.outerMat.color.setHex(oc);f.innerMat.color.setHex(ic);
    f.outerMat.opacity=0.4+r*0.45;f.innerMat.opacity=0.5+r*0.45;
  }
}

// ============================================================
// AI
// ============================================================
function getAIBaseSpeed(idx){
  const def=TRUCKS[selectedTruck];
  const mult=aiCars[idx]?aiCars[idx].spdMult:1;
  if(aiDifficulty===0)return def.speed*0.65*mult;
  if(aiDifficulty===1)return def.speed*0.85*mult;
  return def.speed*1.0*mult;
}
function getAIParams(){
  if(aiDifficulty===0)return{accelRate:0.6,wobble:0.6,rubberBand:0.225};
  if(aiDifficulty===1)return{accelRate:0.8,wobble:0.3,rubberBand:0.12};
  return{accelRate:1.0,wobble:0.15,rubberBand:0.06};
}
function updateAllAI(dt){
  const ai=getAIParams();
  const playerProgress=lapCount+playerTrackT;
  aiCars.forEach((car,idx)=>{
    if(car.finished)return;
    const baseSpeed=getAIBaseSpeed(idx);
    const aiProgress=car.lapCount+car.trackT;
    let target=baseSpeed+(playerProgress-aiProgress)*ai.rubberBand*baseSpeed;
    target+=Math.sin(raceTime*2.3+car.wobblePhase)*ai.wobble*5;
    target=Math.max(baseSpeed*0.5,Math.min(baseSpeed*1.3,target));
    car.speed+=(target-car.speed)*ai.accelRate*dt*3;
    car.speed=Math.max(0,car.speed);
    if(trackLength>0){
      car.trackT+=car.speed*dt/trackLength;
      if(car.trackT>0.5&&!car.passedHalf)car.passedHalf=true;
      if(car.trackT>=0.995&&car.passedHalf){
        car.lapCount++;
        if(car.lapCount>=2){car.finished=true;car.finishTime=raceTime;return;}
        car.trackT-=1;car.passedHalf=false;car.chasmLaunched=false;car.height=0;car.vy=0;
      }
      if(car.trackT>1)car.trackT-=1;
    }
    const targetLat=Math.sin(raceTime*1.1+car.wobblePhase+car.trackT*40)*ROAD_WIDTH*0.18;
    car.lateral+=(targetLat-car.lateral)*2*dt;
    const TC=TRACKS[selectedTrack];
    if(TC.chasmT){
      const cS=TC.chasmT-TC.chasmWidth/2,cE=TC.chasmT+TC.chasmWidth/2;
      const aiT=((car.trackT%1)+1)%1;
      if(aiT>=cS-0.003&&aiT<cS+0.005&&!car.chasmLaunched){car.chasmLaunched=true;car.vy=11;}
      if(car.chasmLaunched){car.vy-=20*dt;car.height+=car.vy*dt;
        if(car.height<=0&&aiT>cE){car.height=0;car.vy=0;car.chasmLaunched=false;}
        if(car.height<0&&aiT<=cE)car.height=Math.max(car.height,0.1);}
      if(aiT>cE+0.02)car.chasmLaunched=false;
    }
    const t=((car.trackT%1)+1)%1;
    const pt=trackCurve.getPointAt(t),fwd=trackCurve.getTangentAt(t).normalize(),r=rightAt(t);
    car.group.position.lerp(new THREE.Vector3(pt.x+r.x*car.lateral,pt.y+0.45+car.height,pt.z+r.z*car.lateral),0.2);
    const ta=Math.atan2(fwd.x,fwd.z);
    let diff=ta-car.group.rotation.y;
    while(diff>Math.PI)diff-=Math.PI*2;while(diff<-Math.PI)diff+=Math.PI*2;
    car.group.rotation.y+=diff*0.12;
    car.spinGroups.forEach(w=>{w.rotation.x+=car.speed*dt/0.56;});
    updateFlames(car.flames,car.speed,getAIBaseSpeed(idx),clock.elapsedTime+car.wobblePhase);
  });
}
function getPlayerProgress(){return lapCount+((playerTrackT%1)+1)%1;}

// ============================================================
// POWER-UPS
// ============================================================
function endActivePower(){
  if(!activePower)return;
  if(activePower.id==='jetpack')stopJetpackSound();
  if(activePower.id==='rocket')stopBoostSound();
  activePower=null;activePowerTimer=0;
  document.getElementById('effectOverlay').style.display='none';
}
function collectPowerUp(){
  const pu=drawPowerUp();
  showPowerUpPopup(pu);
  endActivePower();// replace any running power
  currentPowerUp=pu;
  activatePowerUp();// auto-fire immediately — no button needed
}
function showPowerUpPopup(pu){
  const popup=document.getElementById('powerUpPopup');
  document.getElementById('puPopIcon').textContent=pu.icon;
  document.getElementById('puPopName').textContent=pu.name;
  popup.className='show';
  if(puPopupTimer)cancelRaceTask(puPopupTimer);
  puPopupTimer=scheduleRaceTask(()=>{popup.className='hide';},1200);
}
function activatePowerUp(){
  if(!currentPowerUp||activePower)return;
  activePower=currentPowerUp;activePowerTimer=currentPowerUp.duration;
  const puId=currentPowerUp.id;currentPowerUp=null;
  const ov=document.getElementById('effectOverlay');
  if(puId==='rocket'){ov.style.display='block';ov.style.background='radial-gradient(ellipse at center,transparent 50%,rgba(255,68,0,0.15) 100%)';playRocketStart();startBoostSound();}
  else if(puId==='gun')fireGun();
  else if(puId==='jetpack'){ov.style.display='block';ov.style.background='radial-gradient(ellipse at center,transparent 60%,rgba(68,170,255,0.12) 100%)';startJetpackSound();}
}
function getTrackForward(t){return trackCurve.getTangentAt(((t%1)+1)%1).normalize();}
function fireGun(){if(!truckGroup)return;const fwd=getTrackForward(playerTrackT);
  for(let i=0;i<5;i++){scheduleRaceTask(()=>{playGunShot();
    const m=new THREE.Mesh(new THREE.SphereGeometry(0.18,3,3),new THREE.MeshStandardMaterial({color:0x44ff44,emissive:0x22ff22,emissiveIntensity:1}));
    const p=truckGroup.position.clone();p.y+=0.8;m.position.copy(p);scene.add(m);
    const vel=fwd.clone().multiplyScalar(75);vel.x+=(Math.random()-0.5)*4;vel.z+=(Math.random()-0.5)*4;vel.y+=1;
    projectiles.push({mesh:m,vel,life:2});},i*70);}}
function updateProjectiles(dt){projectiles=projectiles.filter(p=>{
  p.life-=dt;
  if(p.life>0){
    p.mesh.position.addScaledVector(p.vel,dt);p.vel.y-=9.8*dt;
    for(const obs of obstacles3D){
      if(!obs.destroyed&&p.mesh.position.distanceTo(obs.mesh.position)<obs.radius+0.4){
        obs.destroyed=true;scene.remove(obs.mesh);p.life=0;break;
      }
    }
  }
  if(p.life<=0){retireProjectile(p);return false;}
  return true;
});}

// ============================================================
// RACE LIFECYCLE
// ============================================================
function initRace(){
  resetRaceSession();generateTrack();buildPlayerTruck(TRUCKS[selectedTruck]);buildAITrucks();
  playerSpeed=0;playerTrackT=0.001;playerLateral=0;playerHeight=0;playerVY=0;playerOnGround=true;
  truckTiltZ=0;truckTiltX=0;raceTime=0;boostFuel=100;jumpCharge=100;
  currentPowerUp=null;activePower=null;activePowerTimer=0;
  raceFinished=false;lapCount=0;passedHalf=false;
  playerFinishTime=0;playerWon=false;wallBounceCooldown=0;
  chasmLaunched=false;chasmFalling=false;powerUpBag=[];
  projectiles.forEach(retireProjectile);projectiles=[];
  document.getElementById('powerUpHUD').style.display='none';
  document.getElementById('effectOverlay').style.display='none';
  document.getElementById('chasmWarn').style.opacity='0';
  document.getElementById('edgeWarn').style.opacity='0';
  document.getElementById('lapFlash').style.opacity='0';
  const tn=document.getElementById('trackNameHUD');
  const T=TRACKS[selectedTrack];
  tn.textContent=T.icon+' '+T.name;tn.style.color=T.nameColor;tn.style.opacity='1';
  scheduleRaceTask(()=>{tn.style.opacity='0';},2500);
}

function flashLap(text){
  const el=document.getElementById('lapFlash');
  el.textContent=text;el.style.opacity='1';
  if(lapFlashTimer)cancelRaceTask(lapFlashTimer);
  lapFlashTimer=scheduleRaceTask(()=>{el.style.opacity='0';},1600);
}

// ============================================================
// MAIN GAME UPDATE
// ============================================================
function updateGame(dt){
  if(raceFinished)return;
  raceTime+=dt;
  wallBounceCooldown=Math.max(0,wallBounceCooldown-dt);
  const def=TRUCKS[selectedTruck];
  const boosting=(keys['ShiftLeft']||keys['ShiftRight'])&&boostFuel>0;
  const isRocket=activePower&&activePower.id==='rocket';
  const isJetpack=activePower&&activePower.id==='jetpack';
  let maxSpd=def.speed;
  if(boosting)maxSpd*=1+0.5*def.boostPow;
  if(isRocket)maxSpd*=2.4;

  // === SNAPPY ACCELERATION ===
  if(keys['ArrowUp'])playerSpeed+=def.accel*95*dt*(1-0.45*playerSpeed/maxSpd);
  else playerSpeed-=playerSpeed*0.55*dt;
  if(keys['ArrowDown'])playerSpeed-=def.accel*150*dt;
  if(boosting){playerSpeed+=def.accel*70*dt;boostFuel-=40*dt;if(boostFuel<0)boostFuel=0;}
  if(isRocket)playerSpeed+=def.accel*160*dt;
  playerSpeed=Math.max(0,Math.min(maxSpd,playerSpeed));

  // Track progress + laps
  if(trackLength>0){
    playerTrackT+=playerSpeed*dt/trackLength;
    if(playerTrackT>0.5&&!passedHalf)passedHalf=true;
    if(playerTrackT>=0.995&&passedHalf){
      lapCount++;
      if(lapCount>=2){finishRace();return;}
      playerTrackT-=1;passedHalf=false;chasmLaunched=false;chasmFalling=false;
      flashLap('FINAL LAP!');playPickup();
      itemBoxes.forEach(b=>{b.group.userData.collected=false;b.group.visible=true;});
    }
    if(playerTrackT>1)playerTrackT-=1;
  }

  // === STEERING + CENTRIFUGAL DRIFT ===
  const steerIn=(keys['ArrowRight']?1:0)-(keys['ArrowLeft']?1:0);
  const steerAmt=8.5*dt*(playerSpeed/Math.max(def.speed*0.5,1));
  playerLateral+=steerIn*steerAmt;
  const tNow=((playerTrackT%1)+1)%1;
  const tAhead=((playerTrackT+0.01)%1+1)%1;
  const tanNow=trackCurve.getTangentAt(tNow);
  const tanAhead=trackCurve.getTangentAt(tAhead);
  const curvature=tanNow.x*tanAhead.z-tanNow.z*tanAhead.x;
  const speedRatio=playerSpeed/Math.max(def.speed,1);
  playerLateral+=curvature*speedRatio*speedRatio*30*dt;
  const curveSeverity=Math.abs(curvature);
  const steerMatch=(curvature>0&&steerIn<0)||(curvature<0&&steerIn>0);
  if(curveSeverity>0.02&&!steerMatch&&playerSpeed>5){
    playerSpeed*=(1-curveSeverity*0.35*dt*60);
  }

  // === WALL: BOUNCE, NOT DRAG ===
  const wallLimit=ROAD_WIDTH/2-0.6;
  const edgeWarnEl=document.getElementById('edgeWarn');
  const nearZone=ROAD_WIDTH/2-2.2;
  const absLat=Math.abs(playerLateral);
  if(absLat>nearZone){
    // visual cue only — no slowdown in the near zone
    const depth=Math.min((absLat-nearZone)/(wallLimit-nearZone),1);
    const side=playerLateral>0?'right':'left';
    edgeWarnEl.style.opacity='1';
    edgeWarnEl.style.background=side==='right'
      ?`linear-gradient(to left,rgba(255,120,30,${0.12+depth*0.22}) 0%,transparent 26%)`
      :`linear-gradient(to right,rgba(255,120,30,${0.12+depth*0.22}) 0%,transparent 26%)`;
  }else edgeWarnEl.style.opacity='0';
  if(absLat>=wallLimit){
    playerLateral=Math.sign(playerLateral)*wallLimit;
    if(wallBounceCooldown<=0){
      // one-time arcade bounce: small speed tap + inward deflection + sound
      playerSpeed*=0.92;
      playerLateral-=Math.sign(playerLateral)*0.8;
      wallBounceCooldown=0.5;
      playCollision();
    }
  }

  // === JUMP / GRAVITY ===
  if(keys['Space']&&playerOnGround&&jumpCharge>=30&&!chasmFalling){playerVY=8*def.jumpPow;playerOnGround=false;jumpCharge-=30;keys['Space']=false;playJump();}
  if(isJetpack){playerHeight=Math.min(playerHeight+8*dt,6);playerVY=0;playerOnGround=false;}
  else if(!playerOnGround){playerVY-=20*dt;playerHeight+=playerVY*dt;if(playerHeight<=0&&!chasmFalling){playerHeight=0;playerVY=0;playerOnGround=true;playLand();}}
  if(playerOnGround){jumpCharge=Math.min(100,jumpCharge+22*dt);boostFuel=Math.min(100,boostFuel+9*dt);}

  // === CHASM ===
  const T=TRACKS[selectedTrack];
  if(T.chasmT){
    const cStart=T.chasmT-T.chasmWidth/2,cEnd=T.chasmT+T.chasmWidth/2;
    const warnDist=0.04;
    const cw=document.getElementById('chasmWarn');
    if(tNow>cStart-warnDist&&tNow<cStart-0.005&&!chasmLaunched)cw.style.opacity='1';
    else cw.style.opacity='0';
    if(tNow>=cStart-0.003&&tNow<cStart+0.005&&!chasmLaunched&&playerOnGround){
      chasmLaunched=true;chasmFalling=false;playerVY=10;playerOnGround=false;playJump();
    }
    if(tNow>=cStart&&tNow<=cEnd){
      if(playerHeight<=0&&chasmLaunched){playerOnGround=false;if(!chasmFalling){chasmFalling=true;playerVY=-2;}}
      if(playerHeight<-8){
        playCollision();
        playerTrackT=cStart-T.chasmRespawn;
        if(playerTrackT<0)playerTrackT+=1;
        playerSpeed=0;playerHeight=0;playerVY=0;playerOnGround=true;
        chasmLaunched=false;chasmFalling=false;
        const rPt=trackCurve.getPointAt(((playerTrackT%1)+1)%1);
        const rFwd=getTrackForward(playerTrackT);
        truckGroup.position.set(rPt.x,rPt.y+0.45,rPt.z);
        camera.position.set(rPt.x-rFwd.x*9,rPt.y+4.5,rPt.z-rFwd.z*9);
      }
    }
    if(tNow>cEnd+0.01&&chasmLaunched){chasmLaunched=false;chasmFalling=false;}
  }

  // === POWER TIMER ===
  if(activePower){activePowerTimer-=dt;if(activePowerTimer<=0){if(activePower.id==='jetpack')stopJetpackSound();if(activePower.id==='rocket')stopBoostSound();activePower=null;document.getElementById('effectOverlay').style.display='none';}}

  // === POSITION TRUCK ===
  const pt=trackCurve.getPointAt(tNow),fwd=getTrackForward(playerTrackT),r=rightAt(tNow);
  truckGroup.position.lerp(new THREE.Vector3(pt.x+r.x*playerLateral,pt.y+playerHeight+0.45,pt.z+r.z*playerLateral),0.25);
  const targetAngle=Math.atan2(fwd.x,fwd.z);
  let diff=targetAngle-truckGroup.rotation.y;
  while(diff>Math.PI)diff-=Math.PI*2;while(diff<-Math.PI)diff+=Math.PI*2;
  truckGroup.rotation.y+=diff*0.15;
  truckTiltZ+=(-steerIn*0.13-truckTiltZ)*5*dt;truckGroup.rotation.z=truckTiltZ;
  const aTilt=keys['ArrowUp']?-0.045:(keys['ArrowDown']?0.06:0);
  truckTiltX+=(aTilt-truckTiltX)*3*dt;truckGroup.rotation.x=truckTiltX;
  // Wheel spin (visible!) + front wheel steer
  wheelSpinGroups.forEach(w=>{w.rotation.x+=playerSpeed*dt/0.56;});
  frontSteerGroups.forEach(w=>{w.rotation.y+=((-steerIn*0.32)-w.rotation.y)*10*dt;});
  updateFlames(playerFlames,playerSpeed,def.speed,clock.elapsedTime);

  // === CAMERA: dynamic FOV + shake ===
  const camBack=fwd.clone().multiplyScalar(-9.5);camBack.y+=4.6;
  const camTarget=truckGroup.position.clone().add(camBack);
  if(speedRatio>0.85){
    camTarget.x+=(Math.random()-0.5)*0.12;
    camTarget.y+=(Math.random()-0.5)*0.08;
  }
  camera.position.lerp(camTarget,0.08);
  const lookAt=truckGroup.position.clone().add(fwd.clone().multiplyScalar(6.5));lookAt.y+=1;
  camera.lookAt(lookAt);
  const targetFov=62+speedRatio*11+(boosting||isRocket?5:0);
  camera.fov+=(targetFov-camera.fov)*4*dt;
  camera.updateProjectionMatrix();
  document.getElementById('speedVignette').style.opacity=speedRatio>0.7?String((speedRatio-0.7)*2.2):'0';

  // === PICKUPS / OBSTACLES / PADS ===
  itemBoxes.forEach(b=>{if(b.group.userData.collected)return;
    if(truckGroup.position.distanceTo(b.group.position)<3.4){b.group.userData.collected=true;b.group.visible=false;collectPowerUp();playPickup();}});
  if(!isJetpack&&playerHeight<2){
    obstacles3D.forEach(obs=>{if(obs.destroyed)return;
      if(truckGroup.position.distanceTo(obs.mesh.position)<obs.radius+1.1){playerSpeed*=0.35;obs.destroyed=true;scene.remove(obs.mesh);playCollision();}});
  }
  boostPads.forEach(pad=>{
    if(pad.usedLap===lapCount)return;
    const dT=Math.abs(tNow-pad.trackT);
    if(dT<0.006&&Math.abs(playerLateral-pad.lateral)<2.6&&playerHeight<1.5){
      pad.usedLap=lapCount;
      playerSpeed=Math.min(maxSpd*1.25,playerSpeed+16);
      playRocketStart();
    }
  });

  // Animations
  const time=clock.elapsedTime;
  itemBoxes.forEach(b=>{if(!b.group.userData.collected){
    b.group.rotation.y=time*1.6;b.group.rotation.x=Math.sin(time*1.2+b.trackT*10)*0.3;
    b.group.position.y=b.group.userData.baseY+Math.sin(time*2+b.trackT*20)*0.3;}});
  boostPads.forEach(pad=>{pad.mat.opacity=0.6+Math.sin(time*5+pad.trackT*30)*0.3;});

  updateProjectiles(dt);
  updateAllAI(dt);
  updateEngineSound(playerSpeed,maxSpd,boosting,isRocket);
  if(boosting&&!boostNoise)startBoostSound();
  else if(!boosting&&boostNoise&&!(activePower&&activePower.id==='jetpack')&&!(activePower&&activePower.id==='rocket'))stopBoostSound();
  if(!(activePower&&activePower.id==='jetpack')&&jetpackOsc)stopJetpackSound();

  // === HUD ===
  const pp=getPlayerProgress();
  let ahead=0;aiCars.forEach(c=>{if((c.lapCount+((c.trackT%1)+1)%1)>pp)ahead++;});
  const posText=['1st','2nd','3rd','4th'][ahead];
  document.getElementById('racePosition').textContent=posText;
  document.getElementById('racePosition').style.color=ahead===0?'#66ffaa':'#ff7755';
  let bestP=0;aiCars.forEach(c=>{const p=c.lapCount+((c.trackT%1)+1)%1;if(p>bestP)bestP=p;});
  const gapDist=Math.abs(pp-bestP)*trackLength;
  document.getElementById('opponentGap').textContent=Math.round(gapDist)+'m '+(ahead===0?'lead':'behind');
  document.getElementById('opponentGap').style.color=ahead===0?'#66ffaa':'#ff7755';
  document.getElementById('hudTime').textContent=formatTime(raceTime);
  document.getElementById('hudSpeed').textContent=Math.round(playerSpeed*2.6)+' mph';
  document.getElementById('hudProgress').textContent=Math.round(((lapCount+tNow)/2)*100)+'%';
  document.getElementById('hudLap').textContent='Lap '+(lapCount+1)+'/2';
  document.getElementById('boostFill').style.width=boostFuel+'%';
  document.getElementById('jumpFill').style.width=jumpCharge+'%';
  drawMinimap(tNow);
}

// ============================================================
// MINIMAP
// ============================================================
function drawMinimap(tNow){
  const cvs=document.getElementById('minimap');
  const ctx=cvs.getContext('2d');
  ctx.clearRect(0,0,128,128);
  if(!trackBounds)return;
  const{minX,maxX,minZ,maxZ}=trackBounds;
  const pad=12,W=128-pad*2;
  const sx=W/Math.max(maxX-minX,1),sz=W/Math.max(maxZ-minZ,1);
  const s=Math.min(sx,sz);
  const ox=pad+(W-(maxX-minX)*s)/2,oz=pad+(W-(maxZ-minZ)*s)/2;
  const mapX=p=>ox+(p.x-minX)*s,mapY=p=>oz+(p.z-minZ)*s;
  ctx.strokeStyle='rgba(160,255,210,0.55)';ctx.lineWidth=2.5;ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(mapX(miniPts[0]),mapY(miniPts[0]));
  for(let i=1;i<miniPts.length;i++)ctx.lineTo(mapX(miniPts[i]),mapY(miniPts[i]));
  ctx.stroke();
  // AI dots
  aiCars.forEach(c=>{
    const p=trackCurve.getPointAt(((c.trackT%1)+1)%1);
    ctx.fillStyle=c.trimCss;
    ctx.beginPath();ctx.arc(mapX(p),mapY(p),3,0,Math.PI*2);ctx.fill();
  });
  // Player dot
  const pp=trackCurve.getPointAt(tNow);
  ctx.fillStyle='#66ffaa';
  ctx.beginPath();ctx.arc(mapX(pp),mapY(pp),4.2,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#0a2a18';ctx.lineWidth=1.4;ctx.stroke();
}

// ============================================================
// FINISH
// ============================================================
function finishRace(){
  resetRaceSession();raceFinished=true;playerFinishTime=raceTime;gameState='results';
  let finishedAhead=0;
  aiCars.forEach(c=>{
    if(c.finished&&c.finishTime<playerFinishTime)finishedAhead++;
    if(!c.finished){c.finished=true;c.finishTime=raceTime+999;}
  });
  const playerPlace=finishedAhead+1;
  playerWon=playerPlace===1;
  stopEngine();stopBoostSound();stopJetpackSound();
  if(audioCtx){const notes=playerWon?[523,659,784,1047]:[330,294,262,220];
    notes.forEach((f,i)=>{const o=audioCtx.createOscillator();o.type='sine';o.frequency.value=f;
      const g=audioCtx.createGain();g.gain.setValueAtTime(0,audioCtx.currentTime+i*0.12);
      g.gain.linearRampToValueAtTime(0.12,audioCtx.currentTime+i*0.12+0.04);
      g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+i*0.12+0.3);
      o.connect(g);g.connect(masterGain);o.start(audioCtx.currentTime+i*0.12);o.stop(audioCtx.currentTime+i*0.12+0.3);});}
  document.getElementById('hud').style.display='none';
  document.getElementById('results').style.display='flex';
  document.getElementById('effectOverlay').style.display='none';
  document.getElementById('edgeWarn').style.opacity='0';
  document.getElementById('speedVignette').style.opacity='0';
  if(isMobile)document.getElementById('mobileControls').style.display='none';
  let stars=0;if(raceTime<55)stars=4;else if(raceTime<80)stars=3;else if(raceTime<110)stars=2;else if(raceTime<160)stars=1;
  document.getElementById('resultStars').textContent='★'.repeat(stars)+'☆'.repeat(4-stars);
  const tKey=TRACKS[selectedTrack].id;
  const isBest=!bestTimes[tKey]||raceTime<bestTimes[tKey];
  if(isBest)bestTimes[tKey]=raceTime;
  const diffNames=['Easy','Medium','Hard'];
  const placeNames=['1st','2nd','3rd','4th'];
  const medals=['🏆','🥈','🥉','😤'];
  const placeColors=['#66ffaa','#ffcc44','#ff8844','#ff5544'];
  const winText=`<span style="color:${placeColors[playerPlace-1]};font-size:1.35em">${medals[playerPlace-1]} ${placeNames[playerPlace-1]} Place!</span>`;
  const results=[{name:'You',time:playerFinishTime,css:'#66ffaa'}];
  aiCars.forEach(c=>results.push({name:c.name,time:c.finishTime,css:c.trimCss}));
  results.sort((a,b)=>a.time-b.time);
  let html=winText+'<br>'+TRACKS[selectedTrack].icon+' '+TRACKS[selectedTrack].name+' · '+diffNames[aiDifficulty]+'<br><br>';
  results.forEach((rr,i)=>{
    const timeStr=rr.time<900?formatTime(rr.time):'DNF';
    const w=rr.name==='You'?'700':'400';
    html+=`<span style="color:${rr.css};font-weight:${w}">${placeNames[i]}&nbsp; ${rr.name}: ${timeStr}</span><br>`;
  });
  html+='<br>'+(isBest?'<span style="color:#66ffaa">New Best Time!</span>':'Best: '+formatTime(bestTimes[tKey]));
  document.getElementById('resultStats').innerHTML=html;
  document.getElementById('unlockMsg').textContent='';
}

function formatTime(s){const tenths=Math.max(0,Math.round((Number.isFinite(s)?s:0)*10));return Math.floor(tenths/600)+':'+String(Math.floor(tenths/10)%60).padStart(2,'0')+'.'+tenths%10;}

// ============================================================
// UI SCREENS
// ============================================================
function hideAll(){['titleScreen','trackScreen','selectScreen','results','hud'].forEach(id=>document.getElementById(id).style.display='none');if(isMobile)document.getElementById('mobileControls').style.display='none';}
function showTitle(){resetRaceSession();hideAll();gameState='title';document.getElementById('titleScreen').style.display='flex';}
function showTrackSelect(){resetRaceSession();hideAll();initAudio();gameState='trackSelect';document.getElementById('trackScreen').style.display='flex';buildTrackGrid();}
function showSelect(){resetRaceSession();hideAll();gameState='select';document.getElementById('selectScreen').style.display='flex';buildTruckGrid();}
function setDifficulty(d){aiDifficulty=d;
  const cols=['#44cc66','#ffaa22','#ff4444'];
  for(let i=0;i<3;i++){const b=document.getElementById('diff'+i);
    b.classList.toggle('active',i===d);b.setAttribute('aria-pressed',String(i===d));
    b.style.borderColor=i===d?cols[i]:'#555';
    b.style.color=i===d?cols[i]:'#aaa';}}

function trackPreviewSVG(T){
  let minX=1e9,maxX=-1e9,minZ=1e9,maxZ=-1e9;
  T.points.forEach(p=>{minX=Math.min(minX,p[0]);maxX=Math.max(maxX,p[0]);minZ=Math.min(minZ,p[2]);maxZ=Math.max(maxZ,p[2]);});
  const W=200,H=120,pad=14;
  const s=Math.min((W-pad*2)/Math.max(maxX-minX,1),(H-pad*2)/Math.max(maxZ-minZ,1));
  const ox=pad+((W-pad*2)-(maxX-minX)*s)/2,oz=pad+((H-pad*2)-(maxZ-minZ)*s)/2;
  const px=p=>(ox+(p[0]-minX)*s).toFixed(1),pz=p=>(oz+(p[2]-minZ)*s).toFixed(1);
  let d='M'+px(T.points[0])+' '+pz(T.points[0]);
  for(let i=1;i<T.points.length;i++)d+=' L'+px(T.points[i])+' '+pz(T.points[i]);
  d+=' Z';
  const col='#'+T.edgeColor.toString(16).padStart(6,'0');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
    <path d="${d}" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="8" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${col}" stroke-width="4.5" stroke-linejoin="round" opacity="0.95"/>
    <circle cx="${px(T.points[0])}" cy="${pz(T.points[0])}" r="5" fill="#fff" stroke="#000" stroke-width="1.5"/>
  </svg>`;
}

function buildTrackGrid(){
  const grid=document.getElementById('trackGrid');grid.innerHTML='';
  TRACKS.forEach((T,i)=>{
    const card=document.createElement('button');card.type='button';card.className='track-card';card.setAttribute('aria-label',T.name+', '+T.difficulty);
    card.style.background=T.cardBg;card.style.border='2px solid '+T.cardBorder;
    card.innerHTML=
      `<div class="track-icon-badge">${T.icon}</div>`+
      `<div class="track-preview">${trackPreviewSVG(T)}</div>`+
      `<div class="track-info">`+
      `<h3 style="color:${T.nameColor}">${T.name}</h3>`+
      `<p>${T.desc}</p>`+
      `<div class="track-meta">`+
      `<span class="track-diff" style="color:${T.cardBorder}">${T.difficulty}</span>`+
      (bestTimes[T.id]?`<span class="track-best">⏱ ${formatTime(bestTimes[T.id])}</span>`:'')+
      `</div></div>`;
    card.onclick=()=>{selectedTrack=i;showSelect();};
    grid.appendChild(card);
  });
}

function buildTruckGrid(){
  const grid=document.getElementById('truckGrid');grid.innerHTML='';
  TRUCKS.forEach((def,i)=>{
    const locked=i>unlockedTier;
    const card=document.createElement('button');card.type='button';card.disabled=locked;card.className='truck-card'+(locked?' locked':'');card.setAttribute('aria-label',def.name);
    const sw=document.createElement('div');sw.className='truck-swatch';
    sw.style.background='#'+def.bodyColor.toString(16).padStart(6,'0');
    sw.style.borderColor='#'+def.trimColor.toString(16).padStart(6,'0');
    sw.style.boxShadow='0 0 10px #'+def.glowColor.toString(16).padStart(6,'0')+'55';
    card.appendChild(sw);
    card.innerHTML+='<h3>'+def.name+'</h3><div class="stars">'+(def.stars||'Starter')+'</div>';
    [{l:'Speed',v:def.speed/66,c:'#66ffaa'},{l:'Accel',v:def.accel/1.7,c:'#ffcc44'},{l:'Grip',v:def.grip,c:'#44aaff'},{l:'Jump',v:def.jumpPow/1.5,c:'#aa88ff'}].forEach(s=>{
      card.innerHTML+='<div class="stat-label"><span>'+s.l+'</span></div><div class="stat-bar"><div class="fill" style="width:'+s.v*100+'%;background:'+s.c+'"></div></div>';});
    if(!locked)card.onclick=()=>startRace(i);
    grid.appendChild(card);
  });
}

function startRace(idx){selectedTruck=idx;initRace();hideAll();gameState='countdown';document.getElementById('pauseButton').hidden=false;renderer?.domElement.focus();runCountdown();}
function runCountdown(){
  const el=document.getElementById('countdown');let c=3;el.style.display='block';el.textContent=c;
  playCountdownBeep(false);
  function next(){
    c--;
    if(c>=0){el.textContent=c||'GO!';el.style.color=c?'#ffcc44':'#66ffaa';el.style.animation='none';el.offsetHeight;el.style.animation='countPop .6s ease-out';playCountdownBeep(c===0);if(c===0)startEngine();scheduleRaceTask(next,800);}
    else{el.style.display='none';el.style.color='#ffcc44';gameState='racing';document.getElementById('hud').style.display='block';if(isMobile)document.getElementById('mobileControls').style.display='flex';}
  }
  scheduleRaceTask(next,800);
}

// ============================================================
// MAIN LOOP
// ============================================================
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.05);
  advanceRaceTasks(dt);
  if(gameState==='racing')updateGame(dt);
  else if(gameState==='countdown'&&truckGroup){
    const pt=trackCurve.getPointAt(0.001),fwd=getTrackForward(0.001);
    camera.position.lerp(new THREE.Vector3(pt.x-fwd.x*11,pt.y+5.5,pt.z-fwd.z*11),0.04);
    camera.lookAt(pt.x,pt.y+1,pt.z);
  }
  else if(gameState!=='paused'){
    const t=clock.elapsedTime;
    camera.position.set(Math.sin(t*0.07)*28,13,Math.cos(t*0.07)*28);
    camera.lookAt(60,0,-40);
    if(camera.fov!==62){camera.fov=62;camera.updateProjectionMatrix();}
  }
  renderer.render(scene,camera);
}

// ============================================================
// PROCEDURAL AUDIO
// ============================================================
let audioCtx=null,masterGain=null,engineOsc=null,engineGain=null,engineRunning=false,boostNoise=null,boostGain=null,jetpackOsc=null,jetpackGain=null;
let muted=false;
function initAudio(){
  if(audioCtx){audioCtx.resume().catch(()=>{});return;}
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return;
  try{audioCtx=new Audio();masterGain=audioCtx.createGain();masterGain.gain.value=muted?0:0.3;masterGain.connect(audioCtx.destination);}
  catch{audioCtx=null;document.getElementById('soundButton').textContent='Sound unavailable';}
}
function toggleSound(){muted=!muted;initAudio();if(masterGain)masterGain.gain.value=muted?0:0.3;const button=document.getElementById('soundButton');button.textContent=muted?'Sound off':'Sound on';button.setAttribute('aria-pressed',String(!muted));if(['racing','countdown'].includes(gameState))renderer?.domElement.focus();}

function startEngine(){if(!audioCtx||engineRunning)return;engineRunning=true;engineOsc=audioCtx.createOscillator();engineOsc.type='sawtooth';engineOsc.frequency.value=45;engineGain=audioCtx.createGain();engineGain.gain.value=0;const f=audioCtx.createBiquadFilter();f.type='lowpass';f.frequency.value=300;f.Q.value=2;engineOsc.connect(f);f.connect(engineGain);engineGain.connect(masterGain);engineOsc.start();const sub=audioCtx.createOscillator();sub.type='sine';sub.frequency.value=30;const subG=audioCtx.createGain();subG.gain.value=0;sub.connect(subG);subG.connect(masterGain);sub.start();engineOsc._sub=sub;engineOsc._subG=subG;engineOsc._filter=f;}
function updateEngineSound(speed,maxSpeed,boosting,isRocket){if(!engineOsc||!audioCtx)return;const r=Math.min(speed/maxSpeed,1);const bf=45+r*85;const v=0.04+r*0.12;engineOsc.frequency.setTargetAtTime(bf*(boosting||isRocket?1.4:1),audioCtx.currentTime,0.1);engineGain.gain.setTargetAtTime(v,audioCtx.currentTime,0.1);engineOsc._sub.frequency.setTargetAtTime(25+r*32,audioCtx.currentTime,0.1);engineOsc._subG.gain.setTargetAtTime(v*0.5,audioCtx.currentTime,0.1);engineOsc._filter.frequency.setTargetAtTime(200+r*520+(boosting?400:0),audioCtx.currentTime,0.1);}
function stopEngine(){if(!engineRunning)return;engineRunning=false;try{engineOsc._sub.stop();engineOsc.stop();}catch(e){}engineOsc=null;engineGain=null;}
function playNoiseBurst(vol,dur,fLow,fHigh){if(!audioCtx)return;const bs=Math.ceil(audioCtx.sampleRate*dur);const buf=audioCtx.createBuffer(1,bs,audioCtx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<bs;i++)d[i]=Math.random()*2-1;const src=audioCtx.createBufferSource();src.buffer=buf;const fl=audioCtx.createBiquadFilter();fl.type='bandpass';fl.frequency.value=(fLow+fHigh)/2;fl.Q.value=0.5;const g=audioCtx.createGain();g.gain.setValueAtTime(vol,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur);src.connect(fl);fl.connect(g);g.connect(masterGain);src.start();src.stop(audioCtx.currentTime+dur);}
function playJump(){if(!audioCtx)return;const o=audioCtx.createOscillator();o.type='sine';o.frequency.setValueAtTime(200,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(600,audioCtx.currentTime+0.15);const g=audioCtx.createGain();g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.2);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.2);playNoiseBurst(0.08,0.15,800,2000);}
function playLand(){if(!audioCtx)return;const o=audioCtx.createOscillator();o.type='sine';o.frequency.setValueAtTime(120,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(40,audioCtx.currentTime+0.15);const g=audioCtx.createGain();g.gain.setValueAtTime(0.12,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.2);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.2);playNoiseBurst(0.1,0.12,100,400);}
function playCollision(){if(!audioCtx)return;playNoiseBurst(0.2,0.25,200,1200);const o=audioCtx.createOscillator();o.type='square';o.frequency.setValueAtTime(80,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(30,audioCtx.currentTime+0.2);const g=audioCtx.createGain();g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.25);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.25);}
function playPickup(){if(!audioCtx)return;[523,659,784].forEach((f,i)=>{const o=audioCtx.createOscillator();o.type='sine';o.frequency.value=f;const g=audioCtx.createGain();g.gain.setValueAtTime(0,audioCtx.currentTime+i*0.08);g.gain.linearRampToValueAtTime(0.12,audioCtx.currentTime+i*0.08+0.03);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+i*0.08+0.15);o.connect(g);g.connect(masterGain);o.start(audioCtx.currentTime+i*0.08);o.stop(audioCtx.currentTime+i*0.08+0.15);});}
function playGunShot(){if(!audioCtx)return;playNoiseBurst(0.15,0.06,1000,4000);const o=audioCtx.createOscillator();o.type='square';o.frequency.setValueAtTime(800,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(100,audioCtx.currentTime+0.05);const g=audioCtx.createGain();g.gain.setValueAtTime(0.1,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.06);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.06);}
function playExplosion(){if(!audioCtx)return;playNoiseBurst(0.3,0.5,60,600);const o=audioCtx.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(100,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(20,audioCtx.currentTime+0.4);const g=audioCtx.createGain();g.gain.setValueAtTime(0.2,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.5);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.5);}
function playRocketStart(){if(!audioCtx)return;playNoiseBurst(0.15,0.3,400,3000);}
function startBoostSound(){if(!audioCtx||boostNoise)return;const bs=audioCtx.sampleRate*2;const buf=audioCtx.createBuffer(1,bs,audioCtx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<bs;i++)d[i]=(Math.random()*2-1)*0.5;boostNoise=audioCtx.createBufferSource();boostNoise.buffer=buf;boostNoise.loop=true;const f=audioCtx.createBiquadFilter();f.type='bandpass';f.frequency.value=600;f.Q.value=1;boostGain=audioCtx.createGain();boostGain.gain.value=0.06;boostNoise.connect(f);f.connect(boostGain);boostGain.connect(masterGain);boostNoise.start();}
function stopBoostSound(){if(!boostNoise)return;try{boostNoise.stop();}catch(e){}boostNoise=null;boostGain=null;}
function startJetpackSound(){if(!audioCtx||jetpackOsc)return;jetpackOsc=audioCtx.createOscillator();jetpackOsc.type='triangle';jetpackOsc.frequency.value=180;jetpackGain=audioCtx.createGain();jetpackGain.gain.value=0.06;const f=audioCtx.createBiquadFilter();f.type='lowpass';f.frequency.value=500;jetpackOsc.connect(f);f.connect(jetpackGain);jetpackGain.connect(masterGain);jetpackOsc.start();startBoostSound();}
function stopJetpackSound(){if(!jetpackOsc)return;try{jetpackOsc.stop();}catch(e){}jetpackOsc=null;jetpackGain=null;stopBoostSound();}
function playCountdownBeep(high){if(!audioCtx)return;const o=audioCtx.createOscillator();o.type='sine';o.frequency.value=high?880:440;const g=audioCtx.createGain();g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.2);o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+0.2);}

// ============================================================
// BOOT
// ============================================================
function showGraphicsError(){
  resetRaceSession();hideAll();gameState='error';
  document.getElementById('graphicsError').hidden=false;
}
function bootGame(){
  try{
    initThree();initSharedGeo();generateTrack();
    renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Race view. Arrow keys drive, Space jumps, Shift boosts, Escape pauses.');
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();showGraphicsError();});
    document.getElementById('pauseScreen').addEventListener('cancel',event=>{event.preventDefault();resumeRace();});
    animate();
  }catch{showGraphicsError();}
}
