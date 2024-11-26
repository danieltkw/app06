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

                showAlert('Produto removido!', 'success');

                // Refresh cart data and recalculate total
                await getCard.getCard(); // Refresh the cart table
                await calculateTotalValue.calculateTotalValue(); // Update the total value
            } catch (error) {
                console.error('Error removing product from cart:', error);
                showAlert('Erro em remover o produto', 'error');
            }
        } else {
            showAlert('Selecione um produto', 'error');
        }
    },

    // Clear the entire cart
    async clearCart() {
        try {
            console.log('Clearing cart for client:', appsmith.store.clientId);

            await clearCart.run({  // Reference the correct query name
                vat_number: appsmith.store.clientId,
            });

            showAlert('Carrinho esvaziado!', 'success');

            // Refresh cart data and reset total
            await getCard.getCard(); // Refresh the cart table
            await calculateTotalValue.calculateTotalValue(); // Update the total value
        } catch (error) {
            console.error('Error clearing cart:', error);
            showAlert('Falha em limpar carrinho', 'error');
        }
    }
};

// ------------------------------------------------------------
// removeProductFromCart.js - Handles removing a selected product from the cart.
// clearCart.js - Handles clearing the entire cart for the user.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


