var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
 }

window.addEventListener('mousemove', 
	
	function(event) {
				
	 mouse.x = event.x;
	 mouse.y = event.y;
	
	 mouse.y = innerHeight - mouse.y; //convert to traditional x-y plane 

	 }
 )

window.addEventListener('click', 
	
	function(event) {

	 this.sum = mouse.x + mouse.y;
	 this.dx = 8 * (mouse.x / this.sum);

		if(this.dx < .7) {
			this.dx = .7
		}

	 this.dy = 8-this.dx
	 circleArray.push(new Circle(20,innerHeight-20,this.dx,this.dy));

	 }
 )

window.addEventListener('resize', function() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 init();

 }
 )

function Circle(x, y, dx, dy) {
 this.x = x;
 this.y = y;
 this.dx = dx;
 this.dy = dy;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y, 10, 0, Math.PI*2) //x,y,radius,startangle,endangle
		c.fill();
	 }

	this.update = function() {	

	 this.dy = this.dy - .05;	
					     //border + radius
		if(this.y > innerHeight-5-10 & this.dy < .5) {
			this.dy = -this.dy*.8;
		 }

	 this.x = this.x + this.dx;
	 this.y = this.y - this.dy;

	 if(this.x - 100 > innerWidth) {
	 	circleArray.splice(locationOfObject+1,1);
	 	this.x = 0;
	 	this.dx = 0;
	 	this.dy = 0;
	 	this.y = innerHeight;
	 }

	 this.draw();

	 }
 }
		
var circleArray = [];

function init() {
	circleArray = [];
 }

var locationOfObject = undefined;

function animate() {
 requestAnimationFrame(animate);
 c.clearRect(0,0,innerWidth,innerHeight);

 c.font = "60px Courier New";
 c.fillText('Click to Fire',10,100);
 c.font = "18px Courier New";
 c.fillText('Created by JCH, 27 May 2018',10,40);

 c.rect(0,innerHeight-50,50,50);
 c.rect(0,innerHeight-5,innerWidth,5);
 c.fill();
	
	for(var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
		locationOfObject = i;
	 }

 }

init();
animate();