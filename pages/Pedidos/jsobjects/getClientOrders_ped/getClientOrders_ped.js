export default {
    async getClientOrders() {
        try {
            const clientId = await getClientId();  // Ensure the correct client ID is fetched
            const orders = await getOrders.run({ clientId }); // Fetch orders from DB

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
            if (appsmith.store.sel_status) {
                filteredOrders = filteredOrders.filter(order => order.delivery_status === appsmith.store.sel_status);
            }

            // Map the filtered orders for table display
            return filteredOrders.map(order => ({
                OrderID: idConverter(order.order_id), // Ensure idConverter is referenced correctly
                ShippingAddress: order.shipping_address,
                Status: order.delivery_status,
                TotalAmount: order.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),  // Format as EUR currency
                OrderedDate: new Date(order.created).toLocaleDateString('pt-PT') // Format the date
            })).sort((a, b) => a.OrderID - b.OrderID);

        } catch (error) {
            console.error('Error fetching client orders:', error);
            return [];
        }
    }
};


// ------------------------------------------------------------
// This file fetches client orders, applies filters by date and status, 
// and returns the filtered data for display.
// File name: getClientOrders.js
// ------------------------------------------------------------
