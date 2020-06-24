  class Engine{
   constructor(dt,update,render){
     this.afr = undefined;
     this.step = dt;
     this.acc = 0;
     this.lastTime = window.performance.now();
   }
    run(time){
     let delta = time-this.lastTime
      this.lastTime = time;
      this.acc+=delta;
      if(this.acc>=this.step){
      update(this.step);
        this.acc-=this.step;
      }
      if(this.acc>this.step*3){
       this.acc=this.step; 
      }
      render();
      frames++;
      this.afr = window.requestAnimationFrame((time)=>{this.run(time)});
    }
    start(){
     this.afr = window.requestAnimationFrame((time)=>{this.run(time)});
    }
  }