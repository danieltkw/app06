export default {
    // Function to fetch top ordered products
    async topOrderedProductsChart() {
        const clientId = await client_id.getClientId(); // Ensure VAT (clientId) is fetched
        console.log('Fetching top products for clientId:', clientId);

        const orderedProductsCount = await getOrderProductCount.run({ clientId });
        console.log('Fetched ordered products:', orderedProductsCount);

        return orderedProductsCount.map(p => {
            return {
                x: String(p.name), // Ensure the name is a string
                y: p.variant_count, // Ensure this is a number or appropriate value
            };
        });
    }
};

// ------------------------------------------------------------
// top_ordered_products.js - Fetches top ordered products for the client
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
