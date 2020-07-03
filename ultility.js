var frames = 0;
const playSpeed = 120;
class Vec{
 constructor(x,y){
 this.x = x;
 this.y = y;
 }
  times(factor){
   return new Vec(this.x*factor,this.y*factor); 
  }
}
class Fade{
 constructor(x,y,xv,yv, stopx,stopy,sizex,sizey,type){
  this.pos = new Vec(x,y);
   this.vel = new Vec(xv,yv);
   this.stop = new Vec(stopx,stopy);
   this.size = new Vec(sizex,sizey);
   this.type=type;
   this.counted = false;
   this.time = 255;
   this.realtime = 0;
 }
  simulate(dt){
    this.pos.x+=this.vel.x*(1);
    this.pos.y+=this.vel.y*(1);
    if(this.type=="Magmax"){
      fill(99, 6, 6, this.time);
    }else if(this.type=="Jotunn"){
     fill(5, 78, 105, this.time); 
    }else if(this.type=="Kopo"){
     fill(23, 1, 54, this.time); 
    }
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
    if (this.realtime > 80){
   this.time-=2.5*(1)
    }
    this.realtime+=1.5;
  }
}
class MenuButton{
 constructor(x,y,xv,yv,stopx,stopy,type){
   this.sa = 1;
   this.pos = new Vec(x,y);
   this.vel = new Vec(xv,yv);
   this.stop = new Vec(stopx,stopy);
   this.size = new Vec(50,50);
   this.type = type;
   this.time = 3;
   this.touched = true;
   this.hero =0;
 }
  simulate(dt){
    this.touched = false;
  if(mouseX>this.pos.x-this.size.x&&mouseX<this.pos.x+this.size.x&&mouseY>this.pos.y-this.size.y&&mouseY<this.pos.y+this.size.y){
    this.sa+=50*(dt)
    if(this.type=="Magmax"&&this.vel.y===0){
     fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text("Magmax",win.x/2,win.y/2+win.y/4-25);
      textSize(20);
          text(`Magmax's Abilites\nJ or Z to flow(makes you go 2x faster)\nK or X to harden(makes you invincible but you can't move and you \ncan harden up to 4 seconds with a cooldown of 3 seconds)`,win.x/2,win.y/2+win.y/10);
      image(imgMagmaxWow,win.x/2+win.x/3,win.y/2,150,150)
      this.touched = true;
       this.hero =0;
      textAlign(LEFT, BOTTOM);
    }else if(this.type=="Jotunn"&&this.vel.y===0){
        fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text("Jotunn",win.x/2,win.y/2+win.y/4-25);
       textSize(20);
       text(`Jotunn's Abilites\nPassive Ability: If enemies are near you, they get 60% slower(Some enemies aren't affected)\nShard Ability: K or Z to shatter enemies away(Some enemies aren't affected)`,win.x/2,win.y/2+win.y/10);
       image(imgJotunnThonk,win.x/2+win.x/3,win.y/2,150,150)
      this.touched = true;
       this.hero =1;
      textAlign(LEFT, BOTTOM);
    }else if(this.type=="Kopo"&&this.vel.y===0){
        fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text("Kopo",win.x/2,win.y/2+win.y/4-25);
       textSize(20);
      text(`Kopo's Abilites\nSmol: J or Z to make itself smaller at the cost of a annoying trail\nDome Hole!(DH) : K or X to place down an aura(which traps enemies for a certain\namount of time and cannot kill you in the aura) when your smol`,win.x/2,win.y/2+win.y/10);
       image(imgKopoGlasses,win.x/2+win.x/3,win.y/2,150,150)
      this.touched = true;
       this.hero =2;
      textAlign(LEFT, BOTTOM);
    }
  }
    this.sa*=Math.pow(0.911,1);
    if(this.sa<1){this.sa =1;}
    if(this.sa>=1.5){this.sa = 1.5}
    this.pos.y+=this.vel.y;
    this.yv*=Math.pow(0.7,1);
   if(this.pos.y<this.stop.y){
    this.vel.y=0; 
   }
    if(this.type=='Jotunn'){
    fill(25, 213, 255, this.time);
    }else if(this.type=='Magmax'){
      fill(247, 42, 42, this.time);
    }else if(this.type=="Kopo"){
     fill(149, 26, 219, this.time); 
    }
     rect(this.pos.x-(this.size.x*this.sa)/2, this.pos.y-(this.size.y*this.sa)/2, this.size.x*this.sa, this.size.y*this.sa)
    if(this.type=="Jotunn"){
 fill(14, 115, 138, this.time);
    }else if(this.type=="Magmax"){
     fill(84, 5, 5, this.time); 
    }else if(this.type=="Kopo"){
     fill(50, 8, 74, this.time); 
    }
  rect(this.pos.x-(this.size.x*this.sa)/2, this.pos.y+(this.size.y*this.sa)/69420, this.size.x*this.sa, this.size.y*this.sa/2)
  if (this.time < 500){
  this.time*= 1.2;
  }
  }
}
function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  
var world = new Vec(3150,450);
var globalSwitch= 0;
class Safe{
 constructor(x,y,w,h){
  this.x = x;
   this.y = y;
   this.w =w;
   this.h = h;
 }
}
class Color{
 constructor(r,g,b){
  this.r = r;
   this.g = g;
   this.b = b;
 }
}
class Teleporter{
 constructor(x,y,w,h,type){
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.tele = undefined;
   this.type = type;
 }
}
class AreaTeleporter extends Teleporter{
  constructor(x,y,w,h,type){
    super(x,y,w,h,type); 
  }
}
