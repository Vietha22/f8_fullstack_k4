const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const btn = document.querySelector(".btn");
const action = document.querySelector(".action");

let isActive = false;

btn.addEventListener("click", () => {
  if (!isActive) {
    isActive = true;
    recognition.start();
    btn.classList.add("active");
    btn.innerText = "Đang thu âm, bấm để dừng";
    action.innerText = "Hãy nói nội dung bạn muốn";
  } else {
    isActive = false;
    recognition.stop();
    btn.classList.remove("active");
    btn.innerText = "Bấm vào đây để nói";
    action.innerText = "";
  }
});

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  // Lấy chuỗi văn bản đã nhận diện được
  const text = event.results[0][0].transcript.toLowerCase();
  // Xử lý chuỗi văn bản để biết được người dùng vừa đọc gì

  let sw = false;
  let check = true;

  switch (text) {
    case "google":
      window.open("https://www.google.com");
      break;
    case "facebook":
      window.open("https://www.facebook.com");
      break;
    case "youtube":
      window.open("https://www.youtube.com");
      break;
    case "google drive":
      window.open("https://drive.google.com");
      break;
    case "google maps":
    case "bản đồ":
      window.open("https://maps.google.com");
      break;
    default:
      sw = true;
  }

  if (sw) {
    if (text.includes("chỉ đường") || text.includes("tới")) {
      const place = text
        .replace("chỉ đường", "")
        .replace("chỉ đường tới", "")
        .replace("đường tới", "")
        .replace("tới", "")
        .trim();
      window.open(`https://www.google.com/maps/place/${place}`);
    } else if (
      text.includes("bài hát") ||
      text.includes("mở bài hát") ||
      text.includes("nghe bài hát")
    ) {
      const song = text
        .replace("bài hát", "")
        .replace("mở bài hát", "")
        .replace("nghe bài hát", "")
        .trim();
      window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${song}`);
    } else if (
      text.includes("video") ||
      text.includes("mở video") ||
      text.includes("xem video")
    ) {
      const video = text
        .replace("video", "")
        .replace("mở video", "")
        .replace("xem video", "")
        .trim();
      window.open(`https://www.youtube.com/results?search_query=${video}`);
    } else {
      check = false;
    }
  }

  if (check) {
    action.innerText = "Thực hiện thành công";
  } else {
    action.innerText = "Không thực hiện được yêu cầu";
  }
};

// Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = (event) => {
  isActive = false;
  recognition.stop();
  btn.classList.remove("active");
  btn.innerText = "Bấm vào đây để nói";
};
