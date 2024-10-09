export default {
    async register() {
        try {
            // Retrieve the input values
            const vatNumber = vat_number.text.trim();
            const email = inp_registerEmail.text.trim();
            const passwordHash = appsmith.store.hashedPassword;
            const firstName = first_name.text.trim();
            const representative = representant.text.trim();
            const phone = inp_phone.text.trim();
            const address = inp_address.text.trim();

            // Ensure all required fields are filled
            if (!vatNumber || !email || !passwordHash || !firstName || !representative || !phone || !address) {
                showAlert('Please fill in all required fields.', 'error');
                return;  // Stop if validation fails
            }

            // Log all the values before running the query
            console.log('VAT Number:', vatNumber);
            console.log('Email:', email);
            console.log('Password Hash:', passwordHash);
            console.log('First Name:', firstName);
            console.log('Representative:', representative);
            console.log('Phone:', phone);
            console.log('Address:', address);

            // Run the SQL query
            await SignUp_sql.run();

            showAlert('Registration Successful!', 'success');

            // Navigate to the Dashboard
            navigateTo('Dashboard');
        } catch (error) {
            console.error('Error during registration:', error);
            showAlert('Registration failed. Please try again.', 'error');
        }
    }
};

