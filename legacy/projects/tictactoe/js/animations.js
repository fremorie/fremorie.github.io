function animateLine(startX, startY, endX, endY) {
  var framesPerSecond = 100;
  ctx.lineWidth = 10;
  ctx.strokeStyle = colors.deepBlue;
  var counterX = startX;
  var counterY = startY;
  var xInterval = setInterval(function() {
    if (counterY < endY) {
      drawLine(startX, startY, counterX, counterY);
      counterY++;
      if (startX < endX) {
        counterX++;
      } else {
        counterX--;
      }
    } else {
      clearInterval(xInterval);
    }
  }, 50/framesPerSecond);
}

function animateO(x, y, radius) {
  var framesPerSecond = 100;
  var eAngle = 0;
  var oInterval = setInterval(function() {
    if (eAngle < 2*Math.PI) {
      drawCircle(x, y, radius, eAngle);
      eAngle += 2*Math.PI/100;
    } else {
      clearInterval(oInterval);
    }
  }, 1000/framesPerSecond);
}

function animateX(x, y, lineWidth) {
  var delta = lineWidth/2;
  animateLine(x-delta, y-delta, x+delta, y+delta);
  setTimeout(function() {
    animateLine(x+delta, y-delta, x-delta, y+delta)
  }, 300);
}

function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawCircle(x, y, radius, eAngle) {
  ctx.lineWidth = 10;
  ctx.strokeStyle = colors.deepBlue;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, eAngle);
  ctx.stroke();
}

function drawX(x, y) {
  ctx.lineWidth = 10;
  ctx.strokeStyle = colors.deepBlue;
  drawLine(x-30, y-30, x+30, y+30);
  drawLine(x+30, y-30, x-30, y+30);
}

function animateGrid() {
  var framesPerSecond = 100;
  var maxY = 0, maxX = 0;
  var gridInterval = setInterval(function() {
    if (maxY < canvas.height) {
      drawVerticalLines(maxY);
      drawHorizontalLines(maxY);
      maxY += 10;
    } else {
      clearInterval(gridInterval);
    }
  }, 1000/framesPerSecond);
}

function drawVerticalLines(maxY) {
  drawRect(cellWidth, 0, GRID_GAP, maxY, 'white');
  drawRect(cellWidth*2 + GRID_GAP, 0, GRID_GAP, maxY, 'white');
}

function drawHorizontalLines(maxX) {
  drawRect(0, cellWidth, maxX, GRID_GAP, 'white');
  drawRect(0, cellWidth*2 + GRID_GAP, maxX, GRID_GAP, 'white');
}

function drawGrid() {
  // draw horizontal lines
  drawRect(0, cellWidth, canvas.width, GRID_GAP, 'white');
  drawRect(0, cellWidth*2 + GRID_GAP, canvas.width, GRID_GAP, 'white');
  // draw vertical lines
  drawRect(cellWidth, 0, GRID_GAP, canvas.height, 'white');
  drawRect(cellWidth*2 + GRID_GAP, 0, GRID_GAP, canvas.height, 'white');
}
