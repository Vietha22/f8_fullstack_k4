// Button tab
var loginBtn = document.querySelector(".btn-login");
var registerBtn = document.querySelector(".btn-register");
var loginForm = document.querySelector(".auth-login");
var registerForm = document.querySelector(".auth-register");

// input
var loginEmail = document.querySelector("#login-email");
var loginPassword = document.querySelector("#login-password");
var registerName = document.querySelector("#register-name");
var registerEmail = document.querySelector("#register-email");
var registerPassword = document.querySelector("#register-password");

// error
var loginEmailErr = document.querySelector("#login-email-err");
var loginPassErr = document.querySelector("#login-password-err");
var registerNameErr = document.querySelector("#register-name-err");
var registerEmailErr = document.querySelector("#register-email-err");
var registerPassErr = document.querySelector("#register-password-err");

// button auth
var loginBtnAuth = document.querySelector("#btn-login-auth");
var registerBtnAuth = document.querySelector("#btn-register-auth");

// Eye-slash show password
var showPass = document.querySelectorAll(".password-show");
var eyeIcon = document.querySelectorAll(".password-show span:first-child");
var eyeSlashIcon = document.querySelectorAll(".password-show span:last-child");

// Button tab switch event
loginBtn.addEventListener("click", function () {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");

  loginForm.classList.add("show");
  registerForm.classList.remove("show");

  loginEmail.value = "";
  loginEmailErr.innerText = "";
  loginEmail.classList.remove("notice");

  loginPassword.value = "";
  loginPassErr.innerText = "";
  loginPassword.classList.remove("notice");

  eyeIcon[0].classList.add("show-icon");
  eyeSlashIcon[0].classList.remove("show-icon");
});

registerBtn.addEventListener("click", function () {
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");

  registerForm.classList.add("show");
  loginForm.classList.remove("show");

  registerName.value = "";
  registerNameErr.innerText = "";
  registerName.classList.remove("notice");

  registerEmail.value = "";
  registerEmailErr.innerText = "";
  registerEmail.classList.remove("notice");

  registerPassword.value = "";
  registerPassErr.innerText = "";
  registerPassword.classList.remove("notice");

  eyeIcon[1].classList.add("show-icon");
  eyeSlashIcon[1].classList.remove("show-icon");
});

// login input event
var handleLoginInputBlur = function () {
  if (loginEmail.value === "") {
    loginEmailErr.innerText = "Vui lòng nhập thông tin";
    loginEmail.classList.add("notice");
  }
  if (loginPassword.value === "") {
    loginPassErr.innerText = "Vui lòng nhập thông tin";
    loginPassword.classList.add("notice");
  }
};

loginEmail.addEventListener("blur", handleLoginInputBlur);
loginPassword.addEventListener("blur", handleLoginInputBlur);

loginEmail.addEventListener("input", function () {
  loginEmailErr.innerHTML = "";
  loginEmail.classList.remove("notice");
  if (loginEmail.value === "") {
    loginEmailErr.innerText = "Vui lòng nhập thông tin";
    loginEmail.classList.add("notice");
  }
});

loginPassword.addEventListener("input", function () {
  loginPassErr.innerHTML = "";
  loginPassword.classList.remove("notice");
  if (loginPassword.value === "") {
    loginPassErr.innerText = "Vui lòng nhập thông tin";
    loginPassword.classList.add("notice");
  }
});

// login button auth event
loginBtnAuth.addEventListener("click", function (e) {
  if (loginPassword.value === "" && loginEmail.value === "") {
    loginPassErr.innerText = "Vui lòng nhập thông tin";
    loginPassword.classList.add("notice");
    loginEmailErr.innerText = "Vui lòng nhập thông tin";
    loginEmail.classList.add("notice");
  }
  e.preventDefault();
});

// register input event
var handleRegisterInputBlur = function () {
  if (registerName.value === "") {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
    registerName.classList.add("notice");
  }
  if (registerEmail.value === "") {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
    registerEmail.classList.add("notice");
  }
  if (registerPassword.value === "") {
    registerPassErr.innerText = "Vui lòng nhập thông tin";
    registerPassword.classList.add("notice");
  }
};

registerName.addEventListener("blur", handleRegisterInputBlur);
registerEmail.addEventListener("blur", handleRegisterInputBlur);
registerPassword.addEventListener("blur", handleRegisterInputBlur);

registerName.addEventListener("input", function () {
  registerNameErr.innerHTML = "";
  registerName.classList.remove("notice");
  if (registerName.value === "") {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
    registerName.classList.add("notice");
  }
});

registerEmail.addEventListener("input", function () {
  registerEmailErr.innerHTML = "";
  registerEmail.classList.remove("notice");
  if (registerEmail.value === "") {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
    registerEmail.classList.add("notice");
  }
});

registerPassword.addEventListener("input", function () {
  registerPassErr.innerHTML = "";
  registerPassword.classList.remove("notice");
  if (registerPassword.value === "") {
    registerPassErr.innerText = "Vui lòng nhập thông tin";
    registerPassword.classList.add("notice");
  }
});

// register button auth event
registerBtnAuth.addEventListener("click", function (e) {
  if (
    registerName.value === "" &&
    registerPassword.value === "" &&
    registerEmail.value === ""
  ) {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
    registerName.classList.add("notice");
    registerPassErr.innerText = "Vui lòng nhập thông tin";
    registerPassword.classList.add("notice");
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
    registerEmail.classList.add("notice");
  }
  e.preventDefault();
});

// show password event
showPass[0].addEventListener("click", function () {
  eyeIcon[0].classList.toggle("show-icon");
  eyeSlashIcon[0].classList.toggle("show-icon");

  if (eyeIcon[0].classList.contains("show-icon")) {
    loginPassword.type = "password";
  } else {
    loginPassword.type = "text";
  }
});

showPass[1].addEventListener("click", function () {
  eyeIcon[1].classList.toggle("show-icon");
  eyeSlashIcon[1].classList.toggle("show-icon");

  if (eyeIcon[1].classList.contains("show-icon")) {
    registerPassword.type = "password";
  } else {
    registerPassword.type = "text";
  }
});

var btn = document.querySelector(".btn");
var authBox = document.querySelector(".auth-box");
var boxOverlay = authBox.querySelector(".overlay");

btn.addEventListener("click", function () {
  authBox.classList.add("show-box");

  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");

  loginForm.classList.add("show");
  registerForm.classList.remove("show");

  loginEmail.value = "";
  loginEmailErr.innerText = "";
  loginEmail.classList.remove("notice");

  loginPassword.value = "";
  loginPassErr.innerText = "";
  loginPassword.classList.remove("notice");

  eyeIcon[0].classList.add("show-icon");
  eyeSlashIcon[0].classList.remove("show-icon");
});

boxOverlay.addEventListener("click", function () {
  authBox.classList.remove("show-box");
});
