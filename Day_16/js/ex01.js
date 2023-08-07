// Bài 1
var fare;
var km = 120;
var total;
if (0 < km && km <= 1) {
  fare = 15000;
  total = fare * km;
} else if (1 < km && km <= 5) {
  fare = 13500;
  total = fare * km;
} else if (5 < km && km <= 120) {
  fare = 11000;
  total = fare * km;
} else {
  fare = 11000;
  total = fare * km * 0.9;
}

console.log(`Tổng số tiền: ${total}`);

// Bài 2
var kWh = 401;
var bill;
var total;

if (0 < kWh && kWh <= 50) {
  bill = 1678;
  total = bill * kWh;
} else if (51 <= kWh && kWh <= 100) {
  bill = 1734;
  total = bill * (kWh - 50) + 1678 * 50;
} else if (101 <= kWh && kWh <= 200) {
  bill = 2014;
  total = bill * (kWh - 100) + 1734 * 50 + 1678 * 50;
} else if (201 <= kWh && kWh <= 300) {
  bill = 2536;
  total = bill * (kWh - 200) + 2014 * 100 + 1734 * 50 + 1678 * 50;
} else if (301 <= kWh && kWh <= 400) {
  bill = 2834;
  total = bill * (kWh - 300) + 2536 * 100 + 2014 * 100 + 1734 * 50 + 1678 * 50;
} else if (kWh >= 401) {
  bill = 2927;
  total =
    bill * (kWh - 400) +
    2834 * 100 +
    2536 * 100 +
    2014 * 100 +
    1734 * 50 +
    1678 * 50;
}

console.log(`Số tiền phải đóng: ${total}`);

// Bài 3
var n = 3;
var S = 0;
for (var i = 1; i <= n; i++) {
  S += i * (i + 1);
}

console.log(S);

// Bài 4
function isPrimeNumber(n) {
  var check = true;

  if (n % 1 !== 0 || n <= 1) {
    check = false;
  } else {
    for (var i = 2; i < n; i++) {
      if (n % i === 0) {
        check = false;
        break;
      }
    }
  }

  return check;
}

var number = 7;
if (isPrimeNumber(number)) {
  console.log(`Là số nguyên tố`);
} else {
  console.log(`Không là số nguyên tố`);
}

// Bài 5
var n = 10;
var temp = "";
var k = 1;

var i, j;

for (i = 1; i <= n; i++) {
  for (j = 1; j <= i; j++) {
    temp += `${k}`;
    k++;
  }
  temp += `
`;
}

console.log(temp);

// Bài 6
var board = `<div class="board">`;

for (var i = 0; i < 8; i++) {
  board += `<div class="row-board">`;
  for (var j = 0; j < 8; j++) {
    if ((i + j + 1) % 2 == 0) {
      board += `<span class="black"></span>`;
    } else {
      board += `<span class="white"></span>`;
    }
  }
  board += `</div>`;
}
board += `</div>`;
document.write(board);

// Bài 7
var table = `<div class="table">`;

for (var i = 1; i < 10; i++) {
  table += `<div class="row-table">`;
  for (var j = 1; j <= 10; j++) {
    table += `<span class="number">${i * j}</span>`;
  }
  table += `</div>`;
}

table += `</div>`;

document.write(table);

// Bài 8
function tinhBieuThuc(n) {
  if (n == 1) return 1;
  return 1 / n + tinhBieuThuc(n - 1);
}

console.log(tinhBieuThuc(4));
