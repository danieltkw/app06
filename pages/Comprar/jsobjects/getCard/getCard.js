export default {
    async getCard() {
        try {
            const clientId = await client_id_c.getClientId();  // Fetch clientId (vat_number)
            if (clientId) {
                const cartData = await getCardQuery.run({ vat_number: clientId });  // Fetch cart data using clientId
                table_scard.setData(cartData);  // Populate cart table with data
            } else {
                showAlert('Unable to fetch cart. No valid clientId found.', 'error');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            showAlert('Error fetching cart data.', 'error');
        }
    }
};

// ------------------------------------------------------------
// getCard.js - Fetches user's cart data and displays it in cart table.
// Uses clientId (vat_number) consistently across the app.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

