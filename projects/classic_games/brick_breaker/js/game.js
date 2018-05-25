var keys = {
  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40
};

var canvas;
var ctx;

var paddleX = 250;
var paddleSpeed = 10;

const BALL_RADIUS = 5;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const PADDLE_INDENT = 20;

// collision width of each brick
const BRICK_W = 80;
// collision height of each brick
const BRICK_H = 20;
//purely visual gap between bricks
const BRICK_GAP = 2;
// number of brick columns
const BRICK_COLS = 10;
// number of brick rows
const BRICK_ROWS = 14;


var ballSpeedX = 2;
var ballSpeedY = 2;
var ballX = 50;
var ballY = BRICK_ROWS * BRICK_H + 20;

var brickGrid = new Array(BRICK_ROWS * BRICK_COLS);
console.log(brickGrid);

window.onload = function() {
  resetBricks();
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  var framesPerSecond = 100;
  setInterval(function() {
    drawEverything();
    moveEverything();
  }, 1000/framesPerSecond);
  window.addEventListener('keydown', handleArrowKeys);
  canvas.addEventListener('mousemove', function(evt) {
    var mousePosition = calculateMousePosition(evt);
    paddleX = mousePosition.x - PADDLE_WIDTH/2;
  });
}

function handleArrowKeys(evt) {
  switch (evt.keyCode) {
    case keys.LEFT:
      paddleX -= paddleSpeed;
      break;
    case keys.RIGHT:
      paddleX += paddleSpeed;
      break;
  }
  if (paddleX > canvas.width - PADDLE_WIDTH/2) {
    paddleX = canvas.width - PADDLE_WIDTH/2
  } else if (paddleX < -PADDLE_WIDTH/2) {
    paddleX = -PADDLE_WIDTH/2
  }
}

function calculateMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

function drawBricks() {
  for(var	eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
    for(var	eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
      if (isBrickAtTileCoord(eachCol, eachRow)) {
        var	brickLeftEdgeX = eachCol * BRICK_W;
        var brickTopEdgeY = eachRow * BRICK_H;
        drawRect(brickLeftEdgeX, brickTopEdgeY,
          BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }
}

function resetBricks() {
  for (var i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
    brickGrid[i] = 1;
  }
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
}

function drawRect(leftX, topY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2*Math.PI);
  ctx.fill();
}


function drawEverything() {
  // draw background
  drawRect(0, 0, canvas.width, canvas.height, 'black');
  drawBricks();
  // draw ball
  drawCircle(ballX, ballY, BALL_RADIUS, 'white');
  // draw paddle
  drawRect(paddleX,
    canvas.height - PADDLE_HEIGHT - PADDLE_INDENT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    'white');
}

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > canvas.width - BALL_RADIUS || ballX < BALL_RADIUS) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY > canvas.height - BALL_RADIUS - PADDLE_HEIGHT - PADDLE_INDENT) {
    if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
      ballSpeedY = -ballSpeedY;
      if (ballSpeedY > 0) {
        ballSpeedY = -ballSpeedY;
        console.log(ballSpeedY);
      }
      var deltaX = ballX - (paddleX + PADDLE_WIDTH/2);
      ballSpeedX = deltaX * 0.1;
    } else if (ballY > canvas.height){
      ballReset();
    }
  }
  if (ballY < BALL_RADIUS) {
    ballSpeedY = -ballSpeedY;
  }
  breakAndBounceOffBrickAtPixelCoord(ballX,	ballY);
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
  var tileCol = pixelX / BRICK_W;
  var tileRow = pixelY / BRICK_H;
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);
  // check whether the ball is in within any part of the brick wall
  if (tileCol < 0 || tileCol >= BRICK_COLS ||
    tileRow < 0 || tileRow >= BRICK_ROWS) {
      return false;
  }
  var brickIndex = brickTileToIndex(tileCol, tileRow);
  if (brickGrid[brickIndex] == 1) {
    var prevBallX = ballX - ballSpeedX;
    var prevBallY = ballY - ballSpeedY;
    var prevTileCol = Math.floor(prevBallX / BRICK_W);
    var prevTileRow = Math.floor(prevBallY / BRICK_H);

    var bothTestsFailed = true;

    if (prevTileCol != tileCol) { // must have come in horizontally
      var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
      // make sure the side we want to reflect off isn't blocked
      if (brickGrid[adjacentBrickIndex] != 1) {
        ballSpeedX *= -1;
        bothTestsFailed = false;
      }
    }

    if (prevTileRow != tileRow) { // must have come in vertically
      var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
      if (brickGrid[adjacentBrickIndex] != 1) {
        ballSpeedY *= -1;
        bothTestsFailed = false;
      }
    }
    // we hit an "armpit" on the inside corner, flip both to avoid going into it
    if (bothTestsFailed) {
      ballSpeedY *= -1;
      ballSpeedX *= -1;
    }
    brickGrid[brickIndex] = 0;
  }
}

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS * tileRow);
}

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}
