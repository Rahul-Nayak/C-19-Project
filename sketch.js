var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround,invisibleGround1, groundImage,gameOver,gameOver1,backgroundMusic;
var cloud, cloudsGroup, cloudImage;
var dr,drImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var restart,restartImg;


function preload(){
    drImage = loadImage("dr.png")
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    gameOver1 = loadImage("gameOver.png");
    obstacle1 = loadImage("ufo.png");
  restartImg = loadImage("restart.png");
  backgroundMusic = loadSound("background_music.mp3");
}

function setup() {
    createCanvas(600,300);
   
    ground = createSprite(200,280,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
  
    dr = createSprite(100,170,10,10);
    dr.addImage(drImage);
    dr.scale = 0.1;

    invisibleGround = createSprite(200,290,400,10);
    invisibleGround.visible = false;

    invisibleGround1 = createSprite(200,10,400,10);
    invisibleGround1.visible = false;

    gameOver = createSprite(300,100,10,10);
    gameOver.addImage(gameOver1);
    gameOver.visible = false;
    obstaclesGroup = new Group();
    
  restart = createSprite(300,150,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  restart.visible = false;

 

    dr.setCollider("circle",0,0,300)
    dr.debug = true;

    score = 0;
}

function draw() {
 background(180);
 text("Score: "+ score, 500,50);


 if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
      if (ground.x < 0){
    ground.x = ground.width/2;
  }

if(keyDown("UP_ARROW")){
    dr.y=dr.y-3;
}
if(keyDown("DOWN_ARROW")){
    dr.y=dr.y+3;
}

spawnObstacles();



if(obstaclesGroup.isTouching(dr)){
  gameState = END;
 
}

 }
 else if(gameState === END){
  //stop the ground
  ground.velocityX = 0;
  text("Click on space to restart",250,200);
  text.size = 70;
  gameOver.visible = true;
  restart.visible = true;
 
obstaclesGroup.setVelocityXEach(0);


}

 if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
dr.collide(invisibleGround);
dr.collide(invisibleGround1);



 drawSprites();
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(width+20,height-300,40,10);
    obstacle.y = Math.round(random(100,220));
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    //adjust the depth
   obstacle.scale = 0.1;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
 }
 
 function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  
  score = 0;
  
} 
 
 
 







