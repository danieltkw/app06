export default {
    // Fetch client orders and filter by date range using dat_to and dat_from
    getClientOrders: async function() {
        try {
            const clientId = await this.getClientId();  // Ensure client ID is fetched
            const orders = await getOrders.run({ clientId }); // Fetch actual orders from the DB using clientId

            console.log("Fetched Orders: ", orders);

            if (!orders || orders.length === 0) {
                console.error('No orders found for client ID:', clientId);
                return [];
            }

            const fromDate = dat_from.selectedDate || null;
            const toDate = dat_to.selectedDate || null;

            let filteredOrders = orders;

            // Filter by date if range provided
            if (fromDate && toDate) {
                const from = new Date(fromDate).setHours(0, 0, 0, 0);
                const to = new Date(toDate).setHours(23, 59, 59, 999);
                filteredOrders = orders.filter(order => {
                    const orderDate = new Date(order.created).getTime();
                    return orderDate >= from && orderDate <= to;
                });
            }

            // Filter by status if selected
            if (appsmith.store.sel_status) {  // Fix for undefined sel_status
                filteredOrders = filteredOrders.filter(order => order.delivery_status === appsmith.store.sel_status);
            }

            // Map the filtered orders to display them in the table
            return filteredOrders.map(order => ({
                OrderID: this.idConverter(order.order_id), // Use idConverter for formatting
                ShippingAddress: order.shipping_address,
                Status: order.delivery_status,
                TotalAmount: order.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),  // Format as EUR currency
                OrderedDate: new Date(order.created).toLocaleDateString('pt-PT'), // Format the date in Portuguese locale
            })).sort((a, b) => a.OrderID - b.OrderID);

        } catch (error) {
            console.error('Error fetching client orders:', error);
            return [];
        }
    },

    // Get the client ID (vat_number)
    async getClientId() {
        if (appsmith.store.clientId) {
            return appsmith.store.clientId;
        } else {
            console.error('Client ID not found in store.');
            return 'defaultClientId';  // Return a default client ID if none is found
        }
    },

    // Reset Filters for dat_to, dat_from, and status filter
    handleResetFilter: async function() {
        resetWidget('sel_status');  // Reset status filter
        resetWidget('dat_to');      // Reset date "to"
        resetWidget('dat_from');    // Reset date "from"
        await this.getClientOrders(); // Re-fetch orders with no filters
    },

    // Function to set status filter
    setStatusFilter: function(status) {
        storeValue('sel_status', status);  // Store the selected status in appsmith store
        this.getClientOrders();  // Re-fetch orders based on the new status
    },

    // Handle resetting via icon click (icn_resetReturns)
    async handleResetReturns() {
        this.handleResetFilter(); // Reset filters when the reset icon is clicked
        showAlert('Filters have been reset.', 'success'); // Show confirmation
    },

    // Convert order IDs (optional)
    idConverter: (num) => {
        if (!num) {
            return '';
        }
        let str = num.toString();
        let leadingZeros = "00000".substring(0, 5 - str.length);
        return 'O' + leadingZeros + str; // Example formatting for order ID
    }
};

// ------------------------------------------------------------
// This file manages filter resetting, fetching orders by date range, 
// and filtering by status.
// File name: filters.js
// ------------------------------------------------------------

