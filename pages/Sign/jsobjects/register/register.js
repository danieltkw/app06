export default {
    async register() {
        try {
            // Clear any existing user/client data
            await storeValue('userID', null);
            await storeValue('clientId', null);

            // Retrieve the input values (use correct widget properties)
            const vatNumber = vat_number.value?.toString().trim();
            const email = inp_registerEmail.text?.trim();
            const password = inp_registerPassword.text?.trim();
            const firstName = first_name.text?.trim();
            const representant = representant_.text?.trim();
            const phone = inp_phone.value?.toString().trim();
            const address = inp_address.text?.trim();

            // Log the values before running the SQL query
            console.log('VAT Number:', vatNumber);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('First Name:', firstName);
            console.log('Representative:', representant);
            console.log('Phone:', phone);
            console.log('Address:', address);

            // Ensure all required fields are filled
            if (!vatNumber || !email || !password || !firstName || !representant || !phone || !address) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            // Hash the password using dcodeIO.bcrypt
            const salt = dcodeIO.bcrypt.genSaltSync(10);
            const hashedPassword = dcodeIO.bcrypt.hashSync(password, salt);

            // Store the hashed password in Appsmith store
            await storeValue('hashedPassword', hashedPassword);

            // Store the VAT number as clientId in Appsmith store
            await storeValue('clientId', vatNumber);

            // Log the hashed password and clientId
            console.log('Hashed Password:', hashedPassword);
            console.log('Client ID (VAT Number):', vatNumber);

            // Registration query
            await SignUp_sql.run();

            showAlert('Registration Successful!', 'success');
            navigateTo('Dashboard', { user_id: vatNumber }, 'SAME_WINDOW');
        } catch (error) {
            console.error('Error during registration:', error);
            showAlert('Registration failed. Please try again.', 'error');
        }
    }
};

// ------------------------------------------------------------
// register.js - Handles user registration and stores clientId (VAT)
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

