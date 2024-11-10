export default {
    async getCard() {
        try {
            const clientId = await client_id_c.getClientId();  // Fetch clientId (vat_number)
            console.log('Fetched clientId:', clientId);  // Log the clientId
            
            if (clientId) {
                const cartData = await getCardQuery.run({ vat_number: clientId });  // Fetch cart data using clientId
                console.log('Fetched cart data:', cartData);  // Log the fetched cart data for debugging
                
                // Check if cart data is empty or null
                if (!cartData || cartData.length === 0) {
                    console.warn('No cart data found for client:', clientId);
                }

                table_scard.setData(cartData);  // Populate cart table with data
                
                // Calculate and store total number of items in the cart
                const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
                storeValue('totalItems', totalItems);  // Store total number of items in Appsmith store
                console.log('Total items in cart:', totalItems);
                
                console.log('Cart data updated in UI.');
            } else {
                showAlert('Unable to fetch cart. No valid clientId found.', 'error');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            showAlert('Error fetching cart data.', 'error');
        }
    },

    // Initialize the cart on page load
    async initializeCartOnLoad() {
        console.log('Initializing cart data on page load...');
        await this.getCard();  // Automatically load the cart data
    }
};

// ------------------------------------------------------------
// getCard.js - Fetches user's cart data, displays it in cart table, and stores total number of items.
// Uses clientId (vat_number) consistently across the app. Adds auto-refresh for cart on page load.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------




