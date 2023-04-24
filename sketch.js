var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,gameOverimg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverimg = loadAnimation("gameOver.png");
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  // Movendo plano de fundo
  path=createSprite(width/2,height/2);
  path.addImage(pathImg);
  path.velocityY = 4;
  //imagem de fim
  gameOver=createSprite(width/2,height/2);
  gameOver.visible = false;
  gameOver.addAnimation("gameOver", gameOverimg);
  //criar menino correndo 
  boy = createSprite(50,height-20 ,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > height+400){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //aumente a treasureCollection para 50
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            //aumente a treasureCollection para 100
            treasureCollection=treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            //aumente a treasureCollection para 150
            treasureCollection=treasureCollection+150;
          }
    else{
      if(swordGroup.isTouching(boy)) {
//Mude o gameState (estado do jogo) para End
          gameOver.visible = true;
          gameState="END";
//destrua todos os grupos
// defina setvelocityEach como 0 para todos os grupos
    }

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,width-150,30);
  }
  if(gameState===END){
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    cashG.setvelocityEachY = 0;
    diamondsG.setvelocityEachY = 0;
    jwelleryG.setvelocityEachY = 0;
    swordGroup.setvelocityEachY = 0;
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = height-20;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = height-20;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = height-20;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = height-20;
  swordGroup.add(sword);
  }
}
