export default {
    async addToCart() {
        const selectedProduct = Table_products.selectedRow;

        if (selectedProduct && selectedProduct.Product_ID) {
            try {
                console.log('Selected Product:', selectedProduct);  // Log the selected product data

                // Insert the selected product into the cart using vat_number
                await insertCartQuery.run({
                    vat_number: appsmith.store.clientId,  // Using clientId which is vat_number
                    product_id: selectedProduct.Product_ID,
                    product_name: selectedProduct.Name,
                    quantity: 1,
                    price: selectedProduct.Price
                });

                console.log('Product ID:', selectedProduct.Product_ID);  // Log the product_id being inserted
                console.log('Product Name:', selectedProduct.Name);  // Log the product name
                console.log('Price:', selectedProduct.Price);  // Log the price
                showAlert('Product added to cart successfully!', 'success');
            } catch (error) {
                console.error('Error adding product to cart:', error);
                showAlert('Failed to add product to cart.', 'error');
            }
        } else {
            showAlert('Please select a valid product before adding to cart.', 'error');
            console.log('No valid product selected or product_id is null.');
        }
    }
};

// ------------------------------------------------------------
// addToCart.js - Logs for debugging product data being passed to the cart
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
