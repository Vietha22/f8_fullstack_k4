// Bài 1
var fibonacci_series = function (n) {
  if (n === 1 || n === 2) {
    return [1, 1];
  } else {
    var s = fibonacci_series(n - 1);
    s.push(s[s.length - 1] + s[s.length - 2]);
    return s;
  }
};

console.log(fibonacci_series(5));

// Bài 2
var reverseNumber = function (n) {
  if (n % 1 !== 0) {
    return `Không phải số nguyên`;
  } else {
    var result = 0;
    while (n !== 0) {
      var chuSoCuoi = n % 10;
      result = result * 10 + chuSoCuoi;
      n = (n - (n % 10)) / 10;
    }
  }
  return result;
};

console.log(reverseNumber(12345));

// Bài 3
var numberToText = function (n) {
  var result = ``;
  var text = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  var hangNghin = (n - (n % 1000)) / 1000;
  n %= 1000;
  var hangTram = (n - (n % 100)) / 100;
  n %= 100;
  var hangChuc = (n - (n % 10)) / 10;
  n %= 10;
  var hangDonVi = n;

  // Điều kiện hàng nghìn
  if (hangNghin !== 0) {
    result += text[hangNghin] + ` ngàn `;
  }

  // Điều kiện hàng trăm
  if (hangTram !== 0) {
    result += text[hangTram] + ` trăm `;
  } else if (
    hangTram === 0 &&
    hangNghin !== 0 &&
    (hangChuc !== 0 || (hangChuc === 0 && hangDonVi !== 0))
  ) {
    result += text[0] + ` trăm `;
  }

  // Điều kiện hàng chục
  if (hangChuc !== 0 && hangChuc !== 1) {
    result += text[hangChuc] + ` mươi `;
  } else if (hangChuc === 1) {
    result += `mười `;
  } else if (
    hangChuc === 0 &&
    (hangNghin !== 0 || hangTram !== 0) &&
    hangDonVi !== 0
  ) {
    result += `linh `;
  }

  // Điều kiện hàng đơn vị
  if (hangDonVi !== 0) {
    result += text[hangDonVi];
  } else if (
    hangDonVi === 0 &&
    hangNghin === 0 &&
    hangTram === 0 &&
    hangChuc === 0
  ) {
    result += text[0];
  }

  return result;
};

console.log(numberToText(9999));
