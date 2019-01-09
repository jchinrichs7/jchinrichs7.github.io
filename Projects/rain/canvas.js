var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var colorArray = [

	'#7A61FE',
	'#5766E5',
	'#6DA1FC',
	'#57B1E5',
	'#7A61FE',
	'#067FF4',
	'#067FF4',
	'#067FF4',

 ];

window.addEventListener('resize', function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			init();
     }
 ) 

function Raindrop(x, y, dy, dropheight, dropwidth) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.dropheight = dropheight;
	this.dropwidth = dropwidth;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

		this.draw = function() {
			c.beginPath();
			c.rect(this.x,this.y,this.dropwidth,this.dropheight) 
			c.fillStyle = this.color;
			c.fill();
			}

		this.update = function() {
			//put at the top if it falls off, reset the speed
			if(this.y + this.dropheight > innerHeight) {
			   this.y = -20;
			   this.dy = (Math.random()+1) * 2;
			   this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
			 }

			//gravity
			if(this.y > 0) {
			 this.dy = this.dy + (this.y * .00005);
			 }

			//make it move
			this.y += this.dy;		
			this.draw();
	     }
 }
	
var rainArray = [];
function init() {
	rainArray = [];
	numberOfDrops = Math.floor(innerWidth*(1/4));
 	console.log(numberOfDrops);
	for (var i = 0; i < numberOfDrops; i++) {
		var y = (-Math.random() * 500) - 100; //y pos
		var dropwidth = Math.floor((Math.random() + 1) * 2); //2 or 3
		if (dropwidth == 3) {
		 var x = Math.random() * (innerWidth - 2*10) + 10; //x pos
		 }
		 else {
		 var x = ((Math.random() * (innerWidth - 2*10) + 10)*.6)+(innerWidth*.2); //x pos
		 }
		var dropheight = dropwidth * 10;
		var dy = (Math.random()+1) * dropwidth * 2/3; //speed

		rainArray.push(new Raindrop(x,y,dy,dropheight,dropwidth));
	 }
 }

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	c.fillStyle = "Lavender";
	c.fillRect(0, 0, canvas.width, canvas.height);


	for(var i = 0; i < rainArray.length; i++) {
		rainArray[i].update();
	 }
 }

init();
animate();