export default {
    async getCustomers() {
        try {
            const result = await getCustomers.run();
            const customers = result.map(c => ({
                VAT: c.vat_number,
                Name: `${c.first_name} ${c.representant}`,
                Email: c.email,
                Phone: c.phone,
                Role: c.role,
                CreatedAt: new Date(c.created_at).toLocaleDateString(),
                UpdatedAt: new Date(c.updated_at).toLocaleDateString()
            }));
            Table1.setData(customers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    },

    async storeCustomerDetails() {
        const selectedCustomer = Table1.selectedRow;
        if (selectedCustomer) {
            storeValue('customerName', selectedCustomer.Name.split(' ')[0]);
            storeValue('customerRepresentant', selectedCustomer.Name.split(' ')[1]);
            storeValue('customerEmail', selectedCustomer.Email);
            storeValue('customerPhone', selectedCustomer.Phone);
            await orderManager.getCustomerOrders(selectedCustomer.VAT); // Fetch orders for the selected customer
        } else {
            showAlert('Please select a customer to view details.', 'info');
        }
    }
};

// ------------------------------------------------------------
// customerManager.js - Handles customer data and order fetching
// ------------------------------------------------------------
