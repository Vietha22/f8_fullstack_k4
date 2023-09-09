// Bài 1
function sum(...args) {
  var result = 0;
  for (var index in args) {
    result += Number(args[index]);
  }
  return isNaN(result) ? `Lỗi, dữ liệu truyền vào không hợp lệ` : result;
}

console.log(sum(9, "2", "1", "a"));
console.log(sum(9, "2", "1", [4], true));

// Bài 2
Object.prototype.getCurrency = function (unit) {
  return this.toLocaleString("en") + " " + unit;
};

var price = 12000000;
console.log(price.getCurrency("đ"));

// Bài 3
Array.prototype.push2 = function (...args) {
  for (var i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
  return this.length;
};

var users = [1, 2, 3];
var count = users.push2("A", "B", "C");
console.log(count);
console.log(users);

// Bài 4
Array.prototype.filter2 = function (callback) {
  var newArr = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i)) {
      newArr[newArr.length] = this[i];
    }
  }

  return newArr;
};

var numbers = [5, 1, 2, 9, 6, 8, 2];
var results = numbers.filter2(function (number) {
  if (number >= 3) {
    return true;
  }
});

console.log(results);
console.log(numbers);

// Bài 5
var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
    ],
  },
];

function buildSelectOptions(categories, level = 0) {
  var optionsHTML = "";
  var arr = [];
  arr.length = level;

  categories.forEach((category) => {
    var indentation = arr.fill("--|").join("");
    optionsHTML += `<option value="${category.id}">${indentation}${category.name}</option>`;

    if (category.children) {
      optionsHTML += buildSelectOptions(category.children, level + 1);
    }
  });

  return optionsHTML;
}

var selectOptions = buildSelectOptions(categories);
var selectHTML = `<select>
<option value="">Chọn chuyên mục</option>
    ${selectOptions}
</select>`;

document.write(selectHTML);
