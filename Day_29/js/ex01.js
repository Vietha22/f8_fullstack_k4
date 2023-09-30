var list = document.querySelector(".list");

var lessons = [
  {
    module: "Nhập môn lập trình web",
    list: [
      "Giới thiệu Khoá học HTML-CSS",
      "Nhập môn lập trình web - Phần 1",
      "Nhập môn lập trình web - Phần 2",
      "Công cụ - Phần mềm cần chuẩn bị",
    ],
  },
  {
    module: "Ngôn ngữ HTML",
    list: ["HTML cơ bản - Phần 1", "HTML cơ bản - Phần 2"],
  },
  {
    module: "Ngôn ngữ CSS",
    list: [
      "Giới thiệu ngôn ngữ CSS - Cách viết CSS",
      "Cấu trúc CSS - Bộ chọn (Selector) trong CSS - Phần 1",
      "Bộ chọn CSS (Tiếp theo) - Các thuộc tính định dạng văn bản",
      "Chồng chéo CSS và thứ tự ưu tiên trong CSS",
      "Thuộc tính Background",
      "Thuộc tính Border",
      "Thuộc tính Width - Height",
    ],
  },
];

var table = lessons
  .map(function (lesson) {
    return `<div class="active list-item" draggable="true">
    <span></span>
    ${lesson.module}
    </div>
    ${lesson.list
      .map(function (item) {
        return `<div class="list-item" draggable="true">
            <span></span>
            ${item}
            </div>`;
      })
      .join("")}
        `;
  })
  .join("");

list.innerHTML = table;

function sortNumber() {
  var listLesson = document.querySelectorAll(".list-item:not(.active) span");
  var listModule = document.querySelectorAll(".list-item.active span");
  listLesson.forEach((lesson, index) => {
    lesson.innerHTML = `Bài ${++index}:`;
  });
  listModule.forEach((module, index) => {
    module.innerHTML = `Module ${++index}:`;
  });
}
sortNumber();

var listItem = document.querySelectorAll(".list-item");

listItem.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("ghost");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("ghost");
  });
});

list.addEventListener("dragover", function (e) {
  var dragItem = document.querySelector(".list-item.ghost");
  var notDragItem = document.querySelectorAll(".list-item:not(.ghost");
  var siblings = Array.from(notDragItem).find(function (item) {
    return e.clientY <= item.offsetTop + item.offsetHeight / 2;
  });
  list.insertBefore(dragItem, siblings);
});

list.addEventListener("dragend", sortNumber);
