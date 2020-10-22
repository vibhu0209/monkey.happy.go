var monkey, monkeyA
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var foodGroup, foodImage;
var obstaclesGroup, obstacleI
var count = 0;
var gameOver, gameOverImage, restartButton, restartButtonImage;
var die, jump, checkpoint



function preload() {
  monkeyA = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  groundImage = loadImage("jungle.jpg");

  foodImage = loadImage("banana.png");

  obstacleI = loadImage("stone.png");

  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 600);

  monkey = createSprite(300, 400, 20, 50);
  monkey.addAnimation("monkey", monkeyA);
  monkey.scale = 0.1;
  monkey.x = 50;
  monkey.setCollider("circle", 0, 0, 300);

  ground = createSprite(300, 585, 100000, 10);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(300, 590, 600, 5);
  invisibleGround.visible = false;

  foodGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {

  background("white");

  text("Survival time: " + count, 200, 100);

  if (gameState === PLAY) {

    ground.velocityX = -(6 + 3 * count / 100);

    count = Math.round(frameCount / 4);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.collide(invisibleGround)) {
      monkey.velocityY = -12;
      jump.play();
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    spawnFood();
    spawnObstacles();

    if (count > 0 && count % 100 === 0) {
      checkpoint.play();
    }

    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
    }

    if (obstaclesGroup.isTouching(monkey)) {
      die.play();
      gameState = END;

    }
  } else if (gameState === END) {

    ground.velocityX = 0;
    monkey.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

  }


  monkey.collide(invisibleGround);
  // monkey.debug = true; 

  switch (count) {
    case 50:
      monkey.scale = 0.12;
      break;
    case 100:
      monkey.scale = 0.14;
      break;
    case 150:
      monkey.scale = 0.16;
      break;
    case 150:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }


  drawSprites();
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var food = createSprite(600, 600, 40, 10);
    food.y = Math.round(random(480, 520));
    food.addImage(foodImage);
    food.scale = 0.05;
    food.velocityX = -3;

    //assign lifetime to the variable
    food.lifetime = 200;

    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    foodGroup.add(food);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 565, 10, 40);
    obstacle.velocityX = -(6 + 3 * count / 100);
    obstacle.addImage(obstacleI)
    obstacle.setCollider("circle", 0, 0, 217.5);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //obstacle.debug = true;
    obstaclesGroup.add(obstacle);
  }
}