export default {
    async getOrdersCard() {
        try {
            const clientId = appsmith.store.clientId; // Retrieve the client ID from the store

            if (!clientId) {
                showAlert("Nenhum cliente selecionado.", "error");
                return;
            }

            console.log("Fetching orders for client:", clientId);

            // Run the query to fetch orders
            const ordersData = await getOrders.run({ vat_number: clientId });

            if (ordersData && Array.isArray(ordersData)) {
                // Extract and format the data for the table
                const formattedOrders = ordersData.map((order) => ({
                    ID_Pedido: order.order_id,
                    Valor: parseFloat(order.total || 0).toLocaleString("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                    }),
                    Morada: order.address || "Não informado",
                    Data: new Date(order.created).toLocaleDateString("pt-PT"),
                    Estado: order.delivery_status || "Pendente",
                }));

                // Set the formatted data to the table widget
                Table1.setData(formattedOrders);
            } else {
                console.warn("No orders found for the client.");
                Table1.setData([]); // Clear the table if no orders found
            }

            console.log("Orders fetched and displayed successfully.");
        } catch (error) {
            console.error("Erro ao buscar os pedidos:", error);
            showAlert("Erro ao buscar os pedidos.", "error");
        }
    },
};

// ------------------------------------------------------------
// getOrdersCard.js - Fetches orders for the client and populates Table1 with formatted data.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


