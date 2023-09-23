var table = document.querySelector("table");
var tableBody = document.querySelector("table tbody");

var cartEl = document.querySelector("#cart_data");

var carts = [];

var products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 1000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 2000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 3000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: 4000,
  },
];

// Render bảng product
function renderProduct() {
  var rows = products
    .map(function (item, index) {
      return `<tr class="product-${index + 1}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td> 
                <input type="number" class="quantity" value="1" style="display: block;width: 90%; margin: 0 auto">
                <button class="add-btn" style = "width: 100%;">Thêm vào giỏ</button>
            </td>
        </tr>`;
    })
    .join("");

  tableBody.innerHTML = rows;

  // Element input và button của product
  var quantity = document.querySelectorAll(".quantity");
  var addBtn = document.querySelectorAll(".add-btn");

  // Thêm product vào giỏ
  addBtn.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      // Xử lý khi giá trị thêm vào giỏ <= 0
      quantity[index].value =
        +quantity[index].value > 0 ? quantity[index].value : 1;

      // Mảng chứa product id
      var productIds = carts.map(function (cart) {
        return cart.product_id;
      });

      // Kiểm tra trong giỏ hàng đã có sản phẩm chưa, nếu chưa add mới vào
      if (productIds.indexOf(index + 1) === -1) {
        carts.push({
          id: carts.length + 1,
          product_id: index + 1,
          name: products[index].name,
          price: products[index].price,
          quantity: +quantity[index].value,
          total: products[index].price * quantity[index].value,
        });
      } else {
        var productItem = carts.find(function (cart) {
          return cart.product_id === index + 1;
        });
        productItem.quantity += +quantity[index].value;
        productItem.total = products[index].price * productItem.quantity;
      }
      renderCart();
    });
  });
}
renderProduct();

// Render bảng cart
var renderCart = function () {
  if (!carts.length) {
    cartEl.innerText = "Giỏ hàng không có sản phẩm";
    return;
  }

  var cartElItem = carts
    .map(function (cart, index) {
      return `<tr>
        <td>${cart.id}</td>
        <td>${cart.name}</td>
        <td>${cart.price}</td>
        <td><input type="number" value=${cart.quantity} class="quantity-cart" /></td>
        <td>${cart.total}</td>
        <td><button type="button" class="delete-item" onclick="deleteItem(${index})">Xóa</button></td>
      </tr>
      `;
    })
    .join("");

  var tableCart = `<table cellpadding="0" cellspacing="0" width="100%" border="1">
          <thead>
            <tr>
              <th width="5%">STT</th>
              <th>Tên sản phẩm</th>
              <th width="20%">Giá</th>
              <th width="20%">Số lượng</th>
              <th width="20%">Thành tiền</th>
              <th width="5%">Xoá</th>
            </tr>
          </thead>
          <tbody>
            ${cartElItem}
            <tr>
              <td colspan="3">Tổng</td>
              <td>
                ${carts.reduce(function (totalQuantity, cart) {
                  return totalQuantity + cart.quantity;
                }, 0)}
              </td>
              <td colspan="2">
                ${carts.reduce(function (totalPrice, cart) {
                  return totalPrice + cart.total;
                }, 0)}
              </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <button type="button" id="update-cart" onclick="updateCart()">Cập nhật giỏ hàng</button>
        <button type="button" id="delete-cart" onclick="deleteCart()">Xóa giỏ hàng</button>
    `;

  cartEl.innerHTML = tableCart;
};
renderCart();

// Xóa item trong cart
function deleteItem(index) {
  if (confirm("Are you sure?")) {
    alert("Xóa sản phẩm thành công");
    carts.splice(index, 1);
    for (var i = index; i < carts.length; i++) {
      carts[i].id--;
    }
    renderCart();
  }
}

// Update cart
function updateCart() {
  alert("Cập nhật giỏ hàng thành công");
  var quantityCart = document.querySelectorAll(".quantity-cart");
  carts.forEach(function (cart, index) {
    if (+quantityCart[index].value > 0) {
      cart.quantity = +quantityCart[index].value;
      cart.total = cart.price * quantityCart[index].value;
    } else {
      // Nếu input < 0 thì xóa item
      carts.splice(index, 1);
      for (var i = index; i < carts.length; i++) {
        carts[i].id--;
      }
    }
  });
  renderCart();
}

// Delete cart
function deleteCart() {
  if (confirm("Are you sure?")) {
    alert("Xóa giỏ hàng thành công");
    carts = [];
    renderCart();
  }
}
