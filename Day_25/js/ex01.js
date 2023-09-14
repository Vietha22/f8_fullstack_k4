// Tạo các element
var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselItems = carouselInner.children;

var carouselNextBtn = carousel.querySelector(".carousel-nav .next");
var carouselPrevBtn = carousel.querySelector(".carousel-nav .prev");

var carouselDots = carousel.querySelectorAll(".carousel-dots span");

// Tính kích thước 1 item
var itemWidth = carouselInner.clientWidth; // Lấy kích thước chiều rộng của 1 element

// Tính tổng kích thước các item
var totalWidth = carouselItems.length * itemWidth;

// Cập nhật css
carouselInner.style.width = `${totalWidth}px`;

var position = 0;

// Lắng nghe sự kiện của nút next
carouselNextBtn.addEventListener("click", function () {
  // Khi bắm vào nút next => Trừ đi kích thước của 1 item
  if (Math.abs(position) + itemWidth === totalWidth) {
    return;
  }
  position -= itemWidth;
  carouselInner.style.translate = `${position}px`;

  // Chuyển dot
  carouselDots[Math.abs(position) / itemWidth - 1].classList.remove("active");
  carouselDots[Math.abs(position) / itemWidth].classList.add("active");
});

// Lắng nghe sự kiện của nút prev
carouselPrevBtn.addEventListener("click", function () {
  // Khi bắm vào nút prev => Cộng kích thước của 1 item
  if (Math.abs(position) < itemWidth) {
    return;
  }
  position += itemWidth;
  carouselInner.style.translate = `${position}px`;

  // Chuyển dot
  carouselDots[Math.abs(position) / itemWidth + 1].classList.remove("active");
  carouselDots[Math.abs(position) / itemWidth].classList.add("active");
});

// Click dot chuyển slide
carouselDots.forEach(function (carouselDot) {
  carouselDot.addEventListener("click", function () {
    var dotActivated = carousel.querySelector(".carousel-dots .active");
    if (dotActivated !== null) {
      dotActivated.classList.remove("active");
    }
    carouselDot.classList.add("active");

    position = -(carouselDot.dataset.index * itemWidth);
    carouselInner.style.translate = `${position}px`;
  });
});

// Vuốt slider
var isDragStart = false;
var initialOffsetX;
var threshold = (10 * itemWidth) / 100;

carouselInner.addEventListener("mousedown", function (e) {
  isDragStart = true;
  initialOffsetX = e.offsetX;
});

carouselInner.addEventListener("mousemove", function (e) {
  e.preventDefault();
  if (!isDragStart) return;
  var moveWidth = e.clientX - initialOffsetX;
  carouselInner.style.cursor = "move";
  carouselInner.style.transition = null;

  // Vuốt next và prev
  if (Math.abs(moveWidth) >= threshold) {
    if (moveWidth < 0) {
      if (Math.abs(position) + itemWidth === totalWidth) {
        return;
      }
      position -= itemWidth;
      carouselInner.style.translate = `${position}px`;
      isDragStart = false;

      // Chuyển dot
      carouselDots[Math.abs(position) / itemWidth - 1].classList.remove(
        "active"
      );
      carouselDots[Math.abs(position) / itemWidth].classList.add("active");
    } else {
      if (Math.abs(position) < itemWidth) {
        return;
      }
      position += itemWidth;
      carouselInner.style.translate = `${position}px`;
      isDragStart = false;

      // Chuyển dot
      carouselDots[Math.abs(position) / itemWidth + 1].classList.remove(
        "active"
      );
      carouselDots[Math.abs(position) / itemWidth].classList.add("active");
    }
  } else {
    carouselInner.style.transition = "none";
    carouselInner.style.translate = `${position + moveWidth}px`;
  }
});

carouselInner.addEventListener("mouseup", function (e) {
  isDragStart = false;
  var moveWidth = e.clientX - initialOffsetX;
  carouselInner.style.cursor = "default";
  carouselInner.style.transition = null;

  if (Math.abs(moveWidth) < threshold) {
    carouselInner.style.translate = `${position}px`;
  } else {
    if (Math.abs(position) + itemWidth === totalWidth) {
      carouselInner.style.translate = `${position}px`;
    }
    if (Math.abs(position) < itemWidth) {
      carouselInner.style.translate = `${position}px`;
    }
  }
});
