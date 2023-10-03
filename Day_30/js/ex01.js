var editor = document.querySelector("#content");
var boldBtn = document.querySelector("#bold-btn");
var underlineBtn = document.querySelector("#underline-btn");
var italicBtn = document.querySelector("#italic-btn");

var dropdownToggle = document.querySelector(".dropdown-toggle");
var dropdownMenu = document.querySelector(".dropdown-menu");

var color = document.querySelector("#color-btn");

// Controls
function performAction(command) {
  document.execCommand(command, false, null);
  editor.focus();
}

boldBtn.addEventListener("click", function () {
  performAction("bold");
});

italicBtn.addEventListener("click", function () {
  performAction("italic");
});

underlineBtn.addEventListener("click", function () {
  performAction("underline");
});

// setColor
function setColor(color) {
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, color);
}

color.addEventListener("input", function () {
  setColor(this.value);
});

// Toggle dropdown
dropdownToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show");
  }
});

// Count word
var word = document.querySelector(".counts .word");
var char = document.querySelector(".counts .char");

editor.addEventListener("input", function () {
  var text = this.innerText;
  var countWord = text.trim().replace(/\s+/g, " ").split(" ").length;
  var countChar = text.trim().replace(/\s+/g, "").split("").length;
  word.textContent = countWord;
  char.textContent = countChar;
});

// Dropdown menu controls
var newBtn = document.querySelector("#new-btn");
var txtBtn = document.querySelector("#txt-btn");
var pdfBtn = document.querySelector("#pdf-btn");

var filename = document.querySelector("#filename-input");

newBtn.addEventListener("click", function () {
  filename.value = "untitled";
  editor.innerText = "";
  word.textContent = 0;
  char.textContent = 0;
});

pdfBtn.addEventListener("click", function () {
  var options = {
    filename: filename.value,
    margin: 0,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf(editor, options);
});

txtBtn.addEventListener("click", function () {
  var file = new Blob([editor.textContent], { type: "text/plain" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = filename.value;
  link.click();
  URL.revokeObjectURL(link.href);
});
