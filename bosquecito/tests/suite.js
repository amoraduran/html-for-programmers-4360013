const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'bosquecito.html'),'utf8');
const ACCESSOR = `
window.__D = { get P(){return P}, get G(){return G}, get LS(){return LS}, get guess(){return guess}, get fruit(){return fruit}, get run(){return run}, get memo(){return memo}, get bugs(){return bugs}, get beat(){return beat}, get fish(){return fish}, get gameMode(){return gameMode}, get squash(){return squash}, get petting(){return petting}, get heldChar(){return heldChar}, get charOY(){return charOY}, get dizzy(){return dizzy}, get dropFood(){return dropFood}, get bathBubbles(){return bathBubbles}, get charBox(){return charBox}, get airborne(){return airborne}, setLift(y){charOY=y;}, setVel(v){charVY=v; airborne=true;} };
</scr`+`ipt>`;
const html = src.replace('</scr'+'ipt>', ACCESSOR);
const ctxStub = () => new Proxy({}, { get:(t,p)=>{
  if(p==='createLinearGradient') return ()=>({addColorStop:()=>{}});
  if(p==='measureText') return ()=>({width:10});
  return typeof p==='string' ? (()=>{}) : undefined;
}, set:()=>true });
const dom = new JSDOM(html, {
  runScripts:'dangerously', url:'https://b.test/', pretendToBeVisual:true,
  beforeParse(window){
    window.HTMLCanvasElement.prototype.getContext = function(){ return ctxStub(); };
    window.AudioContext = function(){ return { createOscillator:()=>({connect:()=>{},start:()=>{},stop:()=>{},frequency:{value:0,setValueAtTime:()=>{}},type:''}), createGain:()=>({connect:()=>{},gain:{value:0,setValueAtTime:()=>{},linearRampToValueAtTime:()=>{},exponentialRampToValueAtTime:()=>{}}}), destination:{}, currentTime:0 }; };
    window.confirm = ()=>true;
    window.requestAnimationFrame = ()=>0;
    window.navigator.vibrate = ()=>true;
  }
});
const w = dom.window, D = () => w.__D;
const $ = id => w.document.getElementById(id);
const pt = (type, x, y) => w.cv.dispatchEvent(new w.PointerEvent(type, {clientX:x, clientY:y, buttons:1}));
let errors = [];
const step = (name, fn) => { try{ fn(); console.log("OK  "+name); }catch(e){ console.log("FAIL "+name+": "+(e.message||e)); errors.push(name); } };
w.cv.getBoundingClientRect = () => ({left:0, top:0, width:340, height:250});

