export default {
    // Function to fetch revenue by month
    async revenueChart() {
        try {
            const clientId = await client_id.getClientId(); // Ensure VAT (clientId) is fetched
            console.log('Fetching revenue data for clientId:', clientId);

            const revenueByMonth = await getRevenueByMonth.run({ clientId });
            console.log('Fetched revenue by month:', revenueByMonth);

            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            return revenueByMonth.map(r => {
                return {
                    x: months[parseInt(r.month.substring(5)) - 1] + ' ' + r.month.substring(2, 4),
                    y: r.total,
                };
            });
        } catch (error) {
            console.error('Error in revenueChart:', error);
            return [];
        }
    }
};

// ------------------------------------------------------------
// revenue_chart.js - Fetches revenue data by month
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
