import { getProductsAPI } from "../data/api/get-products.js";

const cardComponet = (product, pushDetails) => {
  const row = document.getElementById("product-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-md-3");
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
        <small class="text-muted text-end me-2 pb-3">Prezzo - ${product.price}€</small>
        <div class="">
            <div class="btn-group d-flex justify-content-center mx-3 mb-3">
                <button
                    id="view-button"
                    type="button"
                    class="btn btn-info">
                    <a class="text-decoration-none text-white" href="${pushDetails}">
                        Anteprima</a>
                </button>   
            </div>
        </div>
    `;
};

const createProductCard = async () => {
  const listProducts = await getProductsAPI();

  if (listProducts && listProducts.length > 0) {
      listProducts.forEach((product) => {
        
        var queryString = Object.keys(product).map(function(key) {
            return key + '=' + encodeURIComponent(product[key]);
        }).join('&');
          
      const pushDetails = `./details.html?${queryString} `;
      cardComponet(product, pushDetails);
    });
  } else {
    console.log("No products found");
  }
};

createProductCard();
