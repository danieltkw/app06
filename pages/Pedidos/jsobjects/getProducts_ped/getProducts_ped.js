export default {
    async getProducts_ped() {
        try {
            const clientId = await getClientId();  // Ensure the correct function is referenced
            const products = await getProducts.run({ clientId }); // Fetch products

            if (!products || products.length === 0) {
                console.error('No products found for client ID:', clientId);
                return [];
            }

            const selectedStatus = appsmith.store.sel_status || 'default_status'; // Fetch status from Appsmith store

            let filteredProducts = products.filter(product => product.status === selectedStatus);

            // Map the filtered products for UI display
            return filteredProducts.map(product => ({
                ProductID: product.product_id,
                Name: product.name,
                Category: product.category,
                Price: product.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),  // Format as EUR currency
                Status: product.status
            }));

        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
};


// ------------------------------------------------------------
// This file fetches and filters products based on the selected status 
// and returns them for display.
// File name: getProducts.js
// ------------------------------------------------------------
