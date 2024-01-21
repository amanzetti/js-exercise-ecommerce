import { HEADERS_AUTHORIZATION, URL } from "../../assets/const.js";
import Product from "../models/product.model.js";

const _getProductsAPI = async function () {
  let resp;
  
  try {
    resp = await fetch(URL, {
      headers: HEADERS_AUTHORIZATION,
    });
  } catch (error) {
    console.log(error);
  }

  return resp.json();
};

export const getProductsAPI = async function () {
  const listProducts = [];

  (await _getProductsAPI()).forEach((element) => {
    const _product = Product.fromJson(element);
    listProducts.push(_product);
  });

  return listProducts;
};
