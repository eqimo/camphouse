const savedCart = localStorage.getItem("cart");
const rentalInfos = JSON.parse(savedCart);
if (Array.isArray(rentalInfos)) {
  let rentalInfoHtml = "";

  for (let i = 0; i < rentalInfos.length; i++) {
    const rentalInfo = rentalInfos[i];
    if (rentalInfo !== null) {
      // Check if the element is not null
      const rentalInfoId =
        rentalInfo.name +
        " " +
        rentalInfo.quantity +
        " " +
        "ცალი" +
        " " +
        rentalInfo.price +
        "ლარი/დღეში";
      rentalInfoHtml += JSON.stringify(rentalInfoId) + "<br>";
    }
  }

  document.getElementById("rentalInfo").innerHTML = rentalInfoHtml;
} else {
  document.getElementById("rentalInfo").innerHTML =
    "კალათაში ინვენტარი არ არის ჩაყრილი, გაგადი აღჭურვილობის გვრძე და აირჩიე სასურველი პროდუქცია.";
}

function deleteLocalStorage() {
  localStorage.removeItem("cart");
  location.reload();
}
