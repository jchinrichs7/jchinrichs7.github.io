var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 init();

 }
 )

function Planet() {

	this.draw = function() {
	
	 c.beginPath();
	 c.arc(innerWidth/2,innerHeight/2,100,0,Math.PI*2,false) //x,y,radius,startangle,endangle
	 c.fillStyle = 'forestgreen';
	 c.fill();

	 }

}


function Star(x,y) {
 
	this.x = x;
	this.y = y;


	this.draw = function() {

	 c.beginPath();
	 c.moveTo(this.x, this.y);
	 c.lineTo(this.x+10*(1/5), this.y+30*(1/5));
	 c.lineTo(this.x+40*(1/5), this.y+40*(1/5));
	 c.lineTo(this.x+10*(1/5), this.y+50*(1/5));
	 c.lineTo(this.x, this.y+80*(1/5));
	 c.lineTo(this.x-10*(1/5),  this.y+50*(1/5));
	 c.lineTo(this.x-40*(1/5),  this.y+40*(1/5));
	 c.lineTo(this.x-10*(1/5),  this.y+30*(1/5));

	 c.closePath();
	 c.strokeStyle = 'white';
	 c.fillStyle = 'white';
	 c.fill();
	 c.stroke();
	 c.beginPath()
	 }

 }


function Satellite(x, y) {
	this.x = x;
	this.y = y;
	this.color = 'red';
	this.radius = 15;

	this.draw = function() {

	 //satellite
	 c.beginPath();
	 c.arc(this.x,this.y,this.radius,0,Math.PI*2) //x,y,radius,startangle,endangle
	 c.fillStyle = this.color;
	 c.fill();

     } 
		

	var radians = 0;

	this.update = function() {

	 radians += .005;

		if(radians >= Math.PI*2) {
			radians = 0;
		 } 

	 console.log('distance away: ',distanceAway);
	 this.x = (innerWidth/2) + distanceAway*(Math.cos(radians));
	 this.y = (innerHeight/2) + distanceAway* (Math.sin(radians));

	 this.draw();
	}
 }

if(innerWidth < innerHeight) {
			distanceAway = innerWidth/3;
	} else {
			distanceAway = innerHeight/3;
	}


var satelliteArray = [];
var starArray = [];
numStars = 75;

function init() {

	if(innerWidth < innerHeight) {
			distanceAway = innerWidth/3;
	} else {
			distanceAway = innerHeight/3;
	}


 starArray = [];


 	for (var j = 0; j < numStars; j++) {

 		var x = Math.random() * canvas.width;
 		var y = Math.random() * canvas.height;
 		starArray.push(new Star(x,y))
 	}


 pnt = new Planet();
 sat = new Satellite(x,y);


 }

changeStars = 0;

function animate() {

	changeStars++;

	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);


	//stars
	if(changeStars > 130) {
		changeStars = 0;
		starArray = [];

	 	for (var j = 0; j < numStars; j++) {

	 		var x = Math.random() * canvas.width;
	 		var y = Math.random() * canvas.height;
	 		starArray.push(new Star(x,y))
	 	 }
	 }
	
	for(var j = 0; j < starArray.length; j++) {
		starArray[j].draw();
	 }

	//satellite
	sat.update();

	//planet
	pnt.draw();

 }

init();
animate();

