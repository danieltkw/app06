export default {
    async addCustomer() {
        try {
            if (!inp_addName.text || !inp_addRepresentante.text || !inp_addEmail.text || !inp_addPhone.text) {
                showAlert('Please fill out all required fields.', 'error');
                return;
            }
            await addCustomerQuery.run({
                first_name: inp_addName.text,
                representante: inp_addRepresentante.text,
                email: inp_addEmail.text,
                phone: inp_addPhone.text,
                shipping_address: inp_addShippingAddress.text,
                billing_address: inp_addBillingAddress.text,
                vat_number: VAT.text
            });
            showAlert('Customer added successfully', 'success');
            await customerManager.getCustomers(); // Refresh customers
        } catch (error) {
            console.error('Error adding customer:', error);
            showAlert('Error adding customer', 'error');
        }
    }
};

// ------------------------------------------------------------
// addCustomer.js - Handles adding new customers to the database
// ------------------------------------------------------------
