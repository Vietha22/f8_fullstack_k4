//Tạo element
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

var progressBarWidth = progressBar.clientWidth;
var initialClientX;
var value;
var currentValue = 0;

var isDragStart = false;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    // -> Lấy offsetX -> tính phần trăm theo chiều rộng
    value = (e.offsetX * 100) / progressBarWidth;
    progress.style.width = `${value}%`;

    isDragStart = true;
    initialClientX = e.clientX;
    currentValue = value;
    document.addEventListener("mousemove", handleDrag);

    // Cập nhật audio
    var currentTimeValue = (value * audio.duration) / 100;
    audio.currentTime = currentTimeValue;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDragStart = true;
  initialClientX = e.clientX;
  document.addEventListener("mousemove", handleDrag);
});

document.addEventListener("mouseup", function () {
  if (isDragStart) {
    isDragStart = false;
    currentValue = value;
    document.removeEventListener("mousemove", handleDrag);

    // Cập nhật audio
    var currentTimeValue = (value * audio.duration) / 100;
    audio.currentTime = currentTimeValue;
  }
});

var handleDrag = function (e) {
  if (isDragStart) {
    var moveWidth = e.clientX - initialClientX;
    value = (moveWidth * 100) / progressBarWidth + currentValue;

    if (value < 0) {
      value = 0;
    }

    if (value > 100) {
      value = 100;
    }

    progress.style.width = `${value}%`;

    // Nhạc vẫn chạy khi Kéo
    var currentTimeValue = (value * audio.duration) / 100;
    currentTimeEl.innerText = getTime(currentTimeValue);
  }
};

// Tạo element audio
var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".player .play-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60); //Lấy được phút

  seconds = Math.floor(seconds - mins * 60); // Tính số giây còn lại

  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

//Lăng nghe sự kiện loadeddata -> Khi nào file audio tải xong
audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("timeupdate", function () {
  if (!isDragStart) {
    var timeValue = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${timeValue}%`;
    currentTimeEl.innerText = getTime(audio.currentTime);
  }
});

audio.addEventListener("play", function () {
  playBtn.innerHTML = pauseIcon;
});

audio.addEventListener("pause", function () {
  playBtn.innerHTML = playIcon;
});

audio.addEventListener("ended", function () {
  progress.style.width = 0;
  audio.currentTime = 0;
});

// Timer
var timer = progressBar.querySelector(".timer");

progressBar.addEventListener("mousemove", function (e) {
  var timerUpdate = getTime((e.offsetX / progressBarWidth) * audio.duration);
  timer.innerText = `${timerUpdate}`;
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
});

progressBar.addEventListener("mouseout", function () {
  timer.style.display = null;
});

progressSpan.addEventListener("mousemove", function (e) {
  e.stopPropagation();
  timer.style.display = null;
});
