var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 4;
var ballSpeedY = 2;
var ballRadius = 10;
var paddle1Y = 250;
var paddle2Y = 250;
var paddle2Speed = ballSpeedX;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;
var showingWinScreen = false;

function handleMouseClick() {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

function startGame() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 100;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
  canvas.addEventListener('mousedown', handleMouseClick);
  canvas.addEventListener('mousemove', function(evt) {
    var mousePosition = calculateMousePosition(evt);
    paddle1Y = mousePosition.y - PADDLE_HEIGHT/2;

  })
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

function computerMovement() {
  var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
  if (paddle2YCenter < ballY - 0.2*PADDLE_HEIGHT) {
    paddle2Y += paddle2Speed;
  } else if (paddle2YCenter > ballY + 0.2*PADDLE_HEIGHT){
    paddle2Y -= paddle2Speed;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < ballRadius + PADDLE_WIDTH) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.1
    } else if (ballX < 0){
      player2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width - PADDLE_WIDTH - ballRadius) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.1
    } else if(ballX > canvas.width){
      ballReset();
      player1Score++;
    }
  }
  if (ballY > canvas.height - 10 || ballY < 10) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  canvasContext.font = '40px "Orbitron"';
  canvasContext.textAlign = "center";
  drawRect(0, 0, canvas.width, canvas.height, colors.blackBlue);
  if (showingWinScreen) {
    canvasContext.fillStyle = 'white';
    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText('WIN!', canvas.width/2, canvas.height/4);
    } else {
      canvasContext.fillText('LOSE', canvas.width/2, canvas.height/4);
    }
    canvasContext.fillText('Click to continue', canvas.width/2, canvas.height/2);
    return;
  }
  drawNet();
  // draw left player paddle
  drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  // draw right player paddle
  drawRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  // draw ball
  drawCircle(ballX, ballY, ballRadius, 'white');
  // draw net

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function drawRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill()
}

function drawNet() {
  for (i=0; i<canvas.height; i+=40) {
    drawRect(canvas.width/2-1, i, 2, 20, 'white');
  }
}

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}
