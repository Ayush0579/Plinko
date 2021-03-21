const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ready = true;
var pegs = [];
var score = 0;
var dividers = [];

function preload(){
}

function setup(){
    createCanvas(500, 700);
    engine = Engine.create();
    world = engine.world;

    left = new Bar(10,350,20,700);
    separator = new Bar(250,50,460,10);
    right = new Bar(490,350,20,700);
    bottom = new Bar(250,690,500,20);

    chip = Bodies.circle(250,10,10);
    World.add(world, chip);

    for (let y = 1; y < 10; y++) {
        for (let x = 1; x < 12; x++) {
            peg = Bodies.circle(10+(x*40),20+(y*60),5,{isStatic: true});
            World.add(world, peg);
            pegs.push(peg);
        }
    }

    for (let y = 1; y < 9; y++) {
        for (let x = 1; x < 12; x++) {
            peg = Bodies.circle(x*40,50+(y*60),5,{isStatic: true});
            World.add(world, peg);
            pegs.push(peg);
        }
    }

    for (let i = 0; i < 4; i++) {
        scorer = new Bar(112+(i*92),630,10,100);
        dividers.push(scorer);
    }
}

function draw(){
    ellipseMode(CENTER);
    rectMode(CENTER);
    Engine.update(engine);
    background("black");

    fill("yellow");
    ellipse(chip.position.x, chip.position.y, 10, 10);

    left.display();
    right.display();
    bottom.display();

    if(ready === true){
        separator.display();
    }

    for (let i = 0; i < pegs.length; i++) {
        fill("white");
        ellipse(pegs[i].position.x,pegs[i].position.y,5);
    }

    for (let i = 0; i < dividers.length; i++) {
        fill("white");
        rect(dividers[i].body.position.x,dividers[i].body.position.y,10,100);
    }

    if(chip.position.y > 650){
        if(chip.position.x < 112){
            score = score+100;
            chip.position.y = 50;
            World.remove(world, chip);
        }else if(chip.position.x > 112 && chip.position.x < 204){
            score = score+200;
            chip.position.y = 50;
            World.remove(world, chip);
        }else if(chip.position.x > 204 && chip.position.x < 296){
            score = score+500;
            chip.position.y = 50;
            World.remove(world, chip);
        }else if(chip.position.x > 296 && chip.position.x < 388){
            score = score+200;
            chip.position.y = 50;
            World.remove(world, chip);
        }else if(chip.position.x > 388){
            score = score+100;
            chip.position.y = 50;
            World.remove(world, chip);
        }
    }

    fill("yellow");
    textSize(20);
    text("Score: " + score, 370,20);

    fill("white");
    textSize(20);
    text("100", 50,600);

    fill("white");
    textSize(20);
    text("200", 140,600);

    fill("white");
    textSize(20);
    text("500", 230,600);

    fill("white");
    textSize(20);
    text("200", 320,600);

    fill("white");
    textSize(20);
    text("100", 410,600);
}

function mouseDragged(){
    if(ready === true){
        Matter.Body.setPosition(chip,{x: mouseX, y: 25});
    }
}

function mouseReleased(){
    separator.remove();
    ready = false;
}