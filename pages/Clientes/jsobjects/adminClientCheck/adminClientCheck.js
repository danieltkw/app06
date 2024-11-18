export default {
    async checkAndFetchClients() {
        try {
            const clientData = await getClientIdFromDB.run(); // Fetch user data
            const clientRole = clientData[0]?.role || 'client'; // Default role is 'client'

            if (clientRole === 'admin') {
                await customerManager.getCustomers(); // Fetch and display customers for admin
            } else {
                showAlert('Access restricted to admin users only.', 'error');
                Table1.setData([]); // Clear data for non-admin users
            }
        } catch (error) {
            console.error('Error checking role or fetching clients:', error);
        }
    }
};

// ------------------------------------------------------------
// adminClientCheck.js - Checks user role and fetches clients if admin
// ------------------------------------------------------------
