// var currentLanguage = 'en'
//
// function switchFlagIcon() {
//   var img = document.getElementById('flag-image');
//   if (currentLanguage == 'en') {
//     img.src = 'images/flags/uk.svg';
//     currentLanguage = 'ru';
//     console.log(currentLanguage);
//   } else {
//     img.src = 'images/flags/ru.svg';
//     currentLanguage = 'en'
//     console.log(currentLanguage);
//   }
// }
//
// function switchLanguage() {
//   switchFlagIcon();
// }
//
// document.onload = function() {
//   document.getElementById("flag-button").addEventListener("click", switchFlagIcon);
// }

function toggleVisibility(el) {
  if (el.id == 'showMore') {
    el.innerHTML = '<br>';
    // el.style.display = 'none';
  }
  else if (el.id == 'showLess') {
    document.getElementById('showMore').innerHTML = 'Show more';
    // setTimeout(function() {
    //   document.getElementById('showMore').innerHTML = 'Show more';
    //   document.getElementById('showMore').style.display = 'inline';
    // }, 500);
  }
}
