const pomodoroTimer = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

const breakButton = document.querySelector('#break');



startButton.addEventListener('click', () => {
    startTimer();

    startButton.innerHTML = (startButton.innerHTML === 'start') ? startButton.innerHTML = 'stop' : startButton.innerHTML = 'start';
});

resetButton.addEventListener('click', () => {
    startTimer(true);
    clearInterval(clockTimer);
    pomodoroTimer.textContent = `25:00`;

});

let isClockRunning = false;
let currentTimeLeftInSession = 1500;
let breakTime = 375;

const startTimer = (reset) => {
    if (reset) {

    } else {
        if (isClockRunning === true) {
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            isClockRunning = true;

            clockTimer = setInterval(() => {
                currentTimeLeftInSession--;
                displayCurrentTimeLeftInSession();
            }, 10)
        }
    }

    const displayCurrentTimeLeftInSession = () => {
        const secondsLeft = currentTimeLeftInSession;
        let result = '';
        const seconds = secondsLeft % 60;
        const minutes = parseInt(secondsLeft / 60) % 60;

        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }

        result += `${addLeadingZeroes(minutes)} : ${addLeadingZeroes(seconds)}`;

        if (minutes <= 0 & seconds <= 0) {
            clearInterval(clockTimer);

            startButton.innerHTML = 'start';
            pomodoroTimer.textContent = '25:00';
        }

        pomodoroTimer.innerText = result;
    }
}

breakButton.addEventListener('click', () => {
    breakTimer();

})

const breakTimer = setInterval(() => {
    breakTime--;
    displayCurrentTimeLeftInSession();

}, 10)