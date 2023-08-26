// Bài 1
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
  getError: function (field) {
    return Object.values(this[field])[0];
  },
};

console.log(errors.getError("password"));

// Bài 2
var Person = function (name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
};

Person.prototype.shortName = function () {
  var arrName = this.name.split(" ");
  return arrName[0] + " " + arrName[arrName.length - 1];
};

function createCustomers(customers) {
  customers.forEach(function (value, index) {
    value["shortname"] = value.shortName();
  });
  customers.sort((a, b) => a.age - b.age);

  return customers;
}

const customers = [
  new Person("Nguyễn Văn A", 11, "Ha Noi"),
  new Person("Nguyễn Văn B", 2, "Hai Phong"),
  new Person("Nguyễn Văn C", 12, "TP.HCM"),
];

const result = createCustomers(customers);
console.log(result);

// Bài 3
var User = function (name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
};

function handleRegister(name, password, email) {
  if (
    typeof name === "undefined" ||
    typeof password === "undefined" ||
    typeof email === "undefined"
  ) {
    return console.log(`Lỗi, thông tin đăng ký không đầy đủ!`);
  } else {
    var user = new User(name, password, email);
    user.role = "user";
    data.push(user);
  }
}

function handleLogin(email, password) {
  var user = data.find(function (value) {
    return value["email"] === email && value["password"] === password;
  });
  var result = user ? user : `Thông tin đăng nhập không hợp lệ`;
  return result;
}

const data = [];

var dataRegister = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
var dataRegister = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");

console.log(data);
console.log(dataLogin);
