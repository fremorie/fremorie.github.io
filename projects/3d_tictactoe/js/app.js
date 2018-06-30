var containers;
var cards;
var humanPlayerMove = true;

var playerXDrawing = true;

var upperContainer, middleContainer;

window.onload = function() {
  upperContainer = document.querySelector('#upper');
  middleContainer = document.querySelector('#middle');
  console.log('hey!');
  containers = document.getElementsByClassName('container');
  cards = document.getElementsByClassName('card');

  for (var i = 0; i < containers.length; i++) {
    containers[i].addEventListener('click', showContainer);
  }
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', drawX, false);
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
  var container = this.parentElement;
  if (container.classList.contains('container-origin')) {
    var id = parseInt(this.id);
    var icon = document.createElement('i');
    if (playerXDrawing) {
      icon.classList.add('fas');
      icon.classList.add('fa-times');
      playerXDrawing = false;
      grid[id-1] = 'X'
    } else {
      icon.classList.add('far');
      icon.classList.add('fa-circle');
      playerXDrawing = true;
      grid[id-1] = 'O'
    }
    console.log(grid);
    var iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    iconDiv.appendChild(icon);
    this.appendChild(iconDiv);
    setTimeout(function() {
      upperContainer.classList.remove('container-up');
      middleContainer.classList.remove('container-up');
    }, 500);
    checkWinning();
    }
}
