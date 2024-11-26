export default {
    async addToCart() {
        try {
            const selectedProduct = Table_products.selectedRow;

            // Get product ID and ensure it is a valid integer
            const productId = parseInt(
                selectedProduct?.product_id || 
                selectedProduct?.Product_ID || 
                selectedProduct?.ID, 
                10
            );
            if (isNaN(productId) || productId <= 0) {
                showAlert("O produto selecionado não possui um ID válido.", "error");
                console.error("Invalid product ID:", productId);
                return;
            }

            // Get price and ensure it is a valid float
            const sanitizedPrice = parseFloat(
                (selectedProduct.price || 
                selectedProduct.PriceRaw || 
                selectedProduct.Valor || 
                "0")
                    .toString()
                    .replace(/[€$,]/g, "")
                    .replace(",", ".")
            );
            if (isNaN(sanitizedPrice) || sanitizedPrice <= 0) {
                showAlert("O preço do produto selecionado é inválido.", "error");
                console.error("Invalid product price:", sanitizedPrice);
                return;
            }

            // Get product name and ensure it is not empty
            const productName = selectedProduct.name || 
                                selectedProduct.Nome || 
                                selectedProduct.Product_Name || 
                                "Unknown Product";
            if (!productName) {
                showAlert("O nome do produto está vazio.", "error");
                console.error("Invalid product name:", productName);
                return;
            }

            // Get VAT number and ensure it exists
            const vatNumber = appsmith.store.clientId;
            if (!vatNumber) {
                showAlert("Erro: Nenhum cliente selecionado.", "error");
                console.error("VAT number is missing");
                return;
            }

            // Log debug information
            console.log("Executing insertCartQuery with values:", {
                vat_number: vatNumber,
                product_id: productId,
                product_name: productName,
                quantity: 1,
                price: sanitizedPrice,
            });

            // Store values in Appsmith store
            await storeValue("sanitizedPrice", sanitizedPrice);
            await storeValue("productID", productId);
            await storeValue("productName", productName);

            // Execute the query
            await insertCartQuery.run();

            // Show success alert
            showAlert("Produto adicionado ao carrinho com sucesso!", "success");

            // Refresh cart data
            await getCard.getCard();

            // Calculate total value
            await calculateTotalValue.calculateTotalValue();
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
            if (error?.message) {
                console.error("SQL Error:", error.message);
            }
            showAlert("Erro ao adicionar produto ao carrinho.", "error");
        }
    }
};

// addToCart.js























