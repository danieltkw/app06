export default {
    // Function to initialize the dashboard with user-specific data
    async initializeDashboard() {
        const clientId = await client_id.getClientId();  // Retrieve the stored VAT (client ID)

        if (clientId) {
            console.log('Client ID (NIF):', clientId);  // Log the retrieved clientId for debugging
            await dashboard_metrics.dashboardMetrics();  // Fetch and display dashboard metrics
            await top_ordered_products.topOrderedProductsChart();  // Fetch and display top products
            await revenue_chart.revenueChart();  // Fetch and display revenue data
        } else {
            showAlert('No client ID found. Please log in again.', 'error');  // Show error if clientId not found
            navigateTo('Login', {}, 'SAME_WINDOW');  // Redirect to login if no clientId
        }
    }
};

// ------------------------------------------------------------
// initialize_dashboard.js - Initializes the dashboard with user-specific data
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
