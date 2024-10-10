export default {
    // Fetch customers from the database and populate the table
    async getCustomers() {
        let customers = [];
        try {
            const result = await getCustomers.run(); // Fetch clients using the query defined above
            customers = result.map(c => {
                return {
                    ID: c.user_id,           // Ensure you have a valid 'user_id' field
                    Name: `${c.first_name} ${c.representante}`,  // Updated to use 'representante' field
                    Email: c.email,
                    Phone: c.phone,
                    VAT: c.vat_number       // Use 'vat_number' for client VAT
                };
            });
            Table1.setData(customers); // Use setData to populate the table widget named Table1
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    },

    // Triggered when a client row is clicked
    async showClientDetails() {
        const selectedCustomer = Table1.selectedRow; // Get the selected row in the table
        if (selectedCustomer) {
            // Store the values in the appsmith store
            storeValue('customerName', selectedCustomer.Name.split(' ')[0]);  // Store first name
            storeValue('customerRepresentante', selectedCustomer.Name.split(' ')[1]);  // Store 'representante'
            storeValue('customerEmail', selectedCustomer.Email);  // Store email
            storeValue('customerPhone', selectedCustomer.Phone);  // Store phone
            storeValue('customerBillingAddress', selectedCustomer.BillingAddress || '');  // Store billing address
            storeValue('customerShippingAddress', selectedCustomer.ShippingAddress || '');  // Store shipping address

            // Bind those values using Appsmith store in the UI input fields (in the widget's settings)
            // Example:
            // For inp_addName widget, bind: {{appsmith.store.customerName}} in the Default Text field
            // For inp_addRepresentante widget, bind: {{appsmith.store.customerRepresentante}} in the Default Text field
            // Continue this for the other fields.
            
            // Fetch customer orders and populate the orders table
            await this.getCustomerOrders(selectedCustomer.VAT);  // Use selected customer VAT to fetch orders
        } else {
            showAlert('Please select a customer to view details.', 'info');
        }
    },

    // Fetch customer orders based on selected customer VAT (vat_number)
    async getCustomerOrders(vatNumber) {
        let customerOrders = [];
        try {
            if (vatNumber) {
                // Fetch customer orders using the VAT number as the identifier
                const result = await getCustomerOrdersQuery.run({ vat_number: vatNumber });  // Pass vat_number to the query
                customerOrders = result.map(o => {
                    return {
                        Codigo: o.order_id,
                        Data: new Date(o.created).toLocaleDateString('pt-PT'),
                        Items: o.items_count,
                        Custo: o.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
                    };
                });
                tbl_customerOrders.setData(customerOrders); // Use setData instead of direct assignment
            } else {
                console.error('No customer selected or VAT number is missing.');
                customerOrders = [];
            }
        } catch (error) {
            console.error('Error fetching customer orders from database:', error);
            customerOrders = [];
        }
        return customerOrders;
    },

    // Function to add a customer (triggered by a button click)
    async addCustomer() {
        try {
            // Validate customer details before submission
            if (!inp_addName.text || !inp_addRepresentante.text || !inp_addEmail.text || !inp_addPhone.text) {
                showAlert('Please fill out all required fields.', 'error');
                return;
            }

            // Define the addCustomerQuery (make sure this is available in Appsmith Queries section)
            await addCustomerQuery.run({
                first_name: inp_addName.text,
                representante: inp_addRepresentante.text,  // Changed from last_name to representante
                email: inp_addEmail.text,
                phone: inp_addPhone.text,
                shipping_address: inp_addShippingAddress.text,
                billing_address: inp_addBillingAddress.text,
                vat_number: VAT.text // Ensure that the VAT field is correctly passed
            });

            showAlert('Customer added successfully', 'success');
            await this.getCustomers();  // Refresh the customers list after adding a new customer
        } catch (error) {
            console.error('Error adding customer:', error);
            showAlert('Error adding customer', 'error');
        }
    }
};


// ------------------------------------------------------------
// utils.js 
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


