class Display{
 constructor(){
   
 }
  draw(game,fov,playerCamera,win,outline){
    background(150);
    if(game.zone === 0 ){
     background(168,215,237,120); 
    }else if(game.zone === 1){
     background(4, 76, 105,120); 
    }else if(game.zone === 2){
     background(200,41,0,60); 
    }else if(game.zone === 3 || game.zone ===4){
    background(10,10,10,220);
    }else if(game.zone === 5){
     background(221, 204, 255,80); 
    }else if(game.zone === 6){
     background(107, 27, 227,80) 
    }else if(game.zone === game.hellZone){
      background(40,40,40,220);
    }
    /* drawing map */
    if(outline){
     stroke(0);
      strokeWeight(2*fov)
    }else{
    noStroke();
    }
    fill(200);
    rect(win.x/2 + (0-playerCamera.x)*fov,win.y/2+(0-playerCamera.y)*fov,world.x*fov,world.y*fov);
    if(game.zone ===0 ){
     fill(168, 215, 237,80) 
    }else if(game.zone===1){
      fill(4, 76, 105,80);
    }else if(game.zone === 2){
     fill(161, 61, 14,80); 
    }else if(game.zone === 3){
     fill(10,10,10,80); 
    }else if(game.zone === 4){
     fill(0,0,0,80); 
    }else if(game.zone === 5){
     fill(221, 204, 255,80); 
    }else if(game.zone === 6){
     fill(107, 27, 227,80); 
    }
    rect(win.x/2 + (0-playerCamera.x)*fov,win.y/2+(0-playerCamera.y)*fov,world.x*fov,world.y*fov);
    if(game.zone === game.hellZone){
     fill(20,20,20,150); 
    }
      /* drawing safe zones */
    for(let safe of game.world.safes){
     rect(win.x/2+(safe.x-playerCamera.x)*fov,win.y/2+(safe.y-playerCamera.y)*fov,safe.w*fov, safe.h*fov); 
    }
    /* drawing teleporter*/
    fill(255,242,0);
    for(let teleporter of game.world.teleporters){
    rect(win.x/2+(teleporter.x-playerCamera.x)*fov,win.y/2 + (teleporter.y-playerCamera.y)*fov,teleporter.w*fov,teleporter.h*fov);
    }
    fill(12, 250, 210)
    for(let teleporter of game.world.areaTeleporters){
      if(teleporter.type=='side'){
        fill(219, 49, 46,110); 
      }
       rect(win.x/2+(teleporter.x-playerCamera.x)*fov,win.y/2 + (teleporter.y-playerCamera.y)*fov,teleporter.w*fov,teleporter.h*fov);
    }
    /* drawing enemies */
    for(let enemy of game.enemies){
      if(enemy.type =='normal'){
          fill(100);
      }else if(enemy.type == 'dasher'){
       fill(50,50,200); 
      }else if(enemy.type =='close'){
        stroke(0, 0, 0);
        if(!enemy.shatter){
        strokeWeight(1*fov);
       fill(48, 182, 166);
        }
      }else if(enemy.type == 'slowdown'){
       fill( 212, 53, 32);
        if(!enemy.shatter){
        stroke(0);
        strokeWeight(1*fov);
        }
      }else if(enemy.type == 'sniper'){
        fill(125, 79, 32)
        noStroke();
      }else if(enemy.type =='homing'){
       fill(219, 83, 24);
      }else if(enemy.type == 'freeze'){
       fill(115, 24, 161); 
      }else if(enemy.type == 'exploder'){
       fill(142, 31, 148);
      }else if(enemy.type =='border'){
       fill(0,0,0); 
      }else if(enemy.type == 'circle'){
         
            fill( 112, 31, 4);
      }else if(enemy.type == 'rotate'){
       fill(194, 160, 25); 
      }else if(enemy.type =='weird'){
       fill(22, 97, 9 );
      }else if(enemy.type=='megaslow'){
       fill(27, 171, 152); 
      }else if(enemy.type == 'sizing'){
       fill(237, 103, 0); 
      }else if(enemy.type == 'icicle'){
       fill(22, 167, 224); 
      }else if(enemy.type =='liquid'){
       fill(11, 117, 143); 
      }else if(enemy.type=='immune'){
       fill(10); 
      }else if(enemy.type=="switch" && enemy.canDie){
       fill(50,50,50,220); 
      }else if(enemy.type=="switch" && !enemy.canDie){
       fill(120,120,120,75); 
      }
     
      if(enemy.shatter){
       fill(120,120,120, 45) 
      }
       if(outline){
                  stroke(0);
         if(enemy.type=='switch' &&!enemy.canDie){
            stroke(120,120,120,75); 
         }
         if(enemy.shatter){
           stroke(120,120,120,45);
         }
         strokeWeight(2*fov) 
      }
    circle(win.x/2+(enemy.pos.x-playerCamera.x)*fov,win.y/2+(enemy.pos.y-playerCamera.y)*fov,enemy.size*fov);
      if(enemy.slowdown && enemy.type !='border'&&enemy.type!='immune'&&!enemy.shatter){
       fill(99, 145, 148,120); 
 circle(win.x/2+(enemy.pos.x-playerCamera.x)*fov,win.y/2+(enemy.pos.y-playerCamera.y)*fov,enemy.size*fov);
      }
      if(enemy.type =='close'){
        noStroke();
  fill(98, 252, 206, 15);
      }else if(enemy.type == 'slowdown'){
       noStroke();
        fill(212,53,32,15);
        noStroke();
      }else if(enemy.type =='megaslow'){
        noStroke();
        fill(27, 171, 152,15);
      }
      if(enemy.auraSize){
      circle(win.x/2+(enemy.pos.x-playerCamera.x)*fov,win.y/2+(enemy.pos.y-playerCamera.y)*fov,enemy.auraSize*fov);
      }
    }
    /* drawing bullets */
    
    if(outline){
      stroke(0);
       strokeWeight(2*fov) 
    }else{
     noStroke(); 
    }
    fill(125, 79, 32);
    for(let bullet of game.bullets){
      if(bullet.type == 'freeze'){
         fill(55, 77, 176); 
      }else if(bullet.type == 'exploder'){
       fill(142, 31, 148); 
      }else if(bullet.type=='normal'){
           fill(125, 79, 32);
      }
    circle(win.x/2+(bullet.pos.x-playerCamera.x)*fov,win.y/2+(bullet.pos.y-playerCamera.y)*fov,bullet.size*fov);
      }
    /* drawing player */
    fill(herocolors[currentHero].r,herocolors[currentHero].g,herocolors[currentHero].b);
    if(game.player.flow){
     fill( 207, 114, 14);
    }else if(game.player.harden){
     fill(105, 7, 7)
    }
    noStroke();
    if(game.player.freezed){
      fill(30, 58, 217);
    }
    circle(win.x/2,win.y/2,game.player.radius*2*fov);
    if(game.player.hero == "Kopo" && game.player.isSmall){
    for(let i = game.player.history.length-1; i>=0;i--){
        noStroke();
       fill(herocolors[currentHero].r,herocolors[currentHero].g,herocolors[currentHero].b,100*(i/25));
    if(game.player.freezed){
      fill(30, 58, 217);
    }
    if(game.player.firstFreeze){
     fill(146, 44, 184); 
    }
     circle(win.x/2 +(game.player.history[i].x - playerCamera.x)*fov,win.y/2+(game.player.history[i].y-playerCamera.y)*fov,game.player.radius*2*fov); 
      }
       if(game.player.auraLocation.x !==-10000&&game.player.dhAt === game.zone){
      fill(84, 92, 196,game.player.auraDuration+10);
      circle(win.x/2+(game.player.auraLocation.x-playerCamera.x)*fov,win.y/2+(game.player.auraLocation.y-playerCamera.y)*fov,game.player.auraSize*fov);
    }
    }
    /* level text */
    textSize(60*fov);
    stroke(170);
    strokeWeight(10*fov)
    fill(255,0,0);
    if(game.zone === 0 || game.zone === 1){
    fill(46, 184, 209);
    }else if(game.zone === 2){
     fill(205,0,0); 
    }else if(game.zone === 3|| game.zone === 4){
     fill(255); 
    }else if(game.zone === 5){
     fill(137, 114, 184); 
    }else if(game.zone === 6){
     fill(107, 27, 227) 
    }
    if(game.level !== 0&&game.areas[game.zone]!== undefined){
    text(`${game.areas[game.zone]}: Level ${game.level}`,win.x/2-200 +(600-playerCamera.x)*fov,win.y/2+(-50-playerCamera.y)*fov);
    }else if(game.level === 0&&game.areas[game.zone]!== undefined){
      text(`${game.areas[game.zone]}`,win.x/2-200 +(600-playerCamera.x)*fov,win.y/2+(-50-playerCamera.y)*fov);
    }
    if(game.areas[game.zone]=== undefined){
       text(`Dev Project: Level ${game.level+1}`,win.x/2-200 +(600-playerCamera.x)*fov,win.y/2+(-50-playerCamera.y)*fov);
    }
    if(game.zone === game.hellZone){
      if( game.level === 0){
        text(`Why did you come here? You can't leave`,win.x/2-200 +(400-playerCamera.x)*fov,win.y/2+(-200-playerCamera.y)*fov);
    }else if(game.level === 1){
       text(`Aw, you're still here. You might as well complete the levels`,win.x/2-200 +(400-playerCamera.x)*fov,win.y/2+(-200-playerCamera.y)*fov);
    }else if(game.level === 2){
       text(`Ready to refresh?`,win.x/2-200 +(400-playerCamera.x)*fov,win.y/2+(-200-playerCamera.y)*fov);
    }
    }

    fill(125);
    noStroke();
    if(game.player.hero == "Jotunn"){
     //     textFont("Maven Pro");
     
      stroke(0,0,170,90);
      strokeWeight(6);
      fill(145,145,145,90);
      rect(win.x/2-98,win.y-60,198,60);
      stroke(0);
      strokeWeight(1);
      fill(58, 107, 186,50);
     arc(win.x/2,win.y-30,60,60,0,Math.PI*2*(game.player.cooldown/game.player.shardCooldown));
   textSize(15);
      fill(0);
      noStroke();
      text("Shatter",win.x/2-24,win.y-28);
    }
    if(game.player.hero == "Magmax"){
        stroke(170,0,0,90);
      strokeWeight(2);
      fill(145,145,145,90);
      rect(win.x/2-98,win.y-60,198,60);
           stroke(237, 61, 26);
      strokeWeight(1);
      fill(181, 16, 16,220);
      arc(win.x/2,win.y-30,80,60,0,Math.PI*2*(game.player.cooldown/game.player.hardenCooldown));
    }
    if(game.player.hero == "Kopo"){
      if(game.player.isSmall){
         stroke(0,0,170,90);
      strokeWeight(6);
      fill(145,145,145,90);
      rect(win.x/2-98,win.y-60,198,60);
           stroke(0);
      strokeWeight(1);
      fill(156, 34, 161,50);
      arc(win.x/2,win.y-30,60,60,0,Math.PI*2*(game.player.cooldown/game.player.auraCooldown));
      //textFont("Maven Pro");
      textSize(30);
      fill(10);
        stroke(0);
        strokeWeight(1);
      text("DH",win.x/2-23,win.y-22);
      }
    }
    textSize(25);
      fill(0);
      noStroke();
    text(`Deaths:${game.player.deaths}`,10,30)
    if(time>9){
    text(`Time:${timeM}:${time}`,win.x-130,30)
    }else{
      text(`Time:${timeM}:0${time}`,win.x-130,30)
    }
  }
  
}
