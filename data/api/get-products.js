import { HEADERS_AUTHORIZATION, URL } from "../../assets/const.js";
import Product from "../models/product.model.js";

const _getProductsAPI = async function () {
  const resp = await fetch(URL, {
    headers: HEADERS_AUTHORIZATION,
  });

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
