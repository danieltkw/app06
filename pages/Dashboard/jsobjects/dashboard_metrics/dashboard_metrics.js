export default {
    // Function to fetch and calculate dashboard metrics
    async dashboardMetrics() {
        const clientId = await client_id.getClientId(); // Ensures clientId (vat_number) is set correctly
        console.log('Fetching orders for clientId (vat_number):', clientId);

        const orders = await getOrders.run({ clientId }); // Fetch orders based on VAT (clientId)
        console.log('Fetched orders:', orders);

        // Calculate various metrics from the fetched orders
        const allOrders = orders.length;  // Total orders
        const fulfilledOrders = orders.filter(o => o.delivery_status === 'Delivered').length;  // Delivered orders
        const cancelledOrders = orders.filter(o => o.delivery_status === 'Cancelled').length;  // Cancelled orders
        const shippedOrders = orders.filter(o => o.delivery_status === 'Shipped').length;  // Shipped orders
        const packedOrders = orders.filter(o => o.delivery_status === 'Packed').length;  // Packed orders
        const totalOrderValue = orders.reduce((a, b) => a + b.total, 0);  // Sum of total order values
        const formattedOrderValueAmount = totalOrderValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3);

        return {
            clientId,
            allOrders,
            fulfilledOrders,
            cancelledOrders,
            shippedOrders,
            packedOrders,
            totalOrderValue: formattedOrderValueAmount,
        };
    }
};

// ------------------------------------------------------------
// dashboard_metrics.js - Fetches and calculates dashboard metrics
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
