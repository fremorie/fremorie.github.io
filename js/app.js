
// to shuffle images' numbers when the page is refreshed or game is restarted
var cards = null;

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function repeatArray(arr, count) {
  var ln = arr.length;
  var b = new Array();
  for(i=0; i<count; i++) {
    b.push(arr[i%ln]);
  }
  return b;
}

function setBacksideImage() {
  var images = document.querySelectorAll(".front img");
  for (var i = 0, len = images.length; i < len; i++) {
    var elem = images[i];
    elem.src = './images/back.jpg';
  }
}

function closeAllCards() {
  for (var i = 0, len = cards.length; i < len; i++) {
    var elem = cards[i];
    elem.classList.remove('flip');
  }
}

function setImages() {
  // [1,2,3,4,5,6,7,8]
  var arr = [...Array(8).keys()].map(x => x+1);
  var imageNames = repeatArray(arr, 16);
  shuffle(imageNames);
  var images = document.querySelectorAll(".back img");
  for (var i = 0, len = images.length; i < len; i++) {
    var elem = images[i];
    elem.src = './images/' + imageNames[i].toString() + '.png';
  }
}

function disableCards() {
  for (var i = 0, len = cards.length; i < len; i++) {
    var elem = cards[i];
    elem.classList.add('disabled');
  }
}

function enableCards() {
  for (var i = 0, len = cards.length; i < len; i++) {
    var elem = cards[i];
    elem.classList.remove('disabled');
  }
}

function shuffleCards() {
  disableCards();
  closeAllCards();
  setTimeout(setImages, 500);
  setTimeout(enableCards, 500);
}

function flip(elem) {
  elem.classList.toggle("flip");
}



$(document).ready(function() {
  console.log('ready!');
  cards = document.querySelectorAll(".card");
  shuffleCards();
  setBacksideImage();
  $('.card').click(function() {
    flip(this);
  })
})
