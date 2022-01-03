const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

var myEngine, myWorld;
var player, playerImg, playerKickImg;
var dustbin, dustbinImg;
var edges , wall;
var kicked = false, flying = true;
var bottleImg , bottle;
var ground, shelf;
var score = 0;
var sensorer, bottlecopy;
var glassBottle =[], glassBottleImg;
var position = 1200;
var count = 0;
var backgroundImg, screen;
var speed = 0;
var kicker= 0;

function preload()
{
  playerImg = loadImage("./assets/player.png");
  dustbinImg = loadImage("./assets/dustbin.png");
  bottleImg = loadImage("./assets/waterBottle.png");
  playerKickImg = loadImage("./assets/playerKick.png");
  backgroundImg = loadImage("./assets/background.jpg")
}
function setup() {
  /*screen = createSprite(width/2,height/2)
  screen.addImage(backgroundImg)
  screen.width= windowWidth;
  screen.height = windowHeight*/
  createCanvas(windowWidth, windowHeight);
  
  myEngine = Engine.create();
  myWorld = myEngine.world;

  player = createSprite(100,height-100);
  player.addImage(playerImg);
  player.scale = 0.25

  dustbin = createSprite(width-250,height-100);
  dustbin.addImage(dustbinImg);
  dustbin.scale = 0.5;
  dustbin.velocityX = 3;
  //dustbin.setCollider("rectangle",0,0,400,5000)
  //dustbin.debug = true;

  edges = createEdgeSprites();
  wall = createSprite(width/2,height,5,150);
  wall.visible = false;

  bottle = new Bottle(400,1,100,100);

  var ground_options ={
    isStatic : true,
  }
  ground = Bodies.rectangle(width/2,height,width,20,ground_options);
  World.add(myWorld,ground);
  shelf = Bodies.rectangle(width-400,200,width/4+100,5,ground_options);
  World.add(myWorld,shelf);

  sensorer = createSprite(width/2+width/4,height/2+height/4,width/2,height/2);
  sensorer.visible= false;
  bottlecopy = createSprite(bottle.body.position.x,bottle.body.position.y,100,100)
  bottlecopy.visible = false
}

function draw() {
  background(backgroundImg,backgroundImg,backgroundImg);  
  bottlecopy.x = bottle.body.position.x
  bottlecopy.y = bottle.body.position.y;
  Engine.update(myEngine);

  if(dustbin.isTouching(edges[1]))
  {
    dustbin.velocityX = -3-speed;
  }
  if(dustbin.isTouching(wall))
  {
    dustbin.velocityX = 3+speed;
  }
  if(kicked && bottle !=null){
    if(collide(bottle.body,dustbin))
    {
      score += 10;
      flying = true;
      position +=50
      glassBottle[count] = new GlassBottle(position,1,50,80);
      count +=1;
      speed += 2;
      kicker+=0.1;
    }
  }
 if(glassBottle !=null)
 {
   for(var i=0;i<glassBottle.length;i++)
   {
  glassBottle[i].display();
   }

 }
 console.log(score)
 if(bottle!=null)
 {
  bottle.display();
 }

 if(bottle === null)
 {
  bottle = new Bottle(400,1,100,100);
 }

 if(bottle != null)
 {
   if(bottle.body.position.x>width)
   {
     World.remove(myWorld,bottle);
     bottle = null;
   }
   var d = dist(bottle.body.position.x,bottle.body.position.y,ground.position.x,ground.position.y)
   if(d<=100)
   {
     flying = false;
   }
   /*if(bottlecopy.isTouching(ground) && bottlecopy.isTouching(sensorer))
   {
    World.remove(myWorld,bottle);
    bottle = null;
   } */
 }

 if(keyWentDown("space"))
 {
   player.addImage(playerKickImg)

 }
 if(keyWentUp("space"))
 {
   player.addImage(playerImg);
 }
  drawSprites();
  push();
  textSize(40)
  fill("red")
  text("Score: "+score,200,200)
 pop();
  rectMode(CENTER)
  rect(shelf.position.x,shelf.position.y,width/4+100,5);
}
function keyReleased()
{
  if(keyCode === 32)
  {
    if(flying)
    Matter.Body.applyForce(bottle.body,bottle.body.position,{x:0.5+kicker,y:-0.5+kicker});
    kicked = true;
    flying=false;

  }
}
function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.x,sprite.y);
    if(d <= 120)
    {
      World.remove(myWorld,body);
      bottle = null;
      return true;
      
    }
    else{
      return false;
    }
  }
}