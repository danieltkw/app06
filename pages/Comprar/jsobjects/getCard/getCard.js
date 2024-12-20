export default {
    async getCard() {
        try {
            const clientId = appsmith.store.clientId; // Fetch clientId (vat_number)

            if (!clientId) {
                showAlert("Nenhum ID de cliente encontrado.", "error");
                return;
            }

            const cartData = await getCardQuery.run({ vat_number: clientId }); // Fetch cart data
            const productsData = getProductsQuery?.data || []; // Fallback if products data is not loaded

            if (!Array.isArray(productsData) || productsData.length === 0) {
                console.error("getProductsQuery.data is empty or invalid:", productsData);
                showAlert("Erro ao buscar produtos. Verifique os dados da tabela.", "error");
                return;
            }

            // Match cart items with product names
            const sanitizedCartData = cartData.map((item) => {
                const bestMatch = productsData.reduce((best, product) => {
                    const similarity = fuzzyMatch.fuzzyMatch(
                        item.product_name || "",
                        product.name || ""
                    );

                    return similarity > best.similarity
                        ? { product, similarity }
                        : best;
                }, { product: {}, similarity: 0 });

                return {
                    ...item,
                    ProductName: bestMatch.product.name || "Desconhecido",
                    PriceFormatted: parseFloat(item.price || 0).toLocaleString("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                    }),
                };
            });

            table_scard.setData(sanitizedCartData); // Update table with sanitized data

            console.log("Updated sanitized cart data:", sanitizedCartData);

            // Calculate total value
            await calculateTotalValue.calculateTotalValue(); // Update the total value
        } catch (error) {
            console.error("Erro ao buscar dados do carrinho:", error);
            showAlert("Erro ao buscar o carrinho.", "error");
        }
    }
};
// getCard.js















