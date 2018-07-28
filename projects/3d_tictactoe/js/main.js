import { Game } from './game.js';
var game;

function closeContainerIfClickedOutside(evt) {
  var targetElement = evt.target;
  do {
    for (var i = 0; i < game.cards.length; i++) {
      if (targetElement == game.cards[i]._element) {
        return;
      }
    }
    targetElement = targetElement.parentNode;
    } while (targetElement);

  for (i = 0; i < game.containers.length; i++) {
    game.containers[i].classList.remove('container-origin');
  }
  setTimeout(function() {
    game.upperContainer.classList.remove('container-up');
    game.middleContainer.classList.remove('container-up');
  }, 300);
}

window.onload = function() {
  game = new Game();
  document.addEventListener('click', self.closeContainerIfClickedOutside);
}
