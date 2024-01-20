const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDA5MzE4N2U1YzAwMTgxNGM2MWYiLCJpYXQiOjE3MDU2NjIyMTQsImV4cCI6MTcwNjg3MTgxNH0.FA8KAYmJ9TzN___iR9LYQx16Xl9nB7ASL-rMDShwx9o";
const url = "https://striveschool-api.herokuapp.com/api/product/";

let road = new URL(document.location).searchParams;
let productID = road.get("productID");
console.log(productID);

const addCard = function (imageUrl, nome, brand, description, prezzo) {
  const row = document.getElementById("products-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-5", "border", "p-3");
  card.classList.add("card", "mb-4", "shadow-sm");
  row.appendChild(newCol);
  newCol.appendChild(card);
  card.innerHTML = `
        <img
        src="${imageUrl}"
        class="bd-placeholder-img card-img-top"/>
      <div class="card-body">
      <h3>${nome}</h3>
        <h5 class="card-title">${brand}</h5>
        <p class="card-text">${description}</p>
        </div>
          <small class="text-muted text-end me-2 pb-3  ">Prezzo - ${prezzo}€</small>
        </div>
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
      </div>`;
};

const fetchFunction = function () {
  fetch(url + "/" + productID, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((product) => {
      console.log(product);
      addCard(
        product.imageUrl,
        product.name,
        product.brand,
        product.description,
        product.price
      );
      createEditForm(product);
      deleteEvent(product);
    });
};

const addForm = function (product) {
  if (!product) {
    console.log(product);
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
        <input type="text" class="form-control" id="productname" value="${product.name}" required />
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
        <input type="text" class="form-control" id="imageSrc" value="${product.imageUrl}" required />
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

const createEditForm = function (product) {
  let index = 0;
  const button = document.getElementById("edit-button");
  button.addEventListener("click", (e) => {
    if (index === 0) {
      e.preventDefault();

      addForm(product);

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

      const productName = document.getElementById("productname").value;
      const description = document.getElementById("description").value;
      const brand = document.getElementById("brand").value;
      const img = document.getElementById("imageSrc").value;
      const price = document.getElementById("price").value;

      const newProduct = {
        name: productName,
        description: description,
        brand: brand,
        imageUrl: img,
        price: price,
      };

      editElementById(productID, newProduct);
    });
  } else {
    console.log("form not found");
  }
};

const editElementById = function (idProduct, product) {
  let uri = url + "/" + idProduct;
  let body = JSON.stringify(product);
  let headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  fetch(uri, {
    method: "PUT",
    body: body,
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => console.log(data));
        location.assign(`/details.html?productID=${productID}`);
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteEvent = function () {
  const button = document.getElementById("delete-button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    deleteElementById();
  });
};

const deleteElementById = function () {
  console.log("START DELETE");

  let uri = url + "/" + productID;
  console.log(uri);

  fetch(uri, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("cancellato!");
        location.assign("./index.html");
      } else {
        alert("problema nella cancellazione :(");
        throw new Error("errore nella cancellazione");
      }
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
};

fetchFunction();
