export default {
    async getCard() {
        try {
            const cartData = await getCardQuery.run(); // Fetch cart data from the DB
            table_scard.setData(cartData); // Populate the cart table (table_scard) with data
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }
};

// ------------------------------------------------------------
// This file fetches the user's cart data and displays it in the cart table.
// File name: getCard.js
// ------------------------------------------------------------
