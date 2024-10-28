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
                }))),
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
        } catch (error) {
            console.error('Error creating order:', error);
            showAlert('Failed to create order. Please try again.', 'error');
        }
    }
};

// ------------------------------------------------------------
// createOrder.js - Handles creating an order from the cart and clearing the cart afterwards.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
