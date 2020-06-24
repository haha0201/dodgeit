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
function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  
var world = new Vec(3150,450);
var globalSwitch= 0;
setInterval(()=>{
 globalSwitch++
},4000)
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
