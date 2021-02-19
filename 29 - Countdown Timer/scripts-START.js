
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const Endtime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    const now = Date.now();
    const then = seconds * 1000 + now;

    displayTimeLeft(seconds);
    displayEndTime(then);
    clearInterval(countdown);

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
    const minutes = Math.floor((seconds > 3599 ? (seconds % 3600): seconds) / 60);
    const hours =  Math.floor(seconds / 3600);
    const secondsLeft = seconds % 60;
    const disply = `${hours < 10? ('0' + hours): hours}: ${minutes < 10? ('0' + minutes): minutes}: ${secondsLeft < 10? ('0' + secondsLeft): secondsLeft}`;
    
    timerDisplay.textContent = disply;
    document.title = disply;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    Endtime.textContent = `See you at ${hours}: ${minutes < 10? ('0' + minutes): minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = parseInt(this.minutes.value);
    timer(minutes * 60);
});