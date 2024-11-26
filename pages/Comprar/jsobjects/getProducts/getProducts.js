export default {
    async getProducts() {
        try {
            const result = await getProductsQuery.run(); // Fetch product data

            const products = result.map((p) => ({

                Valor: parseFloat(p.price || 0).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }), // Formatted price for display
                Nome: p.name,
                SKU: p.sku,
                Categoria: p.category || "N/A",
                Stock: p.total_stock,
							 	PriceRaw: parseFloat(p.price || 0), // Raw price as float
								ID: p.product_id,
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



