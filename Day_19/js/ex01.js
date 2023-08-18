// Bài 1
var Arr = [1, 4, 4, 3, 8, 5, 11, 9];
var min = Arr[0];
var max = Arr[0];
for (var i = 1; i < Arr.length; i++) {
  if (min > Arr[i]) {
    min = Arr[i];
  }
  if (max < Arr[i]) {
    max = Arr[i];
  }
}

console.log(`Số nhỏ nhất: ${min}, Số lớn nhất: ${max}`);

// Bài 2
function isPrime(number) {
  if (
    number % 1 !== 0 ||
    number < 2 ||
    (number % 2 === 0 && number !== 2) ||
    (number % 3 === 0 && number !== 3)
  )
    return false;
  for (let i = 5; i <= Math.sqrt(number); i += 2)
    if (number % i === 0) return false;
  return true;
}

var Arr = [0, 3, 4, 6, 7, 9, 11, 14, 20];
var count = 0;
var sum = 0;
for (var index in Arr) {
  if (isPrime(Arr[index])) {
    count++;
    sum += Arr[index];
  }
}

if (count === 0) {
  console.log(`Không có số nguyên tố`);
} else {
  var average = sum / count;
  console.log(`Trung bình cộng các số nguyên tố: ${average}`);
}

// Bài 3
var Arr = [0, 1, "a", 1, 5, "m", 0, "a", 6];
var newArr = [];
for (var i = 0; i < Arr.length; i++) {
  if (newArr.indexOf(Arr[i]) === -1) {
    newArr[newArr.length] = Arr[i];
  }
}

console.log(newArr);

// Bài 4
var numbers = [5, 1, 9, 8, 10];
var element = 4;

numbers.sort(function (a, b) {
  return a - b;
});

var k;
for (var i = 0; i < numbers.length; i++) {
  if (element >= numbers[i]) {
    k = i + 1;
  }
}
for (var i = numbers.length - 1; i > k - 1; i--) {
  numbers[i + 1] = numbers[i];
}
numbers[k] = element;

console.log(`Mảng sau khi sắp xếp và chèn: ${numbers}`);
