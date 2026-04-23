import { Card } from './card.js';
import { Container } from './container.js';

export class Game {
  constructor() {
    const self = this;
    this.upperContainer = document.querySelector('#upper');
    this.middleContainer = document.querySelector('#middle');
    this.containerElements = document.getElementsByClassName('container');
    this.cardElements = document.getElementsByClassName('card');

    this.cards = [];
    for (var i = 0; i < this.cardElements.length; i++) {
      this.cards[i] = new Card(this.cardElements[i].id, self);
    }

    this.containers = [];
    for (var i = 0; i < this.containerElements.length; i++) {
      this.containers[i] = new Container(this.containerElements[i].id, self);
    }

    this.grid = Array.from(Array(27).keys()).map(x => x+1);
    this.player = 'X';
    this.winningCombinations = [
      // horizontals
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [9, 10, 11], [12, 13, 14], [15, 16, 17],
      [18, 19, 20], [21, 22, 23], [24, 25, 26],
      // crosses
      [0, 4, 8], [2, 4, 6],
      [9, 13, 17], [11, 13, 15],
      [18, 22, 26], [20, 22, 24],
      // verticals
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [9, 12, 15], [10, 13, 16], [11, 14, 17],
      [18, 21, 24], [19, 22, 25], [20, 23, 26],
      // 3d verticals
      [0, 9, 18], [1, 10, 19], [2, 11, 20],
      [3, 12, 21], [4, 13, 22], [5, 14, 23],
      [6, 15, 24], [7, 16, 25], [8, 17, 26],
      // 3d crosses
      [0, 13, 26], [8, 13, 18],
      [2, 13, 24], [6, 13, 20],
      [3, 13, 23] // and more
    ];
  }

  checkWinning() {
    if (this.winning('X')) {
      this.showPopup('X');
    } else if (this.winning('O')) {
      this.showPopup('O');
    }
  }

  winning(player){
    var winningComb = 0;
    const self = this;

    this.winningCombinations.forEach(function(combination) {
      if (self.grid[combination[0]] == player &&
          self.grid[combination[1]] == player &&
          self.grid[combination[2]] == player) {
            winningComb = combination;
            return;
          }
    });
    if (winningComb != 0) {
      winningComb.forEach(function(cardId) {
        document.getElementById(cardId.toString()).classList.add('winning');
      })
      return true;
    }
  }

  showPopup(player) {
    const self = this;
    setTimeout(function() {
      var popup = document.getElementById('win-popup');
      var span = document.getElementsByClassName("close")[0];
      var popupContent = document.getElementById('result');
      var button = document.getElementById('playAgain');
      // draw X or O depending on who's won
      var iconDiv = self.draw(player);
      iconDiv.classList.add('winningMessage');
      // insert X or O before 'player won'
      popupContent.insertAdjacentElement('afterbegin', iconDiv);
      // make popup visible
      popup.style.display = "block";
      button.onclick = function() {
        popup.style.display = "none";
        self.restart();
      }
      span.onclick = function() {
          popup.style.display = "none";
          self.restart();
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == popup) {
              popup.style.display = "none";
              self.restart();
          }
      }
    }, 1000);
  }

  draw(player) {
    var iconDiv = document.createElement('div');
    var icon = document.createElement('i');
    if (player == 'X') {
      icon.classList.add('fas');
      icon.classList.add('fa-times');
    } else if (player == 'O') {
      icon.classList.add('far');
      icon.classList.add('fa-circle');
    } else {
      console.log('invalid player value');
    }
    iconDiv.appendChild(icon);
    return iconDiv;
  }

  restart() {
    for (var i = 0; i < this.cards.length; i++) {
      // remove green background
      this.cards[i]._element.classList.remove('winning');
      this.cards[i].enable();
      // remove all 'X's and 'O's
      while (this.cards[i]._element.firstChild) {
        this.cards[i]._element.removeChild(this.cards[i]._element.firstChild);
      }
    };
    // reset grid
    this.grid = Array.from(Array(27).keys()).map(x => x+1);
    // reset winning popup
    var popupContent = document.querySelector('#result .winningMessage i');
    popupContent.remove();
    // X goes first (idk why... after all, it's called 'krestiki-noliki', not 'noliki-krestiki')
    this.player = 'X';
  }

  static winning(grid, player) {
    var winningComb = 0;
    var winningCombinations = [
      // horizontals
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [9, 10, 11], [12, 13, 14], [15, 16, 17],
      [18, 19, 20], [21, 22, 23], [24, 25, 26],
      // crosses
      [0, 4, 8], [2, 4, 6],
      [9, 13, 17], [11, 13, 15],
      [18, 22, 26], [20, 22, 24],
      // verticals
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [9, 12, 15], [10, 13, 16], [11, 14, 17],
      [18, 21, 24], [19, 22, 25], [20, 23, 26],
      // 3d verticals
      [0, 9, 18], [1, 10, 19], [2, 11, 20],
      [3, 12, 21], [4, 13, 22], [5, 14, 23],
      [6, 15, 24], [7, 16, 25], [8, 17, 26],
      // 3d crosses
      [0, 13, 26], [8, 13, 18],
      [2, 13, 24], [6, 13, 20]
    ];

    winningCombinations.forEach(function(combination) {
      if (grid[combination[0]-1] == player &&
          grid[combination[1]-1] == player &&
          grid[combination[2]-1] == player) {
            winningComb = combination;
            return;
          }
    });
    if (winningComb != 0) {
      return true;
    } else {
      return false;
    }
  }
}
