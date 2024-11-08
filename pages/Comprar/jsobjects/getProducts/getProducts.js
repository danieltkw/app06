export default {
    async getProducts() {
        let products = [];
        try {
            const result = await getProductsQuery.run(); // Fetch products using the query defined above
            products = result.map(p => {
                return {
                    product_id: p.product_id, 
                    name: p.name,
                    SKU: p.sku,
                    category: p.category || 'N/A',
                    price: p.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
                    stock: p.total_stock
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
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
