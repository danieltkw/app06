export default {
    async addToCart() {
        try {
            const selectedProduct = Table_products.selectedRow; // Get selected row from the product table

            // Check if the selected product is valid and has a valid `product_id`
            if (!selectedProduct || !selectedProduct.product_id || isNaN(selectedProduct.product_id)) {
                showAlert("O produto selecionado não possui um ID válido.", "error");
                console.error("Invalid product ID:", selectedProduct);
                return;
            }

            console.log("Selected Product:", selectedProduct);

            // Sanitize the price by removing symbols, commas, and formatting
            const sanitizedPrice = parseFloat(
                (selectedProduct.price || "0")
                    .toString()
                    .replace(/[€$,]/g, "")
                    .replace(",", ".")
            );

            if (isNaN(sanitizedPrice) || sanitizedPrice <= 0) {
                showAlert("O preço do produto selecionado é inválido.", "error");
                console.error("Invalid product price:", selectedProduct.price);
                return;
            }

            console.log("Sanitized Price:", sanitizedPrice);

            // Store sanitized price and other variables as a key-value pair in Appsmith store
            await storeValue("sanitizedPrice", sanitizedPrice);
            await storeValue("productID", selectedProduct.product_id);
            await storeValue("productName", selectedProduct.name);

            // Run the query to insert the product into the cart
            await insertCartQuery.run();

            // Show success alert
            showAlert("Produto adicionado ao carrinho com sucesso!", "success");

            // Refresh the cart to show the updated data
            await getCardQuery.run({ vat_number: appsmith.store.clientId });
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
            showAlert("Erro ao adicionar produto ao carrinho.", "error");
        }
    }
};

// ------------------------------------------------------------
// addToCart.js - Handles adding a product to the cart, sanitizing price, and refreshing the cart.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


















