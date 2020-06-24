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
setTimeout(()=>{
engine.start();
},200);
setInterval(()=>{
   if(!finishedSpeedrun&&!mainMenu){
   time++;
     if(time===60){
      timeM++;
       time = 0;
     }
  }
},1000)

