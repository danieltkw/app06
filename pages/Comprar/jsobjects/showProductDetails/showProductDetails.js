export default {
    async showProductDetails() {
        const selectedProduct = Table_products.selectedRow;
        if (selectedProduct) {
            try {
                await getProductDetailsQuery.run(); // Run the query to fetch product details
                showModal('mdl_productDetails'); // Show the product details modal after fetching
            } catch (error) {
                showAlert('Failed to fetch product details.', 'error');
            }
        } else {
            showAlert('Please select a product to view details.', 'info');
        }
    }
};

// ------------------------------------------------------------
// This file fetches the product details based on the selected product in the table
// and displays it in the product details modal.
// File name: showProductDetails.js
// ------------------------------------------------------------
