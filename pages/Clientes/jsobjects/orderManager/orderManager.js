export default {
    async getCustomerOrders(vatNumber) {
        try {
            if (vatNumber) {
                const result = await getCustomerOrdersQuery.run({ vat_number: vatNumber });
                const customerOrders = result.map(o => ({
                    Codigo: o.order_id,
                    Data: new Date(o.created).toLocaleDateString('pt-PT'),
                    Items: o.items_count,
                    Custo: o.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
                }));
                tbl_customerOrders.setData(customerOrders); // Populate orders table
            } else {
                console.error('No VAT number provided for orders.');
            }
        } catch (error) {
            console.error('Error fetching customer orders:', error);
        }
    }
};

// ------------------------------------------------------------
// orderManager.js - Fetches orders for a specific customer
// ------------------------------------------------------------
