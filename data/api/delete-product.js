import { HEADERS_AUTHORIZATION_POST, URL } from "../../assets/const.js";

const _deleteProductByIdAPI = async function (id) {
  const resp = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: HEADERS_AUTHORIZATION_POST,
  });

  return resp.json();
};

export const deleteProductByIdAPI = async function (id) {
    const resp = await _deleteProductByIdAPI(id);

    return resp;
};
