export class Container {
  constructor(id, game) {
    this._id = id;
    this._element = document.getElementById(this._id);
    this.game = game;
    const self = this;
    this._element.addEventListener('click', function() {
      self.show();
    }, false);
  }

  show() {
    const self = this;
    if (this._id == 'upper') {
      this._element.classList.toggle('container-origin');
      return;
    }
    if (this._id == 'middle') {
      this.game.upperContainer.classList.add('container-up');
      setTimeout(function() {
        self._element.classList.toggle('container-origin');
      }, 300);
      return;
    } else if (this._id == 'bottom') {
      this.game.upperContainer.classList.add('container-up');
      this.game.middleContainer.classList.add('container-up');
      setTimeout(function() {
        self._element.classList.toggle('container-origin');
      }, 300);
      return;
    }
  }
}
