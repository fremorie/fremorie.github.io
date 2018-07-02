var containers;
var cards;
var humanPlayerMove = true;

var playerXDrawing = true;

var upperContainer, middleContainer;
var disabledCards = [];

window.onload = function() {
  upperContainer = document.querySelector('#upper');
  middleContainer = document.querySelector('#middle');
  containers = document.getElementsByClassName('container');
  cards = document.getElementsByClassName('card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', playerMove, false);
  }

  for (var i = 0; i < containers.length; i++) {
    containers[i].addEventListener('click', showContainer);
  }
  document.addEventListener('click', closeContainerIfClickedOutside);
}

function closeContainerIfClickedOutside(evt) {
  var targetElement = evt.target;  // clicked element
  do {
    for (var i = 0; i < cards.length; i++) {
      if (targetElement == cards[i]) {
        return;
      }
    }
    targetElement = targetElement.parentNode;
    } while (targetElement);
  // This is a click outside.
  for (i = 0; i < containers.length; i++) {
    containers[i].classList.remove('container-origin');
  }
  setTimeout(function() {
    upperContainer.classList.remove('container-up');
    middleContainer.classList.remove('container-up');
  }, 300);

}

function showContainer() {
  var currentContainer = this;
  if (humanPlayerMove) {
    if (this.id == 'upper') {
      this.classList.toggle('container-origin');
      return;
    }
    if (this.id == 'middle') {
      upperContainer.classList.add('container-up');
      setTimeout(function() {
        currentContainer.classList.toggle('container-origin');
      }, 300);
      return;
    } else if (this.id == 'bottom') {
      upperContainer.classList.add('container-up');
      middleContainer.classList.add('container-up');
      setTimeout(function() {
        currentContainer.classList.toggle('container-origin');
      }, 300);
      return;
    }
  } else {
    return;
  }
}

function drawX() {
  var iconDiv = document.createElement('div');
  var icon = document.createElement('i');
  icon.classList.add('fas');
  icon.classList.add('fa-times');
  iconDiv.appendChild(icon);
  return iconDiv;
}

function drawO() {
  var iconDiv = document.createElement('div');
  var icon = document.createElement('i');
  icon.classList.add('far');
  icon.classList.add('fa-circle');
  iconDiv.appendChild(icon);
  return iconDiv;
}

function disableCard(card) {
  disabledCards.push(card.id);
}

function playerMove() {
  var container = this.parentElement;
  if (container.classList.contains('container-origin')) {
    if (!disabledCards.includes(this.id)) {
      var id = parseInt(this.id);
      if (playerXDrawing) {
        var iconDiv = drawX();
        playerXDrawing = false;
        grid[id-1] = 'X'
      } else {
        var iconDiv = drawO();
        playerXDrawing = true;
        grid[id-1] = 'O'
      }
      iconDiv.classList.add('icon');
      this.appendChild(iconDiv);
      disableCard(this);
    }
    setTimeout(function() {
      upperContainer.classList.remove('container-up');
      middleContainer.classList.remove('container-up');
    }, 500);
    checkWinning();
    }
}

function restartGame() {
  for (var i = 0; i < cards.length; i++) {
    // remove green background
    cards[i].classList.remove('winning');
    // remove all 'X's and 'O's
    while (cards[i].firstChild) {
    cards[i].removeChild(cards[i].firstChild);
      }
  };
  // reset grid
  grid = Array.from(Array(27).keys()).map(x => x+1);
  // reset winning popup
  var popupContent = document.querySelector('#result .winningMessage i');
  popupContent.remove();
  // X goes first (idk why... after all, it's called 'krestiki-noliki', not 'noliki-krestiki')
  playerXDrawing = true;
  disabledCards = [];
}

function checkWinning() {
  if (winning(grid, 'X')) {
    showPopup('X');
  } else if (winning(grid, 'O')) {
    showPopup('O');
  }
}

function showPopup(player) {
  setTimeout(function() {
    var popup = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];
    var popupContent = document.getElementById('result');
    var button = document.getElementById('playAgain');
    // draw X or O depending on who's won
    if (player == 'X') {
      var iconDiv = drawX();
    } else if (player == 'O') {
      var iconDiv = drawO();
    }
    iconDiv.classList.add('winningMessage');
    // insert X or O before 'player won'
    popupContent.insertAdjacentElement('afterbegin', iconDiv);
    // make popup visible
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
  }, 1000);
}
