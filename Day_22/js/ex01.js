// Bài 1
function sum(...args) {
  var result = 0;
  for (var index in args) {
    result += Number(args[index]);
  }
  return isNaN(result) ? `Lỗi, dữ liệu truyền vào không hợp lệ` : result;
}

// Bài 3
function buildTree(arr, parentId = 0) {
  var result = [];
  // Khai báo một mảng mới để tạo cây nested
  for (var item of arr) {
    // Nếu như có parent,
    // check với parentId để xác định cấp con
    if (item.parent === parentId) {
      var children = buildTree(arr, item.id);
      // Đệ quy để tạo cấp con
      if (children.length > 0) {
        // Nếu như tạo được cấp con,
        // đưa vào cấp cha dưới dạng nested
        item.children = children;
      }
      delete item.parent;
      // Xóa key parent cho giống đề bài

      result.push(item);
      // Truyền item đã tạo nested vào cây nested
    }
  }
  return result;
  // trả về cây nested đã được tạo xong
}

var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];

console.log(buildTree(categories));

// Bài 4
Array.prototype.reduce2 = function (callback, init) {
  var result = init === undefined ? this[0] : init;

  var index = init === undefined ? 1 : 0;

  for (i = index; i < this.length; i++) {
    result = callback(result, this[i], i);
  }

  return result;
};

var numbers = [1, 2, 3, 4, 5];

var sum = numbers.reduce2((prev, current) => {
  return prev + current;
});

console.log(sum);
