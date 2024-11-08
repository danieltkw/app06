export default {
    async addToCart() {
        const selectedProduct = Table_products.selectedRow;  // Get selected row from the product table

        if (selectedProduct && selectedProduct.product_id) {  // Ensure the selected product has a valid product_id
            try {
                console.log('Selected Product Row:', selectedProduct);

                // Sanitize the price by removing any currency symbols and commas
                const sanitizedPrice = parseFloat(selectedProduct.price.replace(/[€$,]/g, '').replace(',', '.'));

                if (isNaN(sanitizedPrice)) {
                    throw new Error('Invalid price value');
                }

                console.log('Sanitized Price:', sanitizedPrice); // Log the sanitized price

                // Store sanitized price as a variable in Appsmith's store for SQL to use
                storeValue("sanitizedPrice", sanitizedPrice);

                // Run insertCartQuery after setting the sanitized price in Appsmith store
                await insertCartQuery.run();

                showAlert('Product added to cart successfully!', 'success');
                
                // Refresh the cart to show updated data
                await getCardQuery.run({ vat_number: appsmith.store.clientId });

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
// addToCart.js - Sanitizes product price by removing symbols and storing it in Appsmith store for SQL.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------













