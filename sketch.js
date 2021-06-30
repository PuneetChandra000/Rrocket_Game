var space,rocket;
var asteroid,satellite,planet;
var spaceImg,rocketImg;

var asteroidImg;
var satelliteImg;
var planetImg;
var gameOverImg;

var asteroidGroup, satelliteGroup, planetGroup; 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance=0;
var gameOver;

function preload(){
  spaceImg = loadImage("space.jpeg");
  rocketImg = loadImage("rocket.jpeg");
  
  asteroidImg = loadImage("asteroid.jpeg");

  
  satelliteImg = loadImage("satellite.jpeg");
  
  planetImg = loadImage("planet.jpeg");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup(){
  
createCanvas(1200,500);
// Moving background
space = createSprite(1200,500);
space.addImage(spaceImg);
space.velocityY = 5;

//creating rocket in space
rocket = createSprite(70,450);
rocket.addImage("rocket",rocketImg);
rocket.scale = 0.4;
  
//set collider for rocket
rocket.setCollider("circle",0,0,40);
rocket.debug = false;

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 
  
asteroidGroup = new Group();
satelliteGroup = new Group();
planetGroup = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   space.velocityY = +(6 + 2*distance/150);
  
   rocket.x = World.mouseX;
  
   edges= createEdgeSprites();
   rocket .collide(edges);
  
  //code to reset the background
  if(space.y < 400 ){
    space.y = space.width/2;
  }
  
  
  //creating continous obstacles players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      asteroids();
    } else if (select_oppPlayer == 2) {
      satellites();
    } else {
      planets();
    }
  }
  
   if(asteroidGroup.isTouching(rocket)){
     gameState = END;
     asteroid.destroyEach;
    }
    
    if(satelliteGroup.isTouching(rocket)){
      gameState = END;
      satellite.destroyEach = 0;
    }
    
    if(planetGroup.isTouching(rocket)){
      gameState = END;
      planet.destroyEach = 0;
      
    }
    
}else if (gameState === END) {
    gameOver.visible = true;

    
    distance = 0;
    rocket.destroy();
  
    asteroidGroup.destroyEach();
    asteroidGroup.destroyEach();
  
    satelliteGroup.destroyEach();
  
    planetGroup.destroyEach();

}
}

function asteroids(){
        asteroid = createSprite(1100,Math.round(random(50, 250)));
        asteroid.scale = 0.1;
        asteroid.velocityY = +(6 + 2*distance/150);
        asteroid.addImage("asteroid", asteroidImg);
        asteroid.setLifetime = 170;
        asteroidGroup.add(asteroid);
}

function satellites(){
  satellite =createSprite(1100,Math.round(random(50, 250)));
  satellite.scale = 0.1;
  satellite.velocityY = +(6 + 2*distance/150);
  satellite.addImage("satellite", satelliteImg);
  satellite.setLifetime = 170;
  satelliteGroup.add(satellite);
}

function planets(){
  planet =createSprite(1100,Math.round(random(50, 250)));
  planet.scale = 0.1;
  planet.velocityY = +(6 + 2*distance/150);
  planet.addImage("planet", planetImg);
  planet.setLifetime = 170;
  planetGroup.add(planet);

}





