// Timer was apapted from https://codepen.io/cathydutton/pen/xxpOOw

window.onload = function () {

  var minutes = 00;
  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var appendMinutes = document.getElementById("minutes");
  var Interval;

  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);

  function startTimer() {
    tens++;

    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59){
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      tens = 0;
      appendSeconds.innerHTML = "0" + 0;
    }
  }


};
