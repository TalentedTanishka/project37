var monkey , monkey_image , obs_image, fruit_image , BananaGroup , ObstaclesGroup , bg , bg_image , Ground , Ground_image , InvisibleGround , score = 0  , PLAY = 1 , END = 0 , playState = PLAY , restart , restart_image ,  gameover , gameover_image ;


function preload(){
  
  monkey_image = loadAnimation("images/Monkey_01.png" , "images/Monkey_02.png" , "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png");
  
  bg_image = loadImage("images/jungle.jpg");
  
  obs_image = loadImage("images/stone.png");
  fruit_image = loadImage("images/Banana.png");
  
  restart_image = loadImage("images/restart.png"); 
  gameover_image = loadImage("images/gameOver.png");
  
}


function setup() {
  createCanvas(windowWidth , windowHeight);
  

  
  monkey = createSprite(-70,windowHeight-70,60,60);
  monkey.addAnimation("walk" , monkey_image);
  monkey.scale = 1;
  
  Ground = createSprite(windowWidth/2 ,windowHeight-20 , 100000000, 30);
  Ground.shapeColor = "brown";
 Ground.visible = false;
  
  BananaGroup = new Group(); 
ObstaclesGroup = new Group(); 
 
  //global scope  
restart = createSprite(200,300);
restart.addImage(restart_image);
restart.scale = 0.5;
restart.visible = false;

//global scope  
gameover = createSprite(200,220);
gameover.addImage(gameover_image);
gameover.visible = false;
  
  textSize(30);
  fill("white");

}
  

function draw(){
 background("yellow");
  if(playState == PLAY)
         {

          image(bg_image , -710,0 , windowWidth , windowHeight);

          for(var i = -1500  ; i<100000 ; i = i + 1060)
          {
            image(bg_image, i , 0 , windowWidth , windowHeight);
          }

//set gravity
if(keyDown("space") && monkey.y > 150 )
{
monkey.velocityY = -10;
}
monkey.velocityY = monkey.velocityY + 0.8;
           

           
        //when the player touches the obstacle
         if(ObstaclesGroup.isTouching(monkey))
        {
           playState = END;
           monkey.scale = 0.1;
   
        }
        
//when the player touches the banana
if(BananaGroup.isTouching(monkey))
{
BananaGroup.destroyEach();
  score = score + 2
  
  switch(score)
  {
      case 5 : monkey.scale = 2;
      break;
      
      case 10 : monkey.scale = 3;
      break;
      
      case 15 : monkey.scale = 4;
      break;
      
      case 20 : monkey.scale = 5;
      break;
      
      case 25 : monkey.scale = 6;
      break;
      
      case 30 : monkey.scale = 7;
      break;
      
      case 35 : monkey.scale = 8;
      break;
      
      case 40 : monkey.scale = 9;
      break;
      
      case 45 : monkey.scale = 10
      
      case 50 : monkey.scale = 11;
      break;
      
      case 55 : monkey.scale = 12;
      break;
      
      case 60 : monkey.scale = 13;
      break;
      case 65 : monkey.scale = 14;
      break;
      
      case 70 : monkey.scale = 15;
      break;
      
      case 75 : monkey.scale = 16;
      break;
      
      case 80: monkey.scale = 17;
      break;
      
      case 85: monkey.scale = 18;
      break;
      
      case 90 : monkey.scale = 19;
      break;
      
      case 95 : monkey.scale = 20;
      break;
      
   
  }
  }
  
  text("Score: "+ score, monkey.x - 100,50);                
obstacle();
spawnfruit();
  
monkey.velocityX = 5
camera.position.x = monkey.x;    
monkey.collide(Ground); 
        
 }
 
 else if(playState == END)
 {
 console.log("inside end")
  ObstaclesGroup.setVelocityXEach(0);
  BananaGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  BananaGroup.setLifetimeEach(-1);
  ObstaclesGroup.destroyEach();
  BananaGroup.destroyEach();
  monkey.scale = 1;
  monkey.visible = false;

 restart.visible = true;
   gameover.visible = true;
 
 }
  
 restart.x = camera.position.x ;  
 gameover.x = camera.position.x ;  

  
   if(mousePressedOver(restart))
 {
   reset();
 }

  
  drawSprites();
  
}

function reset()
{
  playState = PLAY;
  monkey.x = -70;
  monkey.y= windowHeight-70;
  monkey.visible = true
 ObstaclesGroup.destroyEach();
BananaGroup.destroyEach();
 restart.visible = false;
   gameover.visible = false;
   score = 0;
  
  
}
  
function obstacle()
    {
    if(frameCount % 300 == 0)
    {
     obs = createSprite(350, 650,20 ,20);
      obs.addImage(obs_image);
    obs.scale = 0.4;
        obs.lifetime = 300;
      obs.velocityX = -(3 + score*3/100) ;
      obs.x = random(350,700);
      obs.x = monkey.x + 1000 ;
      ObstaclesGroup.add(obs);
                }
              }

function spawnfruit()
{
  if(frameCount % 80 == 0)
  {
   fruit = createSprite(350, 300,20 ,20);
  fruit.addImage(fruit_image);
  fruit.scale = 0.3;
  fruit.lifetime = 300;
    fruit.velocityX = -(3 + score*3/100) ;
    fruit.x = random(350,550);
    fruit.x = monkey.x + 1000 ;
  BananaGroup.add(fruit);
  }
}