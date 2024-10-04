export default {
    async addToCart() {
        const selectedProduct = Table_products.selectedRow;
        if (selectedProduct) {
            let cart = appsmith.store.cart || []; // Retrieve existing cart or start with an empty array
            cart.push({
                Product_ID: selectedProduct.Product_ID,
                Name: selectedProduct.Name,
                Price: selectedProduct.Price,
                Quantity: 1 // Default quantity
            });

            storeValue('cart', cart); // Store updated cart in Appsmith store
            showAlert('Product added to cart successfully!', 'success');
        } else {
            showAlert('Please select a product to add to the cart.', 'error');
        }
    }
};

// ------------------------------------------------------------
// This file adds a selected product to the cart and stores it in the Appsmith store.
// File name: addToCart.js
// ------------------------------------------------------------
