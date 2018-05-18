Notification.requestPermission();

function sendNotification(title, options) {
  if (!("Notification" in window)) {
    alert("Your browser doesn't support HTML Notifications.");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
  Notification.requestPermission(function (permission) {
    if (permission === "granted") {
      var notification = new Notification(title, options);
    } else {
      alert("You have permitted to show notifications."); // Юзер отклонил наш запрос на показ уведомлений
    }
  });
  } else {
    // user doesn't want to receive notifications
  }
}


var counter, start, counting;
var delta = 0;
var currentTimer;
var currentMinutes, currentSeconds;
var work = true, shortBreak = false, longBreak = false;
var timerIsRunning = false;
var workTime=25, breakTime=5, longBreakTime=20;

var step = 0;
var oneTomato = ["work", "shortBreak"];
var pomodoroCycle = oneTomato.concat(oneTomato, oneTomato, oneTomato[0], ["longBreak"]);
console.log(pomodoroCycle);

function currentState() {
  return pomodoroCycle[step];
}

var pomodoroTimes = {
  work: function() {return workTime},
  shortBreak: function() {return breakTime},
  longBreak: function() {return longBreakTime}
}

var pomodoroState = {
  work: true,
  shortBreak: false,
  longBreak: false
}

function timeToString(t) {
  if (t<10) {
    return "0" + t;
  } else {
    return t;
  }
}

function updatePomodoroState(state) {
  if (state=="work") {
    pomodoroState.work = true;
    pomodoroState.shortBreak = false;
    pomodoroState.longBreak = false;
  } else if (state=="shortBreak") {
    pomodoroState.work = false;
    pomodoroState.shortBreak = true;
    pomodoroState.longBreak = false;
  } else if (state=="longBreak") {
    pomodoroState.work = false;
    pomodoroState.shortBreak = false;
    pomodoroState.longBreak = true;
  }
}

console.log(pomodoroTimes.work());

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
  stopTimer();
  step++;
  if (step == pomodoroCycle.length) {
    step = 0;
  }
  // work --> break, etc
  updatePomodoroState(currentState());
  // work
  if ([0, 2, 4, 6].includes(step)) {
    message = "Break has ended, now it's time to work!";
  } else if ([1, 3, 5].includes(step)) { //break
    message = "Work time has finished, let's have a break!";
  } else if (step == 7) { // long break
    message = "You've done 4 pomodoros, let's have a long break!";
  }
  sendNotification('Time is out!', {
    body: message,
    icon: 'icon.png',
    dir: 'auto'
  });
  resetTimer();
  console.log(step);
  highlightCurrentStep();
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
    document.getElementById("minus").style.cursor = "not-allowed";
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
  document.querySelector("#timer").innerHTML = timeToString(currentMinutes) + ":" + timeToString(currentSeconds);
};

function stopTimer() {
  clearTimeout(currentTimer);
  timerIsRunning = false;
  document.querySelector('#start-or-pause-timer i').innerHTML = "play_arrow";
  counting = false;
};

function resetTimer() {
  stopTimer();
  var newTime;
  if (pomodoroState.work) {
    newTime = timeToString(workTime) + ":00";
  } else if (pomodoroState.shortBreak) {
    newTime = timeToString(breakTime) + ":00";
  } else if (pomodoroState.longBreak) {
    newTime = timeToString(longBreakTime) + ":00";
  }
  document.querySelector("#timer").innerHTML = newTime;
  document.getElementById("minus").disabled = false;
  document.getElementById("minus").style.cursor = "pointer";
  counting = false;
  highlightCurrentStep();
};

function toggleTimer() {
  if (timerIsRunning) {
    return stopTimer();
  } else {
    return startTimer();
  }
}

function skipNext() {
  stopTimer();
  step++;
  if (step == pomodoroCycle.length) {
    step = 0;
  }
  // work --> break, etc
  updatePomodoroState(currentState());
  resetTimer();
  console.log("Step:", step);
  console.log("state:", currentState());
  highlightCurrentStep();
}

function skipPrevious() {
  stopTimer();
  step--;
  if (step < 0) {
    step = 0;
  }
  // work --> break, etc
  updatePomodoroState(currentState());
  resetTimer();
  console.log("Step:", step);
  console.log("state:", currentState());
  highlightCurrentStep();
}

function highlightCurrentStep() {
  var steps = document.querySelectorAll(".step");
  for (i=0; i<steps.length; i++) {
    steps[i].classList.remove('current-step');
  }
  if (currentState() == "work") {
    document.querySelector("#work").classList.add('current-step');
  } else if (currentState() == "shortBreak") {
    document.querySelector("#break").classList.add('current-step');
  } else if (currentState() == "longBreak") {
    document.querySelector("#long-break").classList.add('current-step');
  }
}

function setTime(element, t, state) {
  stopTimer();
  var steps = document.querySelectorAll(".step");
  for (i=0; i<steps.length; i++) {
    steps[i].classList.remove('current-step');
  }
  element.classList.add('current-step');
  if (state=="work") step = 0;
  else if (state=="shortBreak") step = 1;
  else if (state=="longBreak") step = 7;
  updatePomodoroState(currentState());
  resetTimer();
  console.log("Step:", step);
  console.log("state:", currentState());
  highlightCurrentStep();
}

function showSettings() {
    document.getElementById("time-settings").classList.toggle("show");
}

function setTimePeriods() {
  workTime = document.getElementById("work-range").value;
  breakTime = document.getElementById("break-range").value;
  longBreakTime = document.getElementById("long-break-range").value;
  console.log(workTime, breakTime, longBreakTime);
  if (timerIsRunning) {
    resetTimer();
  }
  document.getElementById("time-settings").classList.toggle("show");

  document.querySelector("#timer").innerHTML = timeToString(workTime) + ":00";
  console.log(pomodoroTimes.work());
  step = 0;
  highlightCurrentStep();
}

function updateTextInput(val, spanId) {
  document.getElementById(spanId).innerHTML = val;
}
