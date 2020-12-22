var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, swordImage;
var score;
var fruitGroup, fruitImage;
var enemyGroup, monsterImage;
var gameOver;
var knifeSwooshSound, gameOverSound;

function preload(){
  
  swordImage = loadImage("sword.png","gameover.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  
}

function setup(){
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = .7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
}

function draw(){
  
  background("lightgreen");
  
  if(gameState === PLAY){
    
  sword.x = mouseX;
  sword.y = mouseY;
    
  fruits();
  enemy();
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score = score + 1;
  }
  else
  if(enemyGroup.isTouching(sword)){
  sword.addImage(gameOverImage);
  gameState = END;
  gameOverSound.play();

  }
  if(gameState === END){
    
    fruitGroup.setLifetimeEach(-1);
    fruitGroup.velocityX = 0;
    
    enemyGroup.setLifetimeEach(-1);
    enemyGroup.velocityX = 0;
    
    sword.addAnimation(gameOver);
    sword.x = 200;
    sword.y = 200;
    }
  }
  
    text("Score: "+ score, 300,50);
    
    drawSprites();
}

function fruits(){
  
  if(World.frameCount % 80 === 0){
    
    position = Math.round(random(1,2));  
    fruit = createSprite(400,200,20,20);
    fruit.scale = .2;
    
    r = Math.round(random(1,4));
    
    if(r == 1) {
      fruit.addImage(fruit1);
    }
      else if(r == 2) {
      fruit.addImage(fruit2); 
      }
      else if(r == 3) {
      fruit.addImage(fruit3); 
      }
      else if(r == 4) {
      fruit.addImage(fruit4); 
      }
    
    
      fruit.y = Math.round(random(50,340));
      
    if(position == 1){
      fruit.x=400
      
      
      fruit.setLifetime = 100;
    
      fruitGroup.add(fruit);
    
      fruit.velocityX = -(7+(score/4));
    }
    else
      
    {
    if(position == 2){
      fruit.x=0;
    }
      fruit.setLifetime = 100;
    
      fruitGroup.add(fruit);
    
    fruit.velocityX = -(-7+(score/4));
  }
  }
}

function enemy(){
  
  if(World.frameCount % 200 === 0){
    
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}