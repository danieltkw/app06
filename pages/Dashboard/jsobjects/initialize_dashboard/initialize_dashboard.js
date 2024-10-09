export default {
    async initializeDashboard() {
        const clientId = await client_id.getClientId();  
        console.log('Client ID (NIF):', clientId);  // Added log

        if (clientId) {
            await dashboard_metrics.dashboardMetrics();
            await top_ordered_products.topOrderedProductsChart();
            await revenue_chart.revenueChart();
        } else {
            showAlert('No client ID found. Please log in again.', 'error');
            navigateTo('Login', {}, 'SAME_WINDOW');
        }
    }
};

// ------------------------------------------------------------
// initialize_dashboard.js - Improved logging for clientId
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
