var content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;

// Xử lý
content += ` `;
var result = "";
var oldPosition = 0;
var position = content.indexOf(" ");

var handleTimer = function () {
  result =
    content.slice(0, oldPosition) +
    `<span style="color: red">${content.slice(
      oldPosition,
      position + 1
    )}</span>` +
    content.slice(position + 1);

  oldPosition = position;
  position = content.indexOf(" ", oldPosition + 1);

  if (position === -1) {
    oldPosition = 0;
    position = content.indexOf(" ");
  }

  document.querySelector(".box").innerHTML = result;
};

window.onload = handleTimer;

setInterval(handleTimer, 1000);
