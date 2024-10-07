export default {
   // Fetch orders and store them in Appsmith store and table
   async fetchOrders() {
     try {
       const orders = await getOrders.run();
       if (orders && orders.length > 0) {
         storeValue('orders', orders); // Store the orders in the Appsmith store
         Table1.setData(orders); // Set the data in the orders table
       } else {
         console.error("No orders found for the client.");
       }
     } catch (error) {
       console.error('Error fetching orders:', error);
     }
   },

   // Fetch selected order details when a user clicks on a row in the orders table
   async fetchOrderDetails(orderId) {
     try {
       const orderDetails = await getOrderDetails.run({ orderId });
       if (orderDetails && orderDetails.length > 0) {
         storeValue('selectedOrder', orderDetails[0]); // Store the selected order details
         this.populateOrderDetails(orderDetails[0]); // Populate the UI with order details
       } else {
         console.error("Order details not found.");
       }
     } catch (error) {
       console.error('Error fetching order details:', error);
     }
   },

   // Populate UI with order details from selected order
   populateOrderDetails(order) {
     if (!order) {
       console.error("Order data not available");
       return;
     }

     // Set the values for the text and input fields, checking for undefined fields
     txt_orderDetailTitle.setText(`Order #${order.order_id || 'N/A'}`);
     txt_idPedido.setText(order.order_id || 'N/A');
     txt_orderDate.setText(order.created ? new Date(order.created).toLocaleDateString() : 'N/A');
     txt_amount.setText(order.total ? order.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) : 'N/A');
     txt_status.setText(order.delivery_status || 'N/A');
     txt_itens.setText(order.items ? order.items.length : 'N/A');  // Assuming 'items' is a JSON array
     txt_addressValue.setText(order.shipping_address || 'N/A');
     txt_shippingAddress.setText(order.shipping_address || 'N/A');

     // Populate order products table
     tbl_orderProducts.setData(order.items || []); // Assuming 'items' is JSON array, default to empty if undefined
     
     // Tracking Info
     txt_carrier.setText(order.carrier || 'N/A');
     txt_tracking.setText(order.tracking_no || 'N/A');
     dat_eta.setValue(order.eta ? new Date(order.eta).toLocaleDateString() : 'N/A');
     txt_orderStatus.setText(order.delivery_status || 'N/A');

     // Set default or placeholder values for the Picked Items and Pack Info
     txt_pickedItems.setText("0"); // Placeholder, adjust as needed
     txt_packInfo.setText("Not Packed"); // Placeholder, adjust as needed
   },

   // Utility function to handle the validation errors
   validateSelectedOrder() {
     if (!appsmith.store.selectedOrder) {
       console.error('Selected order is undefined.');
       return false;
     }
     return true;
   },

   // Bind selected order's data to text fields
   bindSelectedOrderData() {
     const selectedOrder = appsmith.store.selectedOrder;

     if (this.validateSelectedOrder()) {
       txt_idPedido.setText(selectedOrder.order_id || 'N/A');
       txt_orderDate.setText(selectedOrder.created ? new Date(selectedOrder.created).toLocaleDateString() : 'N/A');
       txt_amount.setText(selectedOrder.total ? selectedOrder.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) : 'N/A');
       txt_shippingAddress.setText(selectedOrder.shipping_address || 'N/A');
       txt_status.setText(selectedOrder.delivery_status || 'N/A');
       txt_itens.setText(selectedOrder.items ? selectedOrder.items.length : 'N/A');
     } else {
       console.error("Failed to bind selected order data.");
     }
   },

   // Function to bind order products
   bindOrderProducts() {
     const selectedOrder = appsmith.store.selectedOrder;
     if (this.validateSelectedOrder()) {
       tbl_orderProducts.setData(selectedOrder.items || []);
     } else {
       console.error("Failed to bind order products.");
     }
   },

   // Handle table data fetch and validation
   validateTableData() {
     const orders = appsmith.store.orders || [];
     if (!orders.length) {
       console.error("No data in table");
       return [];
     }
     return orders;
   },

   // Print the invoice for the selected order
   async printInvoice() {
     if (this.validateSelectedOrder()) {
       // Logic for printing the invoice based on the selected order
       await this.generateInvoice(); // Assuming generateInvoice is defined elsewhere
     } else {
       console.error("Selected order is undefined. Cannot print invoice.");
     }
   }
};

// ------------------------------------------------------------
// This file contains the `FetchOrderDetails` function 
// File name: FetchOrderDetails.js
// ------------------------------------------------------------


