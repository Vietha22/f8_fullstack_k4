const counter = document.querySelector(".counter");
const btn = document.querySelector(".btn");

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let requestId;

const timeCount = 20;
let initialTime = 0;
let isDisabled = true;

// The number of callbacks is usually 60 times per second
const playCountdown = () => {
  let timeLeft = timeCount - initialTime / 60;
  initialTime++;
  if (timeLeft >= 0) {
    counter.textContent = Math.ceil(timeLeft);
    requestId = requestAnimationFrame(playCountdown);
  } else {
    isDisabled = false;
    btn.removeAttribute("disabled");
  }
};

btn.addEventListener("click", () => {
  if (!isDisabled) {
    window.location.href = "https://fullstack.edu.vn";
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    cancelAnimationFrame(requestId);
  } else {
    requestId = requestAnimationFrame(playCountdown);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  requestId = requestAnimationFrame(playCountdown);
});
