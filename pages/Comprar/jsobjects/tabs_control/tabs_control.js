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
                // Refresh cart data and recalculate total value when switching to 'Carrinho' tab
                this.refreshCartAndCalculateTotal();
            }
        } else {
            console.error('Invalid tab name:', newTab);
        }
    },

    // Refresh cart and calculate total value when switching to the cart tab
    async refreshCartAndCalculateTotal() {
        try {
            console.log('Refreshing cart data and recalculating total value');
            const clientId = appsmith.store.clientId;

            // Fetch the updated cart data
            const cartData = await getCardQuery.run({ vat_number: clientId });
            table_scard.setData(cartData);

            // Calculate the total value
            await calculateTotalValue.calculateTotalValue();
        } catch (error) {
            console.error('Error refreshing cart and calculating total:', error);
            showAlert('Falhou em atualizar os valores', 'error');
        }
    }
};

// ------------------------------------------------------------
// tabs_control.js - Manages tab switching and ensures the cart is updated when accessed
// Functions:
// - initialize: Sets the default tab to 'Produtos'.
// - setDefaultTab: Handles tab switching between 'Produtos' and 'Carrinho'.
// - refreshCartAndCalculateTotal: Fetches updated cart data and recalculates the total value when switching to 'Carrinho'.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

