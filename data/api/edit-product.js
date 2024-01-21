import { HEADERS_AUTHORIZATION_POST, URL } from "../../assets/const.js";

const _editProductAPI = async function (product, id) {
  const resp = await fetch(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: HEADERS_AUTHORIZATION_POST,
  });

  return resp.json();
};
export const editProductAPI = async function (product, id) {
  const resp = await _editProductAPI(product, id);
  return resp;
};
