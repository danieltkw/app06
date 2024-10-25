export default {
    // Setting the default tab to 'Produtos'
    defaultTab: 'Produtos',

    // Initialize function to set the default tab on page load
    initialize() {
        console.log('Initializing default tab as Produtos');
        this.setDefaultTab('Produtos');
    },

    // Function to set default tab and handle tab switch
    setDefaultTab(newTab) {
        if (newTab === 'Produtos' || newTab === 'Carrinho') {
            this.defaultTab = newTab;
            if (newTab === 'Carrinho') {
                // Refresh cart data when switching to 'Carrinho' tab
                this.refreshCart();
            }
        } else {
            console.error('Invalid tab name:', newTab);
        }
    },

    // Refresh cart when switching to the cart tab
    async refreshCart() {
        try {
            console.log('Refreshing cart data');
            const clientId = appsmith.store.clientId;
            const cartData = await getCardQuery.run({ vat_number: clientId });
            table_scard.setData(cartData);
        } catch (error) {
            console.error('Error refreshing cart:', error);
            showAlert('Failed to refresh cart data.', 'error');
        }
    }
};

// ------------------------------------------------------------
// tabs_control.js - Manages tab switching and ensures the cart is updated when accessed
// Functions:
// - initialize: Sets the default tab to 'Produtos'.
// - setDefaultTab: Handles tab switching between 'Produtos' and 'Carrinho'.
// - refreshCart: Fetches the updated cart data when switching to 'Carrinho'.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
