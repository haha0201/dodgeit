  class Engine{
   constructor(update,render){
     this.afr = undefined;
     this.lastTime = window.performance.now();
     this.updated = false;
   }
    run(){
      let now = ( (new Date().getTime()))
     let delta =Math.min(now-this.lastTime,100)/1000
      this.lastTime = now;
      update(delta);
      render(delta);
      frames+=60*delta
      this.afr = window.requestAnimationFrame(()=>{this.run()});
    }
    start(){
     this.afr = window.requestAnimationFrame(()=>{this.run()});
    }
  }
