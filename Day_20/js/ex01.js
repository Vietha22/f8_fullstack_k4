// Bài 1
var arr1 = [1, 4, 3, 2];
var arr2 = [5, 2, 6, 7, 1];

var dup = arr1.reduce(function (prev, current) {
  if (arr2.includes(current)) {
    prev.push(current);
  }
  return prev;
}, []);
console.log(dup);

// Bài 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

function flat(arr) {
  return arr.reduce(function (prev, current) {
    return prev.concat(Array.isArray(current) ? flat(current) : current);
  }, []);
}
var result = flat(arr);
console.log(result);

// Bài 3
var arr = [
  ["a", 1, true],
  ["b", 2, false],
];

if (Array.isArray(arr)) {
  var flatArr = flat(arr);
  var obj = flatArr.reduce(function (acc, item) {
    var type = typeof item;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  var newArr = Object.values(obj);
  console.log(newArr);
} else {
  console.log("Không phải là mảng");
}

// Bài 4

var posts = [
  {
    img: "https://picsum.photos/100",
    title: "Tiêu đề bài viết 1",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia.",
  },
  {
    img: "https://picsum.photos/100",
    title: "Tiêu đề bài viết 2",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia.",
  },
  {
    img: "https://picsum.photos/100",
    title: "Tiêu đề bài viết 3",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia.",
  },
  {
    img: "https://picsum.photos/100",
    title: "Tiêu đề bài viết 4",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia.",
  },
];

var newArr = posts.map(function (post, index) {
  if (index % 2 == 0) {
    var html = `
    <div class="post">
        <div class="img">
            <img src="${post.img}" alt="img">
        </div>
        <div class="content">
            <h2 class="title">${post.title}</h2>
            <p class="content-item">${post.content}</p>
        </div>
    </div>

    <hr />
    `;
  } else {
    var html = `
    <div class="post">
        <div class="content">
            <h2 class="title">${post.title}</h2>
            <p class="content-item">${post.content}</p>
        </div>
        <div class="img">
            <img src="${post.img}" alt="img">
        </div>
    </div>

    <hr />
    `;
  }
  return html;
});

var postArray = document.getElementsByClassName("container");
postArray[0].innerHTML = newArr.join(" ");
