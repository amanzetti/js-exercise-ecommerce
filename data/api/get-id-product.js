import { HEADERS_AUTHORIZATION, URL } from "../../assets/const.js";
import Product from "../models/product.model.js";

const _getIdProductAPI = async function (id) {
  const resp = await fetch(`${URL}/${id}`, {
    headers: HEADERS_AUTHORIZATION,
  });

  return resp.json();
};

export const getIdProductAPI = async function (id) {

    const _product = Product.fromJson(await _getIdProductAPI(id));
    
    return _product;
};
