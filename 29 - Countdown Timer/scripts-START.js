
let countdown;
const timerDisplay = document.querySelector('.display__time-left');


function timer(seconds) {
    const now = Date.now();
    const then = seconds * 1000 + now;
    displayTimeLeft(seconds)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours =  Math.floor(seconds / 3600);
    const secondsLeft = seconds % 60;
    const disply = `${hours < 10? ('0' + hours): hours}: ${minutes < 10? ('0' + minutes): minutes}: ${secondsLeft < 10? ('0' + secondsLeft): secondsLeft}`;
    timerDisplay.textContent = disply;
    document.title = disply;
}