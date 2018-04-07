
// to shuffle images' numbers when the page is refreshed or game is restarted
var cards = null;
var openedCards = [];

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
  openedCards = [];
  disableCards();
  for (var i = 0, len = cards.length; i < len; i++) {
    var elem = cards[i];
    elem.classList.remove('matched');
    elem.classList.remove('unmatched');
  }
  closeAllCards();
  setTimeout(setImages, 500);
  setTimeout(enableCards, 500);
}

function matched() {
  openedCards[0].classList.add('disabled');
  openedCards[1].classList.add('disabled');
  openedCards[0].classList.add('matched');
  openedCards[1].classList.add('matched');
  openedCards = [];
}

function unmatched() {
  openedCards[0].classList.add('disabled');
  openedCards[1].classList.add('disabled');
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
}

function flip(elem) {
  elem.classList.add('disabled');
  openedCards.push(elem);
  if (openedCards.length == 2) {
    var img1 = openedCards[0].querySelector('.back img').src;
    var img2 = openedCards[1].querySelector('.back img').src;
    if (img1 === img2) {
      matched();
    } else {
      unmatched();
    }
  }
  if (openedCards.length == 3) {
    // close previous two cards
    openedCards[0].classList.remove('disabled');
    openedCards[1].classList.remove('disabled');
    openedCards[0].classList.remove('unmatched');
    openedCards[1].classList.remove('unmatched');
    openedCards[0].classList.toggle('flip');
    openedCards[1].classList.toggle('flip');
    // reset openedCards
    openedCards.splice(0, 2);
  }
  elem.classList.toggle("flip");
  console.log(openedCards.length);
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
