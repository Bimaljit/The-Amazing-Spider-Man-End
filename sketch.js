// glaobal variables

var backGround,backGroundImage;

var ground,groundImage;

var spiderMan,spiderManJumpingAnimation,spiderManAnimation;

var cloud,cloudImage,cloudGroup;

var score = 0;

var life = 3;



var gamestate = "start";

function preload() {

  groundImage = loadImage("ground-1.png");
  backGroundImage = loadImage("the background.png");
  coinImage = loadImage("coin sprite.png");
  gameOverImage = loadImage("game over.png");
  resetImage = loadImage("restart.png");
  spiderManJumpingAnimation = loadAnimation("spider man jumping_6.png", "spider man jumping_7.png")
  
  cloudImage = loadImage("cloud.png");
  rockImage = loadImage("rock.png");

  spiderManAnimation = loadAnimation("spider man running_1.png", "spider man running_2.png", "spider man running_3.png", "spider man running_4.png", "spider man running_5.png", "spider man running_6.png", "spider man running_7.png", "spider man running_8.png", "spider man running_9.png", "spider man running_10.png", "spider man running_11.png");               
  
  heartImg = loadImage("heart.png");

}
function setup() {
  createCanvas(1000, 600);
  
  // creating spites
     
     

     backGround = createSprite(0, 0, 1, 1);
      backGround.addImage(backGroundImage);
      backGround.scale = 1.2;
      backGround.visible = false;

      spiderMan = createSprite(60, 540, 10, 10);
     spiderMan.addAnimation("hero", spiderManAnimation);
     spiderMan.scale = 2;
     spiderMan.visible = false;
     spiderMan.setCollider("rectangle", 0, 0, 50,50);


      ground = createSprite(700, 575, 1500, 70);
     ground.addImage(groundImage);
     ground.scale = 0.4;
     ground.visible = false;
      

       
       
  
  //spiderMan.debug = true;

  gameOver = createSprite(500,200);
  gameOver.addImage( gameOverImage);
  gameOver.visible = false;
  
  

  restart = createSprite(500,400);
  restart.addImage(resetImage);
  restart.scale = 0.3;
  restart.visible = false; 
  
  //making groups

  cloudGroup = new Group();
  rockGroup = new Group();
  coinGroup = new Group();
  
  createLife();
  //making the life's visibility to false
  life1.visible = false;
  life2.visible = false;
  life3.visible = false;
}

function draw() {
 
 // creating the first game state

  if(gamestate === "start"){

    background("black");
    
  //  backGround.visible = false;
   // spiderMan.visible = false;
    ground.velocityX = 0;

    //giving the instructions   
   
    fill("red");
    textSize(42);
    text("Instructions",300,50);
    fill("yellow");
    textSize(28);
    text("1. Reach till the highest score as you can.",10,100);
    text("2. Use W to jump of the obstacles and to collect the points.",10,140);
    text("3. You are having three lives to reach till the highest score.",10,180);
    text("4. You loose one life whenever you touch the obstacle.",10,220);
    text("5. Whenever you reach till the score of 10, the ground, coins and clouds ",10,260);
    text("get faster. So be prepared.",10,300);
    text("6. Press W key with a little stress so that it is jumping properly.",10,340);
    fill("blue");
    text("  Best Of Luck Gamer :)  ", 400,440);
    fill("green");
    text("Press Q to start the game.", 400, 540);
// assingning that what will happen when we press Q
    if(keyDown("Q")){

     gamestate = "play"
    backGround.visible = true;
      spiderMan.visible = true;
     
      
      life1.visible = true;
    life2.visible = true;
    life3.visible = true;

    }
   
  }
  // creating the gamestate play
     if(gamestate === "play"){
       background("red");
      ground.visible = true;
      gameOver.visible = false;
      restart.visible = false; 
     // giving the velocity to the ground
     ground.velocityX = -(2+score/10);
      if (ground.x < 0){
        ground.x = 700;
      }
    // giving velocity Y to the spiderman
      if(keyDown("W") && spiderMan.y>=450){
    
        spiderMan.velocityY = spiderMan.velocityY-6;
    
    
      }
      // giving gravity to the spiderman
      spiderMan.velocityY = spiderMan.velocityY + 0.8;
    // giving the if conditions for life
      if(life === 2){
    
       life1.visible = false;
    
      }
      else if(life === 1){
    
       life2.visible = false;
    
      }
      else if(life === 0){
    
      life3.visible = false;
      gamestate = "end";
      }
    
    
      spawnClouds();
      spawnObstacles();
      spawnCoins();
    
      
     
    
        for(var i=0;i< rockGroup.length;i++){
          if(rockGroup.get(i).isTouching(spiderMan)){ 
         rockGroup.get(i).destroy();
         life = life-1;
       }
       }
      
    
      
    
       
    
      
    
    
    
      
    
    console.log(spiderMan.y);
    
      // making the spiderman collide with the ground      
      spiderMan.collide(ground);
    
     
    
    
      for(var i=0;i< coinGroup.length;i++){
         if(coinGroup.get(i).isTouching(spiderMan)){ 
        coinGroup.get(i).destroy();
        score = score+2;
      }
      }    

    }

  

   // creating the gamestate end

   if(gamestate === "end"){
    rockGroup.setVelocityEach(0,0);
    coinGroup.setVelocityEach(0,0);
    cloudGroup.setVelocityEach(0,0);
    rockGroup.destroyEach();
    coinGroup.destroyEach();
    cloudGroup.destroyEach();
    End();
    if(mousePressedOver(restart)){

       gamestate = "play";
       score = 0;
       spiderMan.visible = true;
       createLife();

    }
    }
  
  
  drawSprites();

  fill("red");

  textSize(20);
  text("Score :"+ score, 50,580);
  
  }
  // creating function for obstacle , coin, clouds, creating the life and creating the end system
function spawnObstacles() {
  if (frameCount % 130 === 0) {
    rock = createSprite(1100, ground.y - 55, 20, 20);
    rock.velocityX = -(5+score/10);
    rock.addImage(rockImage);
    rock.lifetime = 300;
    rockGroup.add(rock);
  }
}
  function spawnClouds(){

  if (frameCount % 160 === 0) {
    cloud = createSprite(1100, Math.round(random(20, 250)), 20, 20);
    cloud.velocityX = -(6+score/10);
    cloud.addImage(cloudImage);
    cloud.lifetime = 300;
    spiderMan.depth = cloud.depth;
    spiderMan.depth = cloud.depth + 1;
    cloudGroup.add(cloud);
  }

}
function spawnCoins(){
  if (frameCount % 100 === 0) {
    coin = createSprite(1100, Math.round(random(300, 450)), 20, 20);
    coin.addImage(coinImage);
    coin.velocityX = -(6+score/10);
    coin.scale = 0.15;
    coinGroup.add(coin);
  }  
}

function createLife(){

  life = 3;

life1 = createSprite(900,50, 50, 50);
life1.scale = 0.03;
life1.addImage(heartImg);

life2 = createSprite(940,50, 50, 50);
life2.scale = 0.03;
life2.addImage(heartImg);

life3 = createSprite(980,50, 50, 50);
life3.scale = 0.03;
life3.addImage(heartImg);

}

function End(){

gameOver.visible = true;
restart.visible = true;
spiderMan.visible = false;
ground.velocityX = 0;

}