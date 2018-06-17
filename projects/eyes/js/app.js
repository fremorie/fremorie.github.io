var canvas;
var wh, ww;
var ctx;
var mousePosition = {
  x: 0,
  y: 0
};

var eyeRadius = 100;
var delta = 10;

var Eye = function(eyeRadius, centerX, centerY, irisCenterX, irisCenterY) {
  this.eyeRadius = eyeRadius;
  this.irisRadius = this.eyeRadius/2;
  this.pupilRadius = this.irisRadius/2;
  this.centerX = centerX;
  this.centerY = centerY;
  this.irisCenterX = irisCenterX;
  this.irisCenterY = irisCenterY;
}

var leftEye = new Eye(eyeRadius, -eyeRadius - delta, 0, -eyeRadius, 0);
var rightEye = new Eye(eyeRadius, eyeRadius, 0, eyeRadius, 0);

Eye.prototype.draw = function(ctx) {
  // draw white
  ctx.beginPath();
  ctx.arc(this.centerX, this.centerY, this.eyeRadius, 0, 2*Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  // draw iris
  ctx.beginPath();
  ctx.arc(this.irisCenterX, this.irisCenterY, this.irisRadius, 0, 2*Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  // draw pupil
  ctx.beginPath();
  ctx.arc(this.irisCenterX, this.irisCenterY, this.pupilRadius, 0, 2*Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

Eye.prototype.move = function(ctx, mousePosition) {
  var relativeMousePositionX = mousePosition.x - this.centerX;
  var relativeMousePositionY = mousePosition.y - this.centerY;
  var deltaX = relativeMousePositionX - this.irisCenterX;
  var deltaY = relativeMousePositionY - this.irisCenterY;

  var relativeIrisCenterX = this.irisCenterX - this.centerX;
  var relativeIrisCenterY = this.irisCenterY - this.centerY;

  var newX = relativeIrisCenterX;
  var newY = relativeIrisCenterY;

  (deltaX > 0) ? newX++ : newX--;
  (deltaY > 0) ? newY++ : newY--;
  if (this.newLocationIsValid(newX, newY)) {
    this.irisCenterX = newX + this.centerX;
    this.irisCenterY = newY + this.centerY;
  } else {
    var norm = Math.sqrt(newX*newX + newY*newY);
    this.irisCenterX = this.centerX + this.normalizeCoord(norm, newX);
    this.irisCenterY = this.centerY + this.normalizeCoord(norm, newY);
  }
}

Eye.prototype.newLocationIsValid = function(newX, newY) {
  var lim = (this.eyeRadius - this.irisRadius)*(this.eyeRadius - this.irisRadius);
  if (newX*newX + newY*newY >= lim) {
    return false;
  } else {
    return true;
  }
}

Eye.prototype.normalizeCoord = function(norm, newNum) {
  return newNum / norm * (this.eyeRadius - this.irisRadius);
}

function calculateMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft - canvas.width/2;
  var mouseY = evt.clientY - rect.top - root.scrollTop - canvas.height/2;
  return {
    x: mouseX,
    y: mouseY
  }
}

function resize() {
  setCanvasParameters();
  if (wh > 200) {
    eyeRadius = 100;
    delta = 10;
    leftEye = new Eye(eyeRadius, -eyeRadius - delta, 0, -eyeRadius, 0);
    rightEye = new Eye(eyeRadius, eyeRadius, 0, eyeRadius, 0);
  } else {
    eyeRadius = wh/4;
    delta = eyeRadius/40;
    leftEye = new Eye(eyeRadius, -eyeRadius - delta, 0, -eyeRadius, 0);
    rightEye = new Eye(eyeRadius, eyeRadius, 0, eyeRadius, 0);
  }
}

window.onresize = resize;

window.onload = function() {
  resize();
  var framesPerSecond = 1000;
  setInterval(function() {
    drawBackground();
    leftEye.move(ctx, mousePosition);
    leftEye.draw(ctx);
    rightEye.move(ctx, mousePosition);
    rightEye.draw(ctx);
  }, 1000/framesPerSecond);
  canvas.addEventListener('mousemove', function(evt) {
    mousePosition = calculateMousePosition(evt);
  })
}


function setCanvasParameters() {
  canvas = document.getElementById('canvas');
  ww = window.innerWidth;
  wh = window.innerHeight;
  canvas.width = ww;
  canvas.height = wh;
  ctx = canvas.getContext('2d');
  ctx.translate(canvas.width/2, canvas.height/2);
}

function drawBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
}
