export default {
    async calculateTotalValue() {
        try {
            // Fetch the cart data from the `getCardQuery` response
            const cartData = getCardQuery.data;

            if (cartData && Array.isArray(cartData)) {
                // Calculate the total value by summing the price * quantity for each item
                const totalValue = cartData.reduce((sum, item) => {
                    return sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
                }, 0);

                console.log("Calculated Total Value:", totalValue);

                // Store the total value in Appsmith store
                await storeValue("totalValue", totalValue);
            } else {
                console.error("Cart data is invalid or empty.");
                await storeValue("totalValue", 0);
            }
        } catch (error) {
            console.error("Error calculating total value:", error);
            await storeValue("totalValue", 0);
        }
    },
};
// calculateTotalValue.js
