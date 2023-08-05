// Bài 1
var a = 3;
var b = 5;

a = a + b;
b = a - b;
a = a - b;

console.log(`a: ${a}; b: ${b}`);

// Bài 2
var S = 10 + 20 + Math.pow(5, 10) / 2;
console.log(S);

// Bài 3
var a = 2,
  b = 10,
  c = 7;

var max = a;
if (max < b) {
  max = b;
} else if (max < c) {
  max = c;
}

console.log(max);

// Bài 4
var a = -2,
  b = 1;

if (a * b > 0) {
  console.log("a, b cùng dấu");
} else {
  console.log("a, b khác dấu");
}

// Bài 5
var a = 20,
  b = 10,
  c = 7;
var temp;

if (a > b) {
  temp = a;
  a = b;
  b = temp;
}

if (a > c) {
  temp = a;
  a = c;
  c = temp;
}

if (b > c) {
  temp = b;
  b = c;
  c = temp;
}

console.log(`a : ${a}; b : ${b}; c : ${c}`);
