// --- CLOCK LOGIC ---
function updateClock() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" +
                    now.getMinutes().toString().padStart(2, '0') + ":" +
                    now.getSeconds().toString().padStart(2, '0');
    const dateStr = now.toDateString().toUpperCase();

    document.getElementById('digital-clock').textContent = timeStr;
    document.getElementById('date-display').textContent = dateStr;

    checkAlarm(timeStr.substring(0, 5));
}
setInterval(updateClock, 1000);

// --- STOPWATCH LOGIC ---
let swStartTime, swInterval;
let swRunning = false;

function startStopwatch() {
    if (!swRunning) {
        swStartTime = Date.now() - (swStartTime || 0);
        swInterval = setInterval(updateStopwatch, 10);
        swRunning = true;
    }
}

function updateStopwatch() {
    const diff = Date.now() - swStartTime;
    const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
    const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    const m = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
    document.getElementById('stopwatch-display').textContent = `${m}:${s}.${ms}`;
}

function stopStopwatch() {
    clearInterval(swInterval);
    swStartTime = Date.now() - swStartTime;
    swRunning = false;
}

function resetStopwatch() {
    clearInterval(swInterval);
    swStartTime = null;
    swRunning = false;
    document.getElementById('stopwatch-display').textContent = "00:00:00.00";
}

// --- ALARM LOGIC ---
let activeAlarm = null;
const alarmSound = document.getElementById('alarm-sound');

function setAlarm() {
    activeAlarm = document.getElementById('alarm-time').value;
    if(activeAlarm) {
        document.getElementById('alarm-status').textContent = "STATUS: ARMED [" + activeAlarm + "]";
    }
}

function clearAlarm() {
    activeAlarm = null;
    alarmSound.pause();
    document.getElementById('alarm-status').textContent = "STATUS: IDLE";
}

function checkAlarm(currentTime) {
    if (activeAlarm === currentTime) {
        alarmSound.play();
        document.getElementById('alarm-status').textContent = "WARNING: TEMPORAL BREACH!";
    }
}