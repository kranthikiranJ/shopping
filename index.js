async function list() {
    try {
      let response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
      );
      let result = await response.json();
      let { categories } = result;
  
      return categories;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
  
function calculateDiscountPercentage(price, compareAtPrice) {
    if (compareAtPrice && compareAtPrice > price) {
      return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
    }
    return 0;
}
 
function showCategory(categoryName) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
  
    list().then((categories) => {
      const selectedCategory = categories.find(
        (category) => category.category_name === categoryName
      );
  
      if (selectedCategory) {
        selectedCategory.category_products.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.classList.add("product");
  
          const discountPercentage = calculateDiscountPercentage(
            product.price,
            product.compare_at_price
          );
  
          productElement.innerHTML = `
                      <div class="product-image-container">
                          <img src="${product.image}" alt="${product.title}">
                          ${
                            product.badge_text !== null &&
                            product.badge_text !== ""
                              ? `<span class="badge">${product.badge_text}</span>`
                              : ""
                          }
                      </div>
                      <div class="product-details">
                          <div class='wrap-titles'>
                          <h3>${product.title}</h3>
                          <p>${product.vendor}</p>
                          </div>
                          <div class='wrap-titles'>
                          <p>Rs ${product.price}</p>
                          ${
                            product.compare_at_price
                              ? `<p class='compare-price'>${product.compare_at_price}</p>`
                              : ""
                          }
                          ${
                            discountPercentage > 0
                              ? `<p class='discount'>${discountPercentage}% Off</p>`
                              : ""
                          }
                          </div>
                          <button class="add-to-cart-btn">Add to Cart</button>
                      </div>
                  `;
  
          container.appendChild(productElement);
        });
      }
    });
}
  
showCategory("Men");
  