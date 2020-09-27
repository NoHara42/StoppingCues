var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
        paused = 0;
        running = 1;
    }
}
// function resetTimer() {
//     clearInterval(tInterval);
//     savedTime = 0;
//     difference = 0;
//     paused = 0;
//     running = 0;
//     timerDisplay.innerHTML = '';
// }
function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}

var body = document.body;
var timerDisplay = document.createElement('div');
timerDisplay.style.position = 'fixed';
timerDisplay.style.top = '85vh';
timerDisplay.style.left = '50vw';
timerDisplay.style.borderRadius = '50px';
timerDisplay.style.padding = '20px';    
timerDisplay.style.backgroundColor = 'white';
body.appendChild(timerDisplay);
startTimer();
