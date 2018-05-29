var currentLanguage = 'en'

function switchFlagIcon() {
  var img = document.getElementById('flag-image');
  if (currentLanguage == 'en') {
    img.src = 'images/flags/uk.svg';
    currentLanguage = 'ru';
    console.log(currentLanguage);
  } else {
    img.src = 'images/flags/ru.svg';
    currentLanguage = 'en'
    console.log(currentLanguage);
  }
}

function switchLanguage() {
  switchFlagIcon();
}

document.onload = function() {
  document.getElementById("flag-button").addEventListener("click", switchFlagIcon);
}
