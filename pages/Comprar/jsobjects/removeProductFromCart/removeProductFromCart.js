export default {
    // Remove a single product from the cart
    async removeProductFromCart() {
        const selectedProduct = table_scard.selectedRow;  // Get selected row from the cart table
        if (selectedProduct && selectedProduct.product_id) {
            try {
                console.log('Removing Product ID:', selectedProduct.product_id);  // Log the product ID being removed

                await removeProduct.run({  // Reference the correct query name
                    vat_number: appsmith.store.clientId,
                    product_id: selectedProduct.product_id,
                });

                showAlert('Product removed from cart successfully!', 'success');
                await getCardQuery.run({ vat_number: appsmith.store.clientId });  // Refresh cart
            } catch (error) {
                console.error('Error removing product from cart:', error);
                showAlert('Failed to remove product from cart.', 'error');
            }
        } else {
            showAlert('Please select a product to remove from cart.', 'error');
        }
    },

    // Clear the entire cart
    async clearCart() {
        try {
            console.log('Clearing cart for client:', appsmith.store.clientId);

            await clearCart.run({  // Reference the correct query name
                vat_number: appsmith.store.clientId,
            });

            showAlert('Cart cleared successfully!', 'success');
            await getCardQuery.run({ vat_number: appsmith.store.clientId });  // Refresh cart
        } catch (error) {
            console.error('Error clearing cart:', error);
            showAlert('Failed to clear cart.', 'error');
        }
    }
};

// ------------------------------------------------------------
// removeProductFromCart.js - Handles removing a selected product from the cart.
// clearCart.js - Handles clearing the entire cart for the user.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

