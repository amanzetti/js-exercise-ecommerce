import { createProductAPI } from "../data/api/create-product.js";
import { createProduct } from "../utils/create-product.js";

const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  console.log("test");
  e.preventDefault();
  createProductAPI(createProduct());
});
