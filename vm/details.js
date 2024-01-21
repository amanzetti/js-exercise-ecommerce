import { getQueryParams } from "../utils/get-query-params.js";
import { deleteProductByIdAPI } from "../data/api/delete-product.js";
import { editProductAPI } from "../data/api/edit-product.js";
import { createProduct } from "../utils/create-product.js";

var currentUrl = window.location.href;

var queryParams = getQueryParams(currentUrl);

const cardComponent = function (product) {
  const row = document.getElementById("products-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-5", "border", "p-3");
  card.classList.add("card", "mb-4", "shadow-sm");
  row.appendChild(newCol);
  newCol.appendChild(card);
  card.innerHTML = `
        <img
            src="${product.imageUrl}"
            onerror="this.onerror=null; 
            this.src='https://via.placeholder.com/300x200'" 
            class="bd-placeholder-img card-img-top"/>
        <div class="card-body">
            <h3>${product.name}</h3>
            <h5 class="card-title">${product.brand}</h5>
            <p class="card-text">${product.description}</p>
        </div>
        <small class="text-muted text-end me-2 pb-3  ">Prezzo - ${product.price}€</small>
        <div class="">
            <div class="d-flex justify-content-center mx-3 mb-3  ">
                <button           
                    id="edit-button"
                    type="button"
                    class="btn btn-warning">
                    Modifica
                </button> 
                <button          
                id="delete-button"
                    type="button"
                    class="btn btn-danger ms-3 ">
                    Elimina
                </button>      
            </div>     
        </div>`;
};

const editComponent = function (product) {
  if (!product) {
    product = {
      name: "",
      description: "",
      brand: "",
      imageUrl: "",
      price: "",
    };
  }

  const row = document.getElementById("products-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-5", "border", "p-3");
  card.classList.add("mb-4", "shadow-sm");
  row.appendChild(newCol);
  newCol.appendChild(card);
  card.innerHTML = `
      <form id="edit-form">
        <div class="mb-3">
          <label for="productname" class="form-label">Inserisci il Nome prodotto</label>
          <input type="text" class="form-control" id="name" value="${product.name}" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Inserisci la Descrizione dell'articolo</label>
          <input type="text" class="form-control" id="description" value="${product.description}" required />
        </div>
        <div class="mb-3">
          <label for="brand" class="form-label">Inserisci la marca dell'articolo</label>
          <input type="text" class="form-control" id="brand" value="${product.brand}" required />
        </div>
        <div class="mb-3">
          <label for="imageSrc" class="form-label">Inserisci la Sorgente dell'immagine ...jpeg,png</label>
          <input type="text" class="form-control" id="img" value="${product.imageUrl}" required />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Inserisci il prezzo dell'articolo</label>
          <input type="number" class="form-control" id="price" value="${product.price}" required />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Conferma</label>
        </div>
        <button type="submit" class="btn btn-primary">Salva</button>
      </form>`;
};

///Button event

const deleteEvent = function () {
  const button = document.getElementById("delete-button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    deleteProductByIdAPI(queryParams._id).then((resp) => {
      if (resp) {
        window.location.href = "../index.html";
      }
    });
  });
};

const createEditForm = function (product) {
  let index = 0;
  const button = document.getElementById("edit-button");
  button.addEventListener("click", (e) => {
    if (index === 0) {
      e.preventDefault();

      editComponent(product);

      saveEvent();

      index++;
    }
  });
};

const saveEvent = function () {
  const form = document.getElementById("edit-form");
  
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      editProductAPI(createProduct(), queryParams._id).then((resp) => {
        console.log("boh", resp);

        if (resp) {
          var queryString = Object.keys(resp)
            .map(function (key) {
              return key + "=" + encodeURIComponent(resp[key]);
            })
            .join("&");

          const pushDetails = `./details.html?${queryString} `;
          location.assign(pushDetails);
        }
      });
    });
  } else {
    console.log("form not found");
  }
};

cardComponent(queryParams);
deleteEvent();
createEditForm(queryParams);
