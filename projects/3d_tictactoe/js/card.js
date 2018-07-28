// import { minimax } from './minimax.js'

export class Card {
  constructor(id, game) {
    this.game = game;
    this._id = id;
    this._element = document.getElementById(this._id);
    this._disabled = false;
    this._container = this._element.parentElement;
    const self = this;
    this._element.addEventListener('click', function() {
      self.handleClick();
    }, false);
  }

  draw(player) {
    // X or O
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
    iconDiv.classList.add('icon');
    this._element.appendChild(iconDiv);
  }

  disable() {
    this._disabled = true;
  }

  enable() {
    this._disabled = false;
  }

  isValidForMove() {
    // card's parent container is being shown and card has no mark yet
    return this._container.classList.contains('container-origin') && !this._disabled;
  }

  click(player) {
    const self = this;
    if (this.isValidForMove()) {
      this.draw(player);
      this.game.grid[parseInt(this._id)] = player;
      this.disable();
      player = (player == 'X') ? 'O' : 'X';
      setTimeout(function() {
        self.game.upperContainer.classList.remove('container-up');
        self.game.middleContainer.classList.remove('container-up');
      }, 500);
    }
    return player;
  }

  handleClick() {
    this.game.player = this.click(this.game.player, this.game.grid);
    this.game.checkWinning();
    // var aiMove = minimax(this.game.grid, 'O').index;
    // console.log(aiMove);
  }
}
