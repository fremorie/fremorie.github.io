var counter, start, counting;
var delta = 0;
var currentTimer;
var currentMinutes, currentSeconds;
var work = true;
var shortBreak = false;
var longBreak = false;
var timerIsRunning = false;

function timer(seconds) {
  start = new Date().getTime();
  return setInterval(function() {
    var now = new Date().getTime();
    delta = now - start;
    secondsPassed = Math.floor((delta % (1000 * 60)) / 1000);
    minutesPassed = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    secondsPassed = secondsPassed + 60*minutesPassed;
    currentSeconds = seconds - secondsPassed;
    if (currentSeconds < 0) {
      counting = false;
      timeIsOut();
    }
    currentMinutes = Math.floor(currentSeconds/60);
    currentSeconds -= currentMinutes*60;
    if (counting) {
      cddisplay();
    }
  }, 500);
}

function timeIsOut() {
  alert('Time is out!');
  stopTimer();
  if (work) {
    work = !work;
  }
  resetTimer();
}

function startTimer() {
  counting = true;
  timerIsRunning = true;
  document.querySelector('#start-or-pause-timer i').innerHTML = "pause";
  var timeLeft = document.querySelector('#timer').innerHTML;
  var minutes = parseInt(timeLeft.substring(0,2));
  var seconds = parseInt(timeLeft.substring(3,5));
  currentTimer = timer(minutes * 60 + seconds);
}

function showTimeSettings() {
    document.getElementById("time-settings").classList.toggle("show");
}

function addOrSubMinute(operator) {
  var timeLeft = document.querySelector('#timer').innerHTML;
  var minutes = parseInt(timeLeft.substring(0,2));
  var seconds = parseInt(timeLeft.substring(3,5));
  if (operator > 0) {
    minutes ++;
  } else {
    minutes --;
  }
  if (minutes < 1) {
    document.getElementById("minus").disabled = true;
  }
  if (seconds < 10) {seconds = '0' + seconds};
  if (minutes < 10) {minutes = '0' + minutes};
  if (counting) {
    clearTimeout(currentTimer);
    currentTimer = timer(minutes * 60 + seconds);
  }
  document.querySelector('#timer').innerHTML = minutes + ':' + seconds;
}

function cddisplay() {
  if (currentMinutes < 10) {
    var cm = "0" + currentMinutes;
  } else {
    cm = currentMinutes;
  }
  if (currentSeconds < 10) {
    var cs = "0" + currentSeconds;
  } else {
    cs = currentSeconds;
  }
  document.querySelector("#timer").innerHTML = cm + ":" + cs;
};

function stopTimer() {
  clearTimeout(currentTimer);
  timerIsRunning = false;
  document.querySelector('#start-or-pause-timer i').innerHTML = "play_arrow";
};

function resetTimer() {
  stopTimer();
  var newTime;
  if (work) {
    newTime = "25:00";
  } else {
    newTime = "05:00";
  }
  document.querySelector("#timer").innerHTML = newTime;
  document.getElementById("minus").disabled = false;
};

function toggleTimer() {
  if (timerIsRunning) {
    return stopTimer();
  } else {
    return startTimer();
  }
}

function setTime(numberOfMinutes, isWork) {
  stopTimer();
  if (numberOfMinutes < 10) numberOfMinutes = '0' + numberOfMinutes;
  document.querySelector("#timer").innerHTML = numberOfMinutes + ":00";
  if (isWork) {
    work = true;
  } else {
    work = false;
  }
  document.getElementById("minus").disabled = false;
}
