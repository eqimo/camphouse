let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCart = document.querySelector(".listCart");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let GoToCheckOut = document.querySelector(".total");
let storedCart = localStorage.getItem("cart");
let storedCartArr = JSON.parse(storedCart);

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
GoToCheckOut.addEventListener("click", () => {
  window.location.href = "../rent/rent.html";
});

let products = [
  {
    id: 1,
    name: "წერაყინი",
    image: "axe.PNG",
    price: 10,
  },
  {
    id: 2,
    name: "mountainwarenhaus",
    image: "purpletent.PNG",
    price: 15,
  },
  {
    id: 3,
    name: "campz",
    image: "campztent.PNG",
    price: 20,
  },
  {
    id: 4,
    name: "qechua",
    image: "qechuatent.PNG",
    price: 15,
  },
  {
    id: 5,
    name: "საძილე",
    image: "sleepingbag.PNG",
    price: 8,
  },
  {
    id: 6,
    name: "ჩაფხუტი",
    image: "helmet.PNG",
    price: 5,
  },
];
let listCarts = [];
function initApp() {
  storedCartArr = JSON.parse(localStorage.getItem("cart")) || [];
  listCarts = storedCartArr;

  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} ლარი/დღე</div>
            <button onclick="addToCart(${key})">კალათაში დამატება</button>`;
    list.appendChild(newDiv);
  });
  reloadCart();
}
initApp();
function addToCart(key) {
  if (listCarts[key] == null) {
    listCarts[key] = JSON.parse(JSON.stringify(products[key]));
    listCarts[key].quantity = 1;
  }
  reloadCart();
}
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(listCarts));
}
function reloadCart() {
  saveCartToLocalStorage();
  listCart.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  // Filter out null values from listCarts
  listCarts = listCarts.filter((value) => value !== null);

  listCarts.forEach((value, key) => {
    totalPrice += value.price;
    count += value.quantity;

    let newDiv = document.createElement("li");
    newDiv.innerHTML = `
      <div><img src="${value.image}"/></div>
      <div>${value.name}</div>
      <div>${value.price.toLocaleString()}</div>
      <div>
        <button onclick="changeQuantity(${key}, ${
      value.quantity - 1
    })">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changeQuantity(${key}, ${
      value.quantity + 1
    })">+</button>
      </div>`;
    listCart.appendChild(newDiv);
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCarts[key];
  } else {
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price;
  }
  reloadCart();
}
