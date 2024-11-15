export default {
    async dashboardMetrics() {
        try {
            const clientId = await client_id.getClientId();
            const orders = await getOrders.run({ clientId });
            console.log('Orders fetched:', orders);

            const allOrders = orders.length;
            const fulfilledOrders = orders.filter(o => o.delivery_status === 'Delivered').length;
            const cancelledOrders = orders.filter(o => o.delivery_status === 'Cancelled').length;
            const shippedOrders = orders.filter(o => o.delivery_status === 'Shipped').length;
            const packedOrders = orders.filter(o => o.delivery_status === 'Packed').length;
            const unfulfilledOrders = orders.filter(o => o.delivery_status === 'Unfulfilled').length;

            console.log('Metrics calculated:', {
                totalOrders: allOrders,
                fulfilledOrders,
                cancelledOrders,
                shippedOrders,
                packedOrders,
                unfulfilledOrders,
            });

            return {
                totalOrders: allOrders,
                fulfilledOrders,
                cancelledOrders,
                shippedOrders,
                packedOrders,
                unfulfilledOrders,
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
            };
        }
    }
};

// ------------------------------------------------------------
// dashboard_metrics.js - Fetching and calculating dashboard metrics with additional logging
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

