export default {
    async getProducts() {
        let products = [];
        try {
            const result = await getProductsQuery.run(); // Fetch products using the query defined above
            products = result.map(p => {
                return {
                    Product_ID: p.product_id, 
                    Name: p.name,
                    SKU: p.sku,
                    Category: p.category || 'N/A',
                    Price: p.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
                    Stock: p.total_stock
                };
            });
            Table_products.setData(products); // Use setData to populate the table widget
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
};

// ------------------------------------------------------------
// This file fetches products from the database and populates the table with product data.
// File name: getProducts.js
// ------------------------------------------------------------