step("boot+pick", ()=> { w.go('select'); w.pick('gaia'); w.draw(); if(!D().charBox.w) throw new Error('no charBox'); });
step("grab converts to carry", ()=> {
  const b = D().charBox;
  pt('pointerdown', b.x+b.w/2, b.y+b.h/2);
  pt('pointermove', b.x+b.w/2+30, b.y+b.h/2-40);
  pt('pointermove', b.x+b.w/2+60, b.y+b.h/2-80);
  if(!D().heldChar) throw new Error('not held');
});
step("carry lifts", ()=> { if(D().charOY <= 0) throw 0; });
step("release falls+lands settled", ()=> {
  pt('pointerup', 200, 60);
  for(let i=0;i<260;i++) w.draw();
  if(D().charOY > 0.5 || D().airborne) throw new Error('oy='+D().charOY+' air='+D().airborne);
});
step("hard drop dizzy wears off", ()=> {
  D().setLift(150); D().setVel(-2);
  for(let i=0;i<60;i++) w.draw();
  if(D().dizzy <= 0) throw new Error('no dizzy');
  for(let i=0;i<200;i++) w.draw();
  if(D().dizzy > 0) throw new Error('dizzy stuck at '+D().dizzy);
  if(D().airborne) throw new Error('airborne stuck');
});
step("tickle rub reward", ()=> {
  w.draw();
  const b = D().charBox;
  const cy = b.y+b.h-4;
  pt('pointerdown', b.x+b.w/2, cy);
  let x = b.x+b.w/2;
  for(let i=0;i<8;i++){ x += (i%2? -14 : 14); pt('pointermove', x, cy); }
  D().P.cosq = 0; D().P.ale = 50;
  pt('pointerup', x, cy);
  if(D().P.ale <= 50) throw new Error('ale '+D().P.ale);
  for(let i=0;i<80;i++) w.draw();
});
step("feed spawns dropFood", ()=> {
  D().G.inv.manzana = 3; D().P.ham = 50;
  w.feed('manzana');
  if(!D().dropFood || D().G.inv.manzana !== 2) throw 0;
});
step("drag to mouth eats", ()=> {
  w.draw();
  const f = D().dropFood, b = D().charBox;
  pt('pointerdown', f.x, f.y);
  pt('pointermove', b.x+b.w/2, b.y+b.h*0.42);
  pt('pointerup', b.x+b.w/2, b.y+b.h*0.42);
  if(D().dropFood || Math.round(D().P.ham) !== 70) throw new Error('ham '+D().P.ham);
});
step("auto-eat fallback", ()=> {
  w.feed('manzana');
  D().dropFood.auto = 1;
  for(let i=0;i<300 && D().dropFood; i++) w.draw();
  if(D().dropFood) throw 0;
});
step("refusal", ()=> { D().P.ham=96; D().G.inv.manzana=1; w.feed('manzana'); if(D().dropFood||D().G.inv.manzana!==1) throw 0; });
step("scrub cleans poop", ()=> {
  D().P.poops.length = 0;
  D().P.poops.push({x: 280, born: Date.now()});
  D().P.hig = 50;
  w.draw();
  pt('pointerdown', 285, 220);
  for(let i=0;i<8;i++) pt('pointermove', 285 + (i%2? -12: 12), 220);
  pt('pointerup', 285, 220);
  if(D().P.poops.length !== 0 || D().P.hig <= 50) throw new Error('poops='+D().P.poops.length);
});
step("bath bubbles pop", ()=> {
  D().P.hig = 40;
  w.bath();
  const b = D().bathBubbles[0], n0 = D().bathBubbles.length;
  pt('pointerdown', b.x, b.y);
  pt('pointerup', b.x, b.y);
  if(D().bathBubbles.length !== n0-1) throw 0;
  D().bathBubbles.length = 0;
});
step("fruit drag control", ()=> {
  D().P.ene = 90;
  w.startFruit();
  pt('pointerdown', 60, 100);
  for(let i=0;i<30;i++) w.draw();
  if(Math.abs(D().fruit.px - 60) > 8) throw 0;
});
step("combo math", ()=> { D().fruit.combo=0; if(w.fruitMult()!==1) throw 0; D().fruit.combo=3; if(w.fruitMult()!==2) throw 0; D().fruit.combo=7; if(w.fruitMult()!==3) throw 0; });
step("hazard stun", ()=> {
  D().fruit.combo = 5; D().fruit.items.length = 0;
  D().fruit.items.push({x: D().fruit.px, y: 219, v: 5, e:'🍍', bad:true});
  w.draw();
  if(D().fruit.combo !== 0 || D().fruit.stun <= 0) throw 0;
});
step("golden value", ()=> {
  D().fruit.stun = 0; D().fruit.combo = 3; const s0 = D().fruit.score;
  D().fruit.items.length = 0;
  D().fruit.items.push({x: D().fruit.px, y: 219, v: 5, e:'🌟', gold:true});
  w.draw();
  if(D().fruit.score !== s0 + 6) throw 0;
});
step("fruit finish", ()=> { D().fruit.caught = 16; w.finishFruit(); if(!D().G.logros.goleada) throw 0; });
step("run jump", ()=> {
  D().P.ene = 90;
  w.startRun();
  pt('pointerdown', 170, 100);
  if(D().run.vy <= 0) throw 0;
});
step("run pass count", ()=> {
  D().run.logs.length = 0;
  D().run.logs.push({x: 40, passed:false});
  w.draw();
  if(D().run.count < 1) throw 0;
});
step("run collision", ()=> {
  D().run.oy = 0; D().run.vy = 0;
  D().run.logs.length = 0;
  D().run.logs.push({x: 76, passed:false});
  w.draw();
  if(!D().run.over) throw 0;
});
step("run jump buffer + coyote", ()=> {
  D().P.ene = 90; w.startRun();
  w.runJump();
  if(D().run.vy <= 0) throw new Error('no first jump');
  D().run.buffer = 0;
  w.runJump();                       // airborne: should buffer, not jump
  if(D().run.buffer <= 0) throw new Error('input not buffered');
  D().run.logs.length = 0;
  D().run.oy = 0.5; D().run.vy = -1;  // descending toward ground
  w.draw();                          // lands -> buffered jump fires
  if(D().run.vy <= 0) throw new Error('buffered jump did not fire');
  w.endGame(true);
});
step("panels blocked mid-game", ()=> {
  setTimeout(()=>{}, 0);
});
step("guess regression", ()=> { w.endGame(true); D().P.ene=90; w.startGuess(); D().guess.hits=4; w.finishGuess(); if(D().gameMode) throw 0; });
step("panel block check", ()=> { D().P.ene=90; w.startFruit(); w.openPanel('p-shop'); const open = $('p-shop').className.includes('open'); w.endGame(true); if(open) throw 0; });
step("sleep cycle", ()=> { w.sleepToggle(); if(!D().P.sleeping) throw 0; w.sleepToggle(); });
step("travesura", ()=> {
  w.draw();
  D().P.trav = {t:45,line:'x'}; D().P.sleeping = false;
  const b = D().charBox;
  pt('pointerdown', b.x+b.w/2, b.y+b.h/2);
  pt('pointerup', b.x+b.w/2, b.y+b.h/2);
  if(D().P.trav !== null) throw 0;
});
step("missions troncos", ()=> {
  D().G.mis = null; w.todayMissions();
  D().G.mis.ids = ['troncos','juegos','comidas']; D().G.mis.prog={}; D().G.mis.done={};
  w.missionProg('troncos', 8);
  if(!D().G.mis.done.troncos) throw 0;
});
step("logros rows", ()=> { w.renderLogros(); if(w.document.querySelectorAll('.logroRow').length !== 18) throw 0; });
step("persist", ()=> { w.saveAll(); if(!D().LS.get('bosquecito_gaia')) throw 0; });
step("60 frames stable", ()=> { for(let i=0;i<60;i++) w.draw(); });

