import { HEADERS_AUTHORIZATION, URL, HEADERS_AUTHORIZATION_POST } from "./const.js";

const form = document.getElementById("product-form");
const newName = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const img = document.getElementById("img");
const price = document.getElementById("price");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDA5MzE4N2U1YzAwMTgxNGM2MWYiLCJpYXQiOjE3MDU2NjIyMTQsImV4cCI6MTcwNjg3MTgxNH0.FA8KAYmJ9TzN___iR9LYQx16Xl9nB7ASL-rMDShwx9o";

const edit = function () {
  const newProduct = {
    name: newName.value,
    description: description.value,
    brand: brand.value,
    imageUrl: img.value,
    price: price.value,
  };

  if (canBeAddProduct(newProduct.name)) {
    console.log(canBeAddProduct("boolean", newProduct.name));
    addProduct(newProduct);
  } else {
    alert("Product already exists");
  }
};

const addProduct = function (product) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: HEADERS_AUTHORIZATION_POST,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log("edit date", data);
    })
    .catch((error) => {
      console.log("edit err", error);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  edit();
});

let listProducts = [];

const getProducts = function () {
  return fetch(URL, {
    headers: HEADERS_AUTHORIZATION,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error("Something went wrong");
      }
    })
    .then((products) => {
      products.forEach((el) => {
        return listProducts.push(el.name);
      });
    })
    .catch((error) => {
      console.log("get err", error);
    });
};

getProducts().then(() => console.log("listProducts", listProducts));

const canBeAddProduct = function (name) {
  return listProducts.includes(name) ? false : true;
};
