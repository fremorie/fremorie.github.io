const MAP_CENTER = [55.75, 37.61];
const TOP_Y = 55.911186;
const BOTTOM_Y = 55.519897;
const LEFT_X = 37.252705;
const RIGHT_X = 37.936604;
const openTime = 8;
const closeTime = 23;

export class Destination {
  constructor(x, y, openFrom, openUntil) {
    this.coords = [y, x];
    this.openFrom = openFrom;
    this.openUntil = openUntil;
    this.MAP_CENTER = [55.75, 37.61];
    this.TOP_Y = 55.911186;
    this.BOTTOM_Y = 55.519897;
    this.LEFT_X = 37.252705;
    this.RIGHT_X = 37.936604;
    this.openTime = 8;
    this.closeTime = 23;
  }

  static mapCenter() {
    return MAP_CENTER;
  }

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static generate() {
    let x = this.getRandomArbitrary(LEFT_X, RIGHT_X);
    let y = this.getRandomArbitrary(BOTTOM_Y, TOP_Y);
    let openFrom = this.getRandomInt(openTime, closeTime - 1);
    let delta = this.getRandomInt(1, 10);
    let openUntil = (openFrom + delta) < 23 ? (openFrom + delta) : openFrom + 1;
    return new Destination(x, y, openFrom, openUntil);
  }

  timeToString() {
    return `${this.openFrom}:00 - ${this.openUntil}:00`
  }
}
