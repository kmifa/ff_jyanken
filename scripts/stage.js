var num = 30;
var h;
var arr = [];

function setup(){
  var canvas = createCanvas(960, 540);
  canvas.parent("battle-background");

  colorMode(HSB, 360, 100, 100, 100);

  for(var i = 0; i < num; i++){
  	var ang = i * (Math.PI) / (num -1);
  	arr[i] = new Mover(width/2, 0, ang);
  }

  h = random(360);

  background(h, 50, 50);
  strokeWeight(.1);
}

function Mover(xin,yin,a){
	this.xin = xin;
	this.yin = yin;
	this.a = a;
	this.pos = new p5.Vector(this.xin,this.yin);
	this.vel = new p5.Vector(cos(this.a),sin(this.a));
}


Mover.prototype.display = function(){
	this.update();
	this.connect();
	this.boundsCheck();
}

Mover.prototype.boundsCheck = function(){
	if(this.pos.x < 0){
		this.pos.x = 0;
		this.vel.x *= -1;
	}else if(this.pos.x > width){
		this.pos.x = width;
		this.vel.x *= -1;
	}else if(this.pos.y < 0){
		this.pos.y = 0;
		this.vel.y *= -1;
	}else if(this.pos.y > height){
		this.pos.y = height;
		this.vel.y *= -1;
	}
}

Mover.prototype.update = function(){
	this.pos.add(this.vel);
}

Mover.prototype.connect = function(){


	for(var i = 0; i < num; i++){
		var dst1 = sin(this.a) * 100;
		var dst2 = 255;

		var s = map(dst1, 0, 100, 0, 50);
		var b = map(dst2, 0, 255, 0, 100);

		stroke(h,s,b,30);

		line(this.xin,this.yin,this.pos.x,this.pos.y);	
	}
}

function draw(){
	for(var i = 0; i < num; i++){
		arr[i].display();
	}
}

function mousePressed(){
	h = random(360);
	background(h,50,50);
}