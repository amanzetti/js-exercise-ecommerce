export const createProduct = function () {
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const brand = document.getElementById("brand");
    const img = document.getElementById("img");
    const price = document.getElementById("price");
  
    return {
      name: name.value,
      description: description.value,
      brand: brand.value,
      imageUrl: img.value,
      price: price.value,
    };
  };