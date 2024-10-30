export default {
    // Create an order from the current cart items
    async createOrder() {
        try {
            const clientId = appsmith.store.clientId;
            console.log('Creating order for client ID:', clientId);

            // Fetch the current cart data to verify
            const cartData = await getCardQuery.run({ vat_number: clientId });
            if (!cartData || cartData.length === 0) {
                showAlert('No items in the cart to create an order.', 'error');
                return;
            }

            // Fetch client information
            const clientData = await getClientIdFromDB.run({ vat_number: clientId });
            if (!clientData || clientData.length === 0) {
                showAlert('Client information not found. Cannot create order.', 'error');
                return;
            }
            const clientInfo = clientData[0];

            // Calculate weight and dimensions
            const weightKg = cartData.reduce((acc, item) => acc + (item.quantity * (item.weight_kg || 0)), 0) || 0;
            const weightLbs = weightKg * 2.20462;
            const dimensions = JSON.stringify({ length: 0, width: 0, height: 0 }); // Default to zero if not available

            // Create an order from the cart
            await createOrder.run({
                vat_number: clientId,
                sales_rep: clientInfo.sales_rep || null,
                shipping_address: clientInfo.standart_address || null,
                items: JSON.stringify(cartData.map(item => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    price: item.price
                })) ),
                subtotal: cartData.reduce((acc, item) => acc + (item.quantity * item.price), 0),
                taxes: 0,  // Default to 0 unless specified elsewhere
                shipping: 0,  // Default to 0 unless specified elsewhere
                carrier: clientInfo.carrier || null, // Default to null if not available
                shipping_date: new Date().toISOString().split('T')[0],
                eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // ETA in 7 days
                weight_kg: weightKg,
                weight_lbs: weightLbs,
                dimensions: dimensions,
                tracking_no: null, // Tracking number to be updated later
                total: cartData.reduce((acc, item) => acc + (item.quantity * item.price), 0),
                delivery_status: 'Pending',
                address_id: clientInfo.address_id || null
            });

            showAlert('Order created successfully!', 'success');

            // Clear the cart after the order is successfully created
            await clearCart.run({ vat_number: clientId });
            console.log('Cart cleared for client ID:', clientId);

            // Refresh the cart to reflect the cleared state
            await getCardQuery.run({ vat_number: clientId });

            // Refresh the orders table
            await this.ordersCreated(); // Fetch orders to update orders table on UI
        } catch (error) {
            console.error('Error creating order:', error);
            showAlert('Failed to create order. Please try again.', 'error');
        }
    },

    // Print invoice by opening an external URL (for testing purposes)
    async printInvoice() {
        try {
            const orderId = appsmith.store.selectedOrder ? appsmith.store.selectedOrder.order_id : null;
            if (!orderId) {
                showAlert('No order selected to print an invoice.', 'error');
                return;
            }
            const invoiceUrl = `https://example.com/invoice/${orderId}`; // Replace with actual URL when ready
            window.open(invoiceUrl, '_blank'); // Open the invoice in a new tab
            console.log('Invoice opened for order ID:', orderId);
        } catch (error) {
            console.error('Error printing invoice:', error);
            showAlert('Failed to print invoice. Please try again.', 'error');
        }
    },

    // Show created orders in the table
    async ordersCreated() {
        try {
            const orders = await getOrders.run();
            if (orders && orders.length > 0) {
                Table_productsCopy.setData(orders); // Set the data in the orders table
                console.log('Orders fetched and set in the table:', orders);
            } else {
                Table_productsCopy.setData([]); // Clear the table if no orders are found
                console.error('No orders found for the client.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            showAlert('Error fetching orders. Please try again.', 'error');
        }
    }
};

// ------------------------------------------------------------
// createOrder.js - Handles creating an order from the cart, clearing the cart afterwards, and refreshing the orders list.
// printInvoice.js - Handles opening an external website for the invoice.
// ordersCreated.js - Handles fetching and displaying orders in the table.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
