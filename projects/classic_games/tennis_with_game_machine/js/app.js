var colors = {
  lightBlue: '#66c6ff',
  blue: '#4dbdff',
  darkBlue: '#33b3ff',
  deepBlue: '#01a1ff',
  deepDeepBlue: '#00304c',
  blackBlue: '#001019',
  orange: '#ff8f4d',
  darkOrange: '#b24200',
  red: '#692a33'
}

var canvas1;
var ctx;

var screenWidth = 800;
var screenHeight = 600;

// variables for drawing game machine
var screenFrameWidth = screenWidth + 150;
var screenFrameHeight = screenHeight + 50;
var upperPanelWidth = screenFrameWidth + 100;
var upperPanelHeight = screenFrameHeight/5;
var upperPanelShadowHeight = 0.4 * upperPanelHeight;
var controlPanelHeight = upperPanelShadowHeight + 70;
var bottomPanelHeight;
var bottomPanelWidth = upperPanelWidth;
var borderWidth = 20;
var deltaX = (upperPanelWidth - screenFrameWidth)/2;
var screenLeftX = borderWidth + deltaX + (screenFrameWidth - screenWidth)/2;
var screenTopY = borderWidth + upperPanelHeight + upperPanelShadowHeight + 0.04*screenFrameHeight;
var screenRightX = screenLeftX + screenWidth;
var screenBottomY = screenTopY + screenHeight;



function drawRect1(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height);
}

function drawTriangle(x1, y1, x2, y2, x3, y3, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}

function drawTetragon(x1, y1, x2, y2, x3, y3, x4, y4, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  ctx.fill();
}

function drawCircle1(centerX, centerY, radius, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  ctx.fill()
}

function renderText() {
  // draw text header
  ctx.font = '60px "Bungee Inline"';
  ctx.textAlign = "center";
  ctx.fillStyle = colors.deepDeepBlue;
  ctx.fillText('TENNIS GAME', canvas1.width/2, (borderWidth + upperPanelHeight)/1.5);
}

window.onload = function() {
  canvas1 = document.getElementById('machineCanvas');
  ctx = canvas1.getContext('2d');
  drawGameMachine();
  document.fonts.load('10pt "Bungee Inline"').then(renderText);
  startGame();
}

function drawGameMachine() {
  bottomPanelHeight = canvas1.height - 10 - upperPanelHeight - upperPanelShadowHeight - screenFrameHeight - controlPanelHeight;
  // draw upper panel
  drawRect1(borderWidth, borderWidth, upperPanelWidth, upperPanelHeight, colors.orange);
  // draw upper panel shadow
  drawTetragon(borderWidth, borderWidth + upperPanelHeight,
              borderWidth + upperPanelWidth, borderWidth + upperPanelHeight,
              borderWidth + upperPanelWidth - deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight,
              borderWidth + deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight,
              colors.darkOrange);
  // draw screen frame
  drawRect1(borderWidth + deltaX,
            borderWidth + upperPanelHeight + upperPanelShadowHeight,
            screenFrameWidth, screenFrameHeight, colors.orange);
  //draw screen
  drawRect1(screenLeftX,
           screenTopY,
           screenWidth, screenHeight, colors.blackBlue);
  // draw control panel
  drawTetragon(borderWidth + deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
              borderWidth + screenFrameWidth + deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
              borderWidth + bottomPanelWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
              borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
              colors.darkOrange);
  // draw bottom panel
  drawRect1(borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
          bottomPanelWidth, bottomPanelHeight, colors.lightBlue)
  // draw right border
  drawRect1(borderWidth + upperPanelWidth, 0, borderWidth, borderWidth + upperPanelHeight, colors.lightBlue);
  drawTetragon(borderWidth + upperPanelWidth, borderWidth + upperPanelHeight, borderWidth*2 + upperPanelWidth, borderWidth + upperPanelHeight,
              canvas1.width - deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight,
              canvas1.width - deltaX - borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight, colors.darkBlue);
  drawRect1(deltaX + borderWidth + screenFrameWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight, borderWidth, screenFrameHeight, colors.lightBlue);
  drawTetragon(canvas1.width - deltaX - borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
              canvas1.width - deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
              canvas1.width, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
              canvas1.width - borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight, colors.darkBlue);
  drawRect1(canvas1.width - borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
          borderWidth, bottomPanelHeight, colors.lightBlue);
  // draw left border
  drawRect1(0, 0, borderWidth, borderWidth + upperPanelHeight, colors.lightBlue);
  drawTetragon(0, borderWidth + upperPanelHeight, borderWidth, borderWidth + upperPanelHeight,
              borderWidth + deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight,
              deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight, colors.darkBlue);
  drawRect1(deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight, borderWidth, screenFrameHeight, colors.lightBlue);
  drawTetragon(deltaX, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
               deltaX + borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight,
               borderWidth, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
              0, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight, colors.darkBlue);
  drawRect1(0, borderWidth + upperPanelHeight + upperPanelShadowHeight + screenFrameHeight + controlPanelHeight,
          borderWidth, bottomPanelHeight, colors.lightBlue);
  // draw left border shadow
  drawTriangle(borderWidth, 0, borderWidth*2, borderWidth, borderWidth, borderWidth, colors.deepBlue);
  // draw right border shadow
  drawTriangle(canvas1.width - borderWidth, 0, canvas1.width - borderWidth*2, borderWidth,
              canvas1.width - borderWidth, borderWidth, colors.deepBlue);
}
