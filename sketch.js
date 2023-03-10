var path,boy,cash,powerUp,jwellery,sword;
var pathImg,boyImg,cashImg,powerUpImg,jwelleryImg,asteroidImg;
var treasureCollection = 0;
var cashG,powerUpG,jwelleryG,asteroidGroup;
var backgroundImg
var spaceshipImg
var bullet2
//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  powerUpImg = loadImage("SpeedBoost2.png");
  jwelleryImg = loadImage("jwell.png");
  asteroidImg = loadImage("pink.png");
  spaceshipImg = loadImage("player.png")
  backgroundImg = loadImage("background1.png")
  bullet2 = loadImage("bullet3.png")
  endImg =loadAnimation("gameOver.png");
  
}

function setup(){
  
  createCanvas(400,600);
  background(backgroundImg)
// Moving background
path=createSprite(200,300);
path.addImage(backgroundImg);
path.velocityY = 4;
if(path.y < 400 ){
  path.y = height/2;
}

//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",spaceshipImg);
boy.scale=0.2
  
  

powerUpG=new Group();
asteroidGroup=new Group();



}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y < 400 ){
    path.y = height/2;
  }
  if(keyDown("DOWN_ARROW")){
 bullet = createSprite(70,400,10,10)
 bullet.addImage(bullet2)
 bullet.x=boy.x
 bullet.velocityY = -4
 bullet.scale = 0.05
 
 
  }
    createPowerUp();
    createAsteroids();


    if (powerUpG.isTouching(boy)) {
      powerUpG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
      
    else{
      if(asteroidGroup.isTouching(boy)  ) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        powerUpG.destroyEach();
        asteroidGroup.destroyEach();
        
        powerUpG.setVelocityYEach(0);
        asteroidGroup.setVelocityYEach(0);
     
    }
    
  
  }

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Boosters: "+ treasureCollection,150,30);
  }

}


function createPowerUp() {
  if (World.frameCount % 200 == 0) {
  var powerUp = createSprite(Math.round(random(50, 350),40, 10, 10));
  powerUp.addImage(powerUpImg);
  powerUp.scale=0.08;
  powerUp.velocityY = 3;
  powerUp.lifetime = 150;
  powerUpG.add(powerUp);
}
}



function createAsteroids(){
  if (World.frameCount % 160 == 0) {
  var asteroid = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid.addImage(asteroidImg);
 // asteroid.scale=0.1;
  asteroid.velocityY = 3;
  asteroid.lifetime = 150;
  asteroidGroup.add(asteroid);
  }
}