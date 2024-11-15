export default {
    // Function to check if the user is admin and display customer data accordingly
    async showClientDataIfAdmin() {
        try {
            // Fetch the VAT (vat_number) from db_users for the current user
            const clientData = await getClientIdFromDB.run();
            const clientRole = clientData[0]?.role || 'client';

            if (clientRole === 'admin') {
                // If the user is an admin, fetch and display customer data
                await this.getCustomers();
            } else {
                showAlert('Access restricted to admin users only.', 'error');
                Table1.setData([]); // Clear table data if the user is not an admin
            }
        } catch (error) {
            console.error('Error checking user role or fetching customers:', error);
        }
    },

    // Fetch customers from the database and populate the table
    async getCustomers() {
        let customers = [];
        try {
            const result = await getCustomers.run(); // Fetch customers using the defined SQL query getCustomers
            customers = result.map(c => ({
                VAT: c.vat_number,
                Name: `${c.first_name} ${c.representant}`, // Combine first name and representative fields
                Email: c.email,
                Phone: c.phone,
                Role: c.role,
                CreatedAt: new Date(c.created_at).toLocaleDateString(), // Format the created_at timestamp
                UpdatedAt: new Date(c.updated_at).toLocaleDateString()  // Format the updated_at timestamp
            }));
            Table1.setData(customers); // Populate the table widget named Table1
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    },

    // Triggered when a client row is clicked to show details
    async showClientDetails() {
        const selectedCustomer = Table1.selectedRow; // Get the selected row in the table
        if (selectedCustomer) {
            // Store customer details in Appsmith store
            storeValue('customerName', selectedCustomer.Name.split(' ')[0]);  // Store first name
            storeValue('customerRepresentant', selectedCustomer.Name.split(' ')[1]);  // Store representative
            storeValue('customerEmail', selectedCustomer.Email);  // Store email
            storeValue('customerPhone', selectedCustomer.Phone);  // Store phone

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
                customerOrders = result.map(o => ({
                    Codigo: o.order_id,
                    Data: new Date(o.created).toLocaleDateString('pt-PT'),
                    Items: o.items_count,
                    Custo: o.total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
                }));
                tbl_customerOrders.setData(customerOrders); // Populate customer orders table
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

    // Function to add a new customer
    async addCustomer() {
        try {
            // Validate customer details before submission
            if (!inp_addName.text || !inp_addRepresentante.text || !inp_addEmail.text || !inp_addPhone.text) {
                showAlert('Please fill out all required fields.', 'error');
                return;
            }

            // Run the addCustomerQuery to insert a new customer
            await addCustomerQuery.run({
                first_name: inp_addName.text,
                representante: inp_addRepresentante.text,
                email: inp_addEmail.text,
                phone: inp_addPhone.text,
                shipping_address: inp_addShippingAddress.text,
                billing_address: inp_addBillingAddress.text,
                vat_number: VAT.text  // Ensure that the VAT field is correctly passed
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
// utils.js - Contains functions for role-based customer data display, fetching customer data, 
// displaying customer details, and adding new customers based on role check using getClientIdFromDB.
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------




