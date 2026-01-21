let timerInterval;
let timeLeft = 0;
let sessionCount = 0;
let isPaused = false;
let currentLabel = "";

const timerDisplay = document.getElementById("timer");
const sessionText = document.getElementById("session-text");
const ding = document.getElementById("ding");

function startTimer(seconds, label = "") {
  clearInterval(timerInterval);
  isPaused = false;
  timeLeft = seconds;
  currentLabel = label;
  sessionText.textContent = label;
  timerDisplay.classList.remove("paused");
  
  updateTimerDisplay();
  runCountdown();
}

function runCountdown() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        if(ding) ding.play().catch(e => console.log("Audio blocked"));
        handleTimerEnd();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = 
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// --- PAUSE LOGIC ---
timerDisplay.onclick = () => {
  if (timeLeft > 0) {
    isPaused = !isPaused; // Toggles between true and false
    
    if (isPaused) {
      timerDisplay.classList.add("paused");
      sessionText.textContent = "Paused";
    } else {
      timerDisplay.classList.remove("paused");
      sessionText.textContent = currentLabel;
    }
  }
};

function handleTimerEnd() {
  alert("Time is up!");
}

// --- CLICK HANDLERS ---
document.getElementById("bird").onclick = () => startTimer(5 * 60, "Short break");
document.getElementById("rabbit").onclick = () => startTimer(45 * 60, "Learning session");
document.getElementById("rose").onclick = () => {
  const minutes = prompt("Enter minutes:");
  if (minutes && !isNaN(minutes)) startTimer(minutes * 60, "Custom timer");
};

// Window Ctrls
document.getElementById("closeBtn").onclick = () => document.getElementById("window").style.display = "none";
document.getElementById("minimizeBtn").onclick = () => document.getElementById("window").style.height = "40px";
document.getElementById("maximizeBtn").onclick = () => document.getElementById("window").style.height = "550px";