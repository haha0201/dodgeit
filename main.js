var win;
const fov = 1;
var mainMenu = true;
var playerCamera = new Vec(0,0);
var outlinelock = false;
var outline = false;
var currentHero = 0;
var heros = ["Magmax","Jotunn","Kopo"]
var herocolors = [];
var switchHeroLock = false;
var switchModeLock = false;
var mouseP = false;
var modes = ["Normal"];
var mode = 0;
var imgJotunn;
var finishedSpeedrun = false;
var time = 0;
var skipFiveLevelLock = false;
var mouseMode = false;
var timeM = 0;
const codeinput = document.getElementById('data-input');
const codetext = document.getElementById('data-text');

var dev = false;

function SHA256(s) {
  var chrsz = 8;
  var hexcase = 0;

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function S(X, n) {
    return (X >>> n) | (X << (32 - n));
  }

  function R(X, n) {
    return (X >>> n);
  }

  function Ch(x, y, z) {
    return ((x & y) ^ ((~x) & z));
  }

  function Maj(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z));
  }

  function Sigma0256(x) {
    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
  }

  function Sigma1256(x) {
    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
  }

  function Gamma0256(x) {
    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
  }

  function Gamma1256(x) {
    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
  }

  function core_sha256(m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
    for (var i = 0; i < m.length; i += 16) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for (var j = 0; j < 64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }

  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    }
    return bin;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

codeinput.onsubmit = parse;
function parse(event){
  event.preventDefault();

  if (SHA256(codeinput.value) === "7b05d48716ba291c4bac7c13e299f8af3ab62adc293d758b302f36650ba0875a"){
    dev = true;
  }
}

function mousePressed(){
 mouseP = true; 
}
function mouseReleased(){
 mouseP = false; 
}
function mouseClicked(){
 if(!mainMenu && !finishedSpeedrun){
   if(mouseMode){
    mouseMode = false; 
   }else if(!mouseMode){
    mouseMode = true; 
   }
 }

}
function setup() {
  frameRate(60);
  engine.start();
  codeinput.onsubmit = parse;
  win = new Vec(windowWidth,windowHeight);
  herocolors = [ new Color(245, 12, 12), new Color(19, 165, 191), new Color(89, 76, 112)]
  createCanvas(win.x, win.y);  
imgJotunn = createImg('https://evades.io/winter-wreath.07f00139.png', "");
imgJotunn.hide();
  imgJotunnPower1 = createImg('https://evades.io/decay.b84a5b9a.png',"");
  imgJotunnPower1.hide();
  imgJotunnPower2 = createImg('https://evades.io/shatter.32a8da4c.png','');
  imgJotunnPower2.hide();
  imgMagmax = createImg('https://evades.io/santa-hat.8ff7f164.png','');
  imgMagmax.hide();
  imgMagmaxPower1 = createImg('https://evades.io/flow.dae3149d.png','');
  imgMagmaxPower1.hide();
  imgMagmaxPower2 = createImg('https://evades.io/harden.5bbbb359.png','');
  imgMagmaxPower2.hide();
  imgMagmaxPumpkin = createImg('https://evades.io/pumpkin_on.5fe3afd5.png','');
  imgMagmaxPumpkin.hide();
  imgMagmaxPumpkinOff = createImg('https://evades.io/pumpkin_off.bfce688c.png','');
  imgMagmaxPumpkinOff.hide();
  imgKopo=  createImg('https://evades.io/silver-crown.ffa388d3.png','')
  imgKopo.hide();
  imgKopoPower1 = createImg('https://evades.io/fusion.4854fbec.png','');
  imgKopoPower1.hide();
  imgKopoPower2 = createImg('https://evades.io/black_hole.c2eb364f.png','');
  imgKopoPower2.hide();
}
function keyPressed(){
  if(!mainMenu){
 controller.keys[keyCode] = true; 
  }
}
function keyReleased(){
  if(!mainMenu){
 controller.keys[keyCode] = false; 
  }
}
function windowResized() {
  win = new Vec(windowWidth, windowHeight)
  resizeCanvas(win.x, win.y);
}
function drawMenu(){
  background(herocolors[currentHero].r,herocolors[currentHero].g,herocolors[currentHero].b)
textFont("Maven Pro");
  stroke(0);
  strokeWeight(2)
 rect(win.x/2-200,win.y/2+200,400,50);
  textSize(90);
  text("Dodge.io",win.x/2-180,150);
  textSize(20);
  strokeWeight(1);
  text("I'm not responsible for any damage that happens to your computer. This is a rage game.",win.x/2-320,200);
  textSize(30);
  textFont("Georgia");
  text("PLAY",win.x/2-50,win.y/2+235);
  rect(50,305,200,50);
  text(`Hero:${heros[currentHero]}`,50,295);
  textFont("Helvetica");
  text(`Switch Hero`,60,340);
  rect(win.x-250,305,200,50);
  text(`Switch Mode`,win.x-240,340);
  text(`Mode:${modes[mode]}`,win.x-245,300);
  textSize(25);
  text(`WASD/Arrows keys to move:P to toggle outline:J and K or Z and X to use abilites:Good luck`,win.x/2-500,win.y-20);
   text(`Engine under maintenance. Things might not work as expected. Check back in a few days.`,win.x/2-500,win.y-70);
//  fill(255);
  textSize(20)
  strokeWeight(1.5);

  textSize(20);
  stroke(0);
  strokeWeight(1.5);
  if(heros[currentHero] !== 0){
    if(heros[currentHero] == "Magmax"){
    text(`Magmax's Abilites\nJ or Z to flow(makes you go 2x faster)\nK or X to harden(makes you invincible but you can't move and you \ncan harden up to 4 seconds with a cooldown of 3 seconds)`,win.x/2-300,win.y/2+100);
}else if(heros[currentHero] == "Jotunn"){
  text(`Jotunn's Abilites\nPassive Ability: If enemies are near you, they get 60% slower(Some enemies\naren't affected)\nShard Ability: K or Z to shatter enemies away(Some enemies aren't affected)`,win.x/2-300,win.y/2+100);
}else if(heros[currentHero] == "Kopo"){
  text(`Kopo's Abilites\nSmol: J or Z to make itself smaller\nDome Hole!(DH) : K or X to place down an aura(which traps enemies for a certain\namount of time and cannot kill you in the aura) when your smol`,win.x/2-300,win.y/2+100);
}
  }
  if(mouseX>50 && mouseX < 250 && mouseY>305 && mouseY<355 && !switchHeroLock){
    if(mouseP){
    switchHeroLock = true;
    if(heros.length-1 == currentHero){
     currentHero = 0; 
    }else{
    currentHero++;
    }
    }
  }else if(!mouseP){
   switchHeroLock = false; 
  }
  if(mouseX>win.x/2-200 && mouseX < win.x/2+200 && mouseY>win.y/2 +200&& mouseY<win.y/2+250 && mouseP){
   mainMenu = false; 
    game.player.heroProperties(heros[currentHero]);
    game.loadLevel();
    codeinput.setAttribute('hidden',true);
    codetext.setAttribute('hidden',true);
  }
  if(mouseX<win.x-50 && mouseX>win.x-250 && mouseY>305 && mouseY<355&& !switchModeLock&& mouseP){
    switchModeLock = true;
   if(mode == modes.length-1){
    mode = 0; 
   }else{
    mode++; 
   }
  }
  if(!mouseP){
   switchModeLock = false; 
  }
}
function update(dt){
  if(!mainMenu){
  if(game.player.pos.x+game.player.radius>360 && game.player.pos.y-game.player.radius<2760){
  if(game.zone === 0 || game.zone === 1){ //Crystal Cone and Crystal Cone Hard
    game.player.friction = 0.8;
  }
  if(game.zone === 2){ //Disastrous Wonderland
    game.player.friction = 0.7;
  }
  if(game.zone === 3 || game.zone === 4){ //Nightmare and Nightmare hard
    game.player.friction = 0.7;
  }
    if(game.zone === 5){ //Novel Name
      game.player.friction = 0.74
  }else if(game.zone === 6){
     game.player.friction = 0.78;
  }
  }else{
   game.player.friction = 0.75; 
  }
 
    game.player.collideEnemy(controller,game);
 game.player.simulate(game,controller,dt)
  if(controller.outline && !outlinelock){
   if(outline){
    outline = false; 
   }else{
    outline = true; 
   }
    outlinelock = true;
  }
  if(!controller.outline){
   outlinelock = false; 
  }
  for(let enemy of game.enemies){
    enemy.update(game,dt);
    if(enemy.type =='close'){
     enemy.sizeUpdate(game.player); 
    }
  }
  for(let i=game.bullets.length -1; i>=0;i--){
   game.bullets[i].update(dt);
    if(game.bullets[i].toDelete){
     game.bullets.splice(i,1); 
    }
  }
  if(controller.skipLevel){
   game.player.pos.x = world.x-100; 
  }/*
  if(controller.skipFiveLevels&&!skipFiveLevelLock){
    skipFiveLevelLock = true;
   game.level+=4;
    game.player.pos.x = world.x-100;
  }
  if(!controller.skipFiveLevels){
   skipFiveLevelLock = false; 
  }*/
  playerCamera = game.player.pos;
  }
}
function render(){  
  if(mainMenu&&time===0){
    drawMenu();
  }else if(!finishedSpeedrun){
  display.draw(game,fov,playerCamera,win,outline,herocolors[currentHero]);
  if(game.player.hero =="Jotunn"){
     image(imgJotunn,win.x/2-25,win.y/2-28,50,55);
    image(imgJotunnPower1,win.x/2-98,win.y-60,60,60);
    image(imgJotunnPower2,win.x/2+40,win.y-60,60,60);
    for(let enemy of game.enemies){
     if(enemy.slowdown){
      fill(0,0,200,20);
       noStroke();
       rect(win.x/2-98,win.y-60,60,60);
       break;
     }
    }
    if(game.player.cooldown >=1){
      fill(0,0,255,50);
      noStroke();
     rect(win.x/2+40,win.y-60,60,60) 
    }
  }
  if(game.player.hero == "Magmax"){
   image(imgMagmax,win.x/2-25,win.y/2-19,50,40); 
    image(imgMagmaxPower1,win.x/2-98,win.y-60,60,60);
    image(imgMagmaxPower2,win.x/2+40,win.y-60,60,60);
    if(game.player.cooldown>=1){
       image(imgMagmaxPumpkinOff,win.x/2-30,win.y-60,60,60);
    }else{
    image(imgMagmaxPumpkin,win.x/2-30,win.y-60,60,60);
    }
    if(game.player.flow){
     fill(204, 126, 49,90);
      noStroke();
      rect(win.x/2-98,win.y-60,60,60);
    }
    if(game.player.harden){
     fill(110, 20, 4,90);
      noStroke();
      rect(win.x/2+40,win.y-60,60,60);
    }
  }
  if(game.player.hero == "Kopo"){
    if(game.player.isSmall){
   image(imgKopo,win.x/2-22,win.y/2-29.5,44,60); 
    }else{
      image(imgKopo,win.x/2-27,win.y/2-31.5,55,65); 
    }
    image(imgKopoPower1,win.x/2-98,win.y-60,60,60)
     image(imgKopoPower2,win.x/2+40,win.y-60,60,60);
    if(game.player.isSmall){
     fill(0,0,50,50);
      rect(win.x/2-98,win.y-60,60,60);
    }
    if(game.player.cooldown>=1){
      fill(0,0,70,90);
      rect(win.x/2+40,win.y-60,60,60);
    }
  } 
    if(game.level>=41){
     finishedSpeedrun = true;
      game.level = 41;
      background(125);
      fill(0);
      textSize(40);
      text(`Region Defeated:${game.areas[game.zone]}`,win.x/2-230,40);
      text(`Hero Used:${heros[currentHero]}`,win.x/2-150,80);
      if(time<9){
      text(`Time:${timeM}:0${time}`,win.x/2-70,120);
        }else{
         text(`Time:${timeM}:${time}`,win.x/2-70,120); 
        }
      text(`Deaths:${game.player.deaths}`,win.x/2-70,160);
    }
}
}
const game = new Game();
const controller = new Controller();
const display = new Display();
const engine = new Engine(1000/60,update,render);

setInterval(()=>{
   if(!finishedSpeedrun&&!mainMenu){
   time++;
     if(time===60){
      timeM++;
       time = 0;
     }
  }
},1000)

