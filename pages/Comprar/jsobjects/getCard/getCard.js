export default {
    async getCard() {
        try {
            const clientId = await client_id_c.getClientId();  // Fetch clientId (vat_number)
            console.log('Fetched clientId:', clientId);  // Log the clientId
            if (clientId) {
                const cartData = await getCardQuery.run({ vat_number: clientId });  // Fetch cart data using clientId
                console.log('Cart data:', cartData);  // Log the fetched cart data for debugging
                table_scard.setData(cartData);  // Populate cart table with data
                
                // Calculate total number of items in the cart and store it
                const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
                storeValue('totalItems', totalItems);  // Store the total number of items in appsmith store
                console.log('Total items in cart:', totalItems);
                
                console.log('Cart updated in UI');
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
// getCard.js - Fetches user's cart data, displays it in cart table, and stores total number of items.
// Uses clientId (vat_number) consistently across the app.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


