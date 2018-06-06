var colors = {
  lightBlue: '#66c6ff',
  blue: '#4dbdff',
  darkBlue: '#33b3ff',
  deepBlue: '#33637f',
  blackBlue: '#001019',
  orange: '#ff8f4d',
  darkOrange: '#b24200'
}

var cellWidth;

const GRID_GAP = 10;
const CELL_WIDTH = 200;
const CELL_HEIGHT = 200;
const ROWS = 3;
const COLS = 3;

var grid = Array.from(Array(ROWS * COLS).keys());

var huPlayer = "X";
var aiPlayer = "O";


window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  cellWidth = (canvas.width - 2 * GRID_GAP)/3;
  drawEverything();
  canvas.addEventListener('mousedown', function(evt) {
    var mousePosition = calculateMousePosition(evt);
    handleMouseClick(mousePosition.x, mousePosition.y);
  })
}

function handleMouseClick(mouseX, mouseY) {
  var mouseCol = Math.floor(mouseX / CELL_WIDTH);
  var mouseRow = Math.floor(mouseY / CELL_HEIGHT);
  if (grid[cellToIndex(mouseCol, mouseRow)] != 'X'
      && grid[cellToIndex(mouseCol, mouseRow)] != 'O') {
    var mouseCellCenter = cellCenter(mouseCol, mouseRow);
    grid[cellToIndex(mouseCol, mouseRow)] = "X";
    animateX(mouseCellCenter.x, mouseCellCenter.y, 60);
  }
  // ai is making a move
  setTimeout(function() {
    var aiMove = minimax(grid, aiPlayer).index;
    var aiMoveX = cellCenter(indexToCell(aiMove).col, indexToCell(aiMove).row).x;
    var aiMoveY = cellCenter(indexToCell(aiMove).col, indexToCell(aiMove).row).y;
    animateO(aiMoveX, aiMoveY, CELL_HEIGHT/6, 2*Math.PI);
    grid[aiMove] = 'O';
    checkWinning();
  }, 1000);
}

function checkWinning() {
  if (winning(grid, aiPlayer)) {
    showPopup('You lost :(');
  }
  else if (emptyIndexies(grid).length == 0) {
    showPopup('Tie!');
  }
  else if (winning(grid, huPlayer)) {
    showPopup('You won!');
  }
}


function showPopup(text) {
  setTimeout(function() {
    var popup = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];
    var popupContent = document.getElementById('result');
    var button = document.getElementById('playAgain');
    popupContent.textContent = text;
    popup.style.display = "block";
    button.onclick = function() {
      popup.style.display = "none";
      restartGame();
    }
    span.onclick = function() {
        popup.style.display = "none";
        restartGame();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
            restartGame();
        }
    }
  }, 2000);
}

function restartGame() {
  drawEverything();
  grid = Array.from(Array(ROWS * COLS).keys());
}

function cellCenter(col, row) {
  return {
    x: CELL_WIDTH * col + CELL_WIDTH/2 + GRID_GAP * col,
    y: CELL_HEIGHT * row + CELL_HEIGHT/2 + GRID_GAP * row
  }
}

function indexToCell(indx) {
  return {
    row: Math.floor(indx / ROWS),
    col: indx - ROWS * Math.floor(indx / ROWS)
  }
}

function cellToIndex(col, row) {
  return (col + COLS * row);
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

function drawEverything() {
  //draw background
  drawRect(0, 0, canvas.width, canvas.height, colors.lightBlue);
  animateGrid();
}

function drawRect(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height);
}
