export default {
    async dashboardMetrics() {
        // Add your logic to fetch the metrics and return the appropriate data
        const clientId = await client_id.getClientId();
        const orders = await getOrders.run({ clientId });
        
        // Calculate the various metrics
        const allOrders = orders.length;
        const fulfilledOrders = orders.filter(o => o.delivery_status === 'Delivered').length;
        const cancelledOrders = orders.filter(o => o.delivery_status === 'Cancelled').length;
        const shippedOrders = orders.filter(o => o.delivery_status === 'Shipped').length;
        const packedOrders = orders.filter(o => o.delivery_status === 'Packed').length;
        const unfulfilledOrders = orders.filter(o => o.delivery_status === 'Unfulfilled').length;

        return {
            totalOrders: allOrders,
            fulfilledOrders: fulfilledOrders,
            cancelledOrders: cancelledOrders,
            shippedOrders: shippedOrders,
            packedOrders: packedOrders,
            unfulfilledOrders: unfulfilledOrders,
        };
    }
};

// ------------------------------------------------------------
// dashboard_metrics.js - Fetching and calculating dashboard metrics
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
