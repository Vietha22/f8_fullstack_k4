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

const initialTime = 20;
let timePerCb = initialTime * 60;
let isDisabled = true;

const playCountdown = () => {
  timePerCb--;
  let timeLeft = timePerCb / 60;
  if (timeLeft > 0) {
    counter.textContent = timeLeft.toFixed();
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