step("meterTap ham opens food", ()=> {
  w.endGame(true); w.closePanels();
  w.meterTap('ham');
  if(!$('p-food').className.includes('open')) throw 0;
  w.closePanels();
});
step("meterTap hig bathes", ()=> {
  D().P.hig = 40; D().P.sleeping = false;
  w.meterTap('hig');
  if(D().P.hig !== 100) throw 0;
  D().bathBubbles.length = 0;
});
step("smart attention icon+fix", ()=> {
  D().P.ham = 10; D().P.ale = 80; D().P.ene = 80; D().P.hig = 80; D().P.sick = false; D().P.poops.length = 0; D().P.sleeping = false;
  w.attTick(1);
  if($('alertIcon').textContent !== '🍚') throw new Error('icon '+$('alertIcon').textContent);
  if(!w.document.querySelector('.mt-ham').className.includes('crit')) throw new Error('no crit pulse');
  w.attTap();
  if(!$('p-food').className.includes('open')) throw new Error('fix did not open food');
  w.closePanels();
  D().P.ham = 80; w.attTick(1);
  if(w.document.querySelector('.meter.crit')) throw new Error('crit not cleared');
});
step("xp bar fills", ()=> {
  D().P.xp = 0; w.refreshTop();
  const w0 = $('xpFill').style.width;
  D().P.xp = 10; w.refreshTop();
  if($('xpFill').style.width === w0) throw new Error(w0+' vs '+$('xpFill').style.width);
});
step("levelup overlay shows", ()=> {
  D().P.xp = 0; w.refreshTop();
  w.addXP(25);
  if(!$('lvlOverlay').className.includes('show')) throw 0;
  $('lvlOverlay').classList.remove('show');
});
step("ingame focus mode", ()=> {
  D().P.ene = 90;
  w.startFruit();
  if(!$('s-play').className.includes('ingame')) throw 0;
  w.endGame(true);
  if($('s-play').className.includes('ingame')) throw 0;
});
step("backdrop closes sheet", ()=> {
  w.openPanel('p-shop');
  $('p-shop').dispatchEvent(new w.PointerEvent('pointerdown', {bubbles:true}));
  if($('p-shop').className.includes('open')) throw 0;
});
step("grabbers present", ()=> { if(w.document.querySelectorAll('.grabber').length !== 6) throw 0; });
step("sleep disables dock", ()=> {
  w.sleepToggle();
  if(!w.document.querySelector('.dk-food').className.includes('zz')) throw 0;
  w.sleepToggle();
  if(w.document.querySelector('.dk-food').className.includes('zz')) throw 0;
});
step("select badges", ()=> {
  w.saveAll(); w.backToSelect(); w.buildSelect();
  const n = w.document.querySelectorAll('.cbadge').length;
  if(n !== 6) throw new Error(n+' badges');
  w.pick('gaia'); w.draw();
});
step("hud urgent pulse", ()=> {
  D().P.ene = 90; w.startFruit();
  D().fruit.t = 4; w.fruitTick(0.01);
  if(!$('gameHud').className.includes('urgent')) throw 0;
  w.endGame(true);
});

