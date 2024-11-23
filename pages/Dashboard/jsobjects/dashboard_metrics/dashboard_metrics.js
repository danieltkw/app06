export default {
    async dashboardMetrics() {
        try {
            const clientId = await client_id.getClientId(); // Fetch the client's ID
            const orders = await getOrders.run({ clientId }); // Fetch orders for the client
            console.log('Orders fetched:', orders);

            // Calculate total metrics
            const allOrders = orders.length;
            const fulfilledOrders = orders.filter(o => o.delivery_status === 'Delivered').length;
            const cancelledOrders = orders.filter(o => o.delivery_status === 'Cancelled').length;
            const shippedOrders = orders.filter(o => o.delivery_status === 'Shipped').length;
            const packedOrders = orders.filter(o => o.delivery_status === 'Packed').length;
            const unfulfilledOrders = orders.filter(o => o.delivery_status === 'Unfulfilled').length;

            // Calculate total order value
            const totalOrderValue = orders.reduce((acc, order) => acc + (parseFloat(order.total) || 0), 0); // Sum up order totals
            console.log('Total order value:', totalOrderValue);

            // Log calculated metrics
            console.log('Metrics calculated:', {
                totalOrders: allOrders,
                fulfilledOrders,
                cancelledOrders,
                shippedOrders,
                packedOrders,
                unfulfilledOrders,
                totalOrderValue,
            });

            return {
                totalOrders: allOrders,
                fulfilledOrders,
                cancelledOrders,
                shippedOrders,
                packedOrders,
                unfulfilledOrders,
                totalOrderValue, // Include total order value in the result
            };
        } catch (error) {
            console.error('Error in dashboardMetrics:', error);
            return {
                totalOrders: 0,
                fulfilledOrders: 0,
                cancelledOrders: 0,
                shippedOrders: 0,
                packedOrders: 0,
                unfulfilledOrders: 0,
                totalOrderValue: 0, // Ensure fallback to 0
            };
        }
    }
};

// ------------------------------------------------------------
// dashboard_metrics.js - Fetching and calculating dashboard metrics with total value
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


