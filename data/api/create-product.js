import { HEADERS_AUTHORIZATION_POST, URL } from "../../assets/const.js";


const _createProductAPI = async function (product) { 
  console.log(product);
  const resp = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(product),
    headers: HEADERS_AUTHORIZATION_POST,
  })
  
  return resp.json();
}
 export const createProductAPI = async function (product) {
   const resp = await _createProductAPI(product);
   return resp;
 }

