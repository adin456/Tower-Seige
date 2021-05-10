const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var gameState="attached";
var score=0;

function preload() {
    changeBackground();

}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig3 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(200,250);

    sling = new Sling(bird.body,{x:200,y:250});

}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    textSize(20);
    fill ("yellow");
    text("score "+ score,1000,50);
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();

    sling.display();

    pig1.score();
    pig3.score();
}
function mouseDragged(){
    if(gameState !="flying")
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    Matter.Body.applyForce(bird.body,bird.body.position,{x:30,y:-30})
}
function mouseReleased(){
    sling.fly()
    gameState="flying"
}
function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(bird.body,{x:200,y:250})
        sling.attach(bird.body)
        bird.traj=[];
        gameState="attached"
    }
    
}

 async function changeBackground(){
var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
var rjson=await response.json()
var dt=rjson.datetime
var t=dt.slice(11,13)
console.log(t)
if(t>6 && t<17){
    bg="sprites/bg1.png"
}
else bg="sprites/bg2.jpg"
backgroundImg=loadImage(bg)
}
