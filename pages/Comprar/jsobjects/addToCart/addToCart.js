export default {
    async addToCart() {
        const selectedProduct = Table_products.selectedRow;  // Get selected row from the product table

        // Log the entire selected row to check its contents
        console.log('Selected Product Row:', selectedProduct);

        if (selectedProduct && selectedProduct.product_id) {  // Ensure the selected product has a valid product_id
            try {
                console.log('Product ID:', selectedProduct.product_id);  // Log the product ID being added
                console.log('Product Name:', selectedProduct.name);  // Log the product name
                console.log('Price:', selectedProduct.price);  // Log the price of the selected product

                // Fetch the current cart data
                const clientId = appsmith.store.clientId;
                const currentCart = await getCardQuery.run({ vat_number: clientId });

                // Check if product already exists in the cart
                const existingProduct = currentCart.find(item => item.product_id === selectedProduct.product_id);

                if (existingProduct) {
                    // If the product exists, update the quantity
                    storeValue("newQuantity", existingProduct.quantity + 1);

                    await updateCartQuantityQuery.run();

                    console.log('Updated quantity for product ID:', selectedProduct.product_id, 'New Quantity:', appsmith.store.newQuantity);
                    showAlert('Product quantity updated in cart successfully!', 'success');
                } else {
                    // If the product does not exist, insert it
                    await insertCartQuery.run();

                    console.log('Inserted new product into cart:', selectedProduct.name);
                    showAlert('Product added to cart successfully!', 'success');
                }

                // Refresh the cart after adding/updating a product
                await getCard();  // Make sure the function getCard() is available and imported properly

            } catch (error) {
                console.error('Error adding/updating product to cart:', error);
                showAlert('Failed to add/update product to cart.', 'error');
            }
        } else {
            showAlert('Please select a valid product before adding to cart.', 'error');
            console.log('No valid product selected or product_id is null.');
        }
    }
};

// ------------------------------------------------------------
// addToCart.js - Updated to handle duplicate products by incrementing quantity.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------







