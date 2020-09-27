/**
 * Disclaimer, your mom belongs to us now.
 */

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
var randomMessageDelay = 5000;

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

// calculates the next time frame
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

    // replaces the old time with the new time
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}

// Creates and instantiates the timer element
var timerDisplayContainer = document.createElement('div');
timerDisplayContainer.className = "SC-container";

var timerDisplay = document.createElement('div');
timerDisplayContainer.appendChild(timerDisplay);
timerDisplay.className = 'SC-timer';

document.body.appendChild(timerDisplayContainer);

// Creates and instantiates the random message element
var randomMessageContainer = document.createElement('div');
randomMessageContainer.className = "SC-container-right";

var randomMessage = document.createElement('div');
randomMessageContainer.appendChild(randomMessage);
randomMessage.className = 'SC-random-message';

document.body.appendChild(randomMessageContainer);

// listens to scrolling and begins the timer
window.addEventListener('scroll', debounce(function(e) {
    startRandomMessages(randomMessageDelay);
    startTimer();
}, 250));

function startRandomMessages(delay) {
    setInterval(popUpMessage(), delay)
}

function popUpMessage() {
    if(!running) {
    let random = Math.floor(Math.random() * SCMESSAGES.length);
    randomMessage.innerHTML = SCMESSAGES[random];
    }
}

// helper function, so that we dont call the start timer function on every single scroll event, improves performance
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};



