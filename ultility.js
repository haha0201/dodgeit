var frames = 0;
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
 constructor(x,y,xv,yv, stopx,stopy,type){
  this.pos = new Vec(x,y);
   this.vel = new Vec(xv,yv);
   this.stop = new Vec(stopx,stopy);
   this.type=type;
 }
  simulate(){
    
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
 }
  simulate(){
  if(mouseX>this.pos.x-this.size.x&&mouseX<this.pos.x+this.size.x&&mouseY>this.pos.y-this.size.y&&mouseY<this.pos.y+this.size.y){
    this.sa+=0.2
    if(this.type=="Magmax"&&this.vel.y===0){
     fill(0);
      noStroke();
      text("Magmax",win.x/2-125,win.y/2+win.y/4-10);
      textSize(20);
          text(`Magmax's Abilites\nJ or Z to flow(makes you go 2x faster)\nK or X to harden(makes you invincible but you can't move and you \ncan harden up to 4 seconds with a cooldown of 3 seconds)`,win.x/2-300,win.y/2+win.y/10);
    }else if(this.type=="Jotunn"&&this.vel.y===0){
        fill(0);
      noStroke();
      text("Jotunn",win.x/2-125,win.y/2+win.y/4-10);
       textSize(20);
       text(`Jotunn's Abilites\nPassive Ability: If enemies are near you, they get 60% slower(Some enemies aren't affected)\nShard Ability: K or Z to shatter enemies away(Some enemies aren't affected)`,win.x/2-400,win.y/2+win.y/10);
    }else if(this.type=="Kopo"&&this.vel.y===0){
        fill(0);
      noStroke();
      text("Kopo",win.x/2-100,win.y/2+win.y/4-10);
       textSize(20);
      text(`Kopo's Abilites\nSmol: J or Z to make itself smaller\nDome Hole!(DH) : K or X to place down an aura(which traps enemies for a certain\namount of time and cannot kill you in the aura) when your smol`,win.x/2-300,win.y/2+win.y/10);
    }
  }
    this.sa*=0.911;
    if(this.sa<1)this.sa =1;
    if(this.sa>=1.7)this.sa = 1.71
    this.pos.y+=this.vel.y;
    this.yv*=0.7;
   if(this.pos.y<this.stop.y){
    this.vel.y=0; 
   }
    if(this.type=='Jotunn'){
    fill(25, 213, 255);
    }else if(this.type=='Magmax'){
      fill(247, 42, 42);
    }else if(this.type=="Kopo"){
     fill(149, 26, 219); 
    }
     rect(this.pos.x-(this.size.x*this.sa)/2, this.pos.y-(this.size.y*this.sa)/2, this.size.x*this.sa, this.size.y*this.sa)
    if(this.type=="Jotunn"){
 fill(14, 115, 138);
    }else if(this.type=="Magmax"){
     fill(84, 5, 5); 
    }else if(this.type=="Kopo"){
     fill(50, 8, 74); 
    }
  rect(this.pos.x-(this.size.x*this.sa)/2, this.pos.y+(this.size.y*this.sa)/69420, this.size.x*this.sa, this.size.y*this.sa/2)
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
