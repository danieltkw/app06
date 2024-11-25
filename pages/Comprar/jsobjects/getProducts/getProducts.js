export default {
    async getProducts() {
        try {
            const result = await getProductsQuery.run(); // Fetch product data

            const products = result.map((p) => ({
                Product_ID: p.product_id,
                Name: p.name,
                SKU: p.sku,
                Category: p.category || "N/A",
                PriceRaw: parseFloat(p.price || 0), // Raw price as float
                Price: parseFloat(p.price || 0).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }), // Formatted price for display
                Stock: p.total_stock,
            }));

            Table_products.setData(products); // Set product table data
        } catch (error) {
            console.error("Error fetching products:", error);
            showAlert("Erro ao buscar produtos.", "error");
        }
    }
};

// ------------------------------------------------------------
// getProducts.js - Fetches and formats product data.
// ------------------------------------------------------------