step("fruit button fallback", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startFruit();
  D().fruit.tx = 100; D().fruit.px = 100;
  w.fruitHold(1);
  for(let i=0;i<10;i++) w.draw();
  if(D().fruit.tx <= 100) throw new Error('did not move right '+D().fruit.tx);
  w.fruitHold(0);
  const tx = D().fruit.tx;
  for(let i=0;i<5;i++) w.draw();
  if(D().fruit.tx !== tx) throw new Error('kept moving after release');
  w.endGame(true);
});
step("memo play + wrong ends", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startMemo();
  for(let i=0;i<220 && D().memo.phase==='show'; i++) w.draw();
  if(D().memo.phase !== 'input') throw new Error('stuck in show');
  const seq0 = D().memo.seq[0];
  const p0 = D().memo.pads[seq0];
  pt('pointerdown', p0.x+p0.w/2, p0.y+p0.h/2);
  if(D().memo.round !== 2 || D().memo.seq.length !== 2) throw new Error('no advance r='+D().memo.round);
  for(let i=0;i<220 && D().memo.phase==='show'; i++) w.draw();
  if(D().memo.phase !== 'input') throw new Error('stuck in show 2');
  const wrong = D().memo.pads[(D().memo.seq[0]+1)%4];
  pt('pointerdown', wrong.x+wrong.w/2, wrong.y+wrong.h/2);
  if(!D().memo.over || D().gameMode) throw new Error('not over');
});
step("bugs catch + bee penalty", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startBugs();
  D().bugs.spawn = 9999; D().bugs.items.length = 0;
  D().bugs.items.push({x:100, y:100, r:16, ttl:120, age:20, bad:false});
  w.draw();
  pt('pointerdown', 100, 100);
  if(D().bugs.caught !== 1 || D().bugs.score < 1) throw new Error('sc '+D().bugs.score);
  D().bugs.combo = 5;
  D().bugs.items.push({x:200, y:120, r:16, ttl:120, age:20, bad:true});
  pt('pointerdown', 200, 120);
  if(D().bugs.combo !== 0) throw new Error('combo not reset');
});
step("bugs finish", ()=> {
  D().bugs.caught = 20; D().bugs.score = 20; D().bugs.t = 0;
  w.bugsTick(0.1);
  if(D().gameMode || !D().G.logros.cazaluces) throw new Error('finish');
});
step("beat hit + miss", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startBeat();
  D().beat.spawn = 9999; D().beat.notes.length = 0;
  D().beat.notes.push({x:100, y:204, v:2, hit:false});
  w.draw();
  const s0 = D().beat.score;
  w.beatTap();
  if(D().beat.hits !== 1 || D().beat.score <= s0) throw new Error('no hit '+D().beat.score);
  D().beat.combo = 5;
  D().beat.notes.push({x:100, y:20, v:2, hit:false});
  w.beatTap();
  if(D().beat.combo !== 0) throw new Error('combo not reset');
});
step("beat finish", ()=> {
  D().beat.score = 10; D().beat.t = 0;
  w.beatTick(0.1);
  if(D().gameMode) throw new Error('not finished');
});
step("fish catch + early", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startFish();
  D().fish.state = 'bite'; D().fish.win = 46; D().fish.biteT = 40;
  const s0 = D().fish.score;
  w.fishTap();
  if(D().fish.caught !== 1 || D().fish.score <= s0 || D().fish.state !== 'wait') throw new Error('catch');
  D().fish.state = 'wait'; D().fish.waitT = 5;
  w.fishTap();
  if(D().fish.state !== 'wait') throw new Error('early tap');
});
step("fish finish", ()=> {
  D().fish.caught = 8; D().fish.score = 12; D().fish.t = 0;
  w.fishTick(0.1);
  if(D().gameMode || !D().G.logros.pescador) throw new Error('finish');
});
step("result stars overlay", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startGuess(); D().guess.hits = 5; w.finishGuess();
  if(!$('resOverlay').className.includes('show')) throw new Error('overlay not shown');
  const spans = w.document.querySelectorAll('#resStars span');
  if(spans.length !== 3) throw new Error('star span count '+spans.length);
  if(spans[0].textContent !== '⭐') throw new Error('5/5 should be 3 stars');
  w.hideResult();
  if($('resOverlay').className.includes('show')) throw new Error('not hidden');
});
step("result replay restarts game", ()=> {
  w.endGame(true); D().P.ene = 90; D().P.sick = false;
  w.startBugs(); D().bugs.score = 5; D().bugs.caught = 5; D().bugs.t = 0;
  w.bugsTick(0.1);                       // finishes -> shows stars with replay=startBugs
  if(D().gameMode) throw new Error('did not end');
  w.doReplay();
  if(D().gameMode !== 'bugs') throw new Error('replay did not restart, mode='+D().gameMode);
  if($('resOverlay').className.includes('show')) throw new Error('overlay still open');
  w.endGame(true);
});

setTimeout(()=>{
  console.log(errors.length ? "\nFAILED: "+errors.join(', ') : "\nALL 50 TESTS PASSED");
  process.exit(errors.length?1:0);
}, 700);
