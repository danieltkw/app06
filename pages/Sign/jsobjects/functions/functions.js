export default {
    defaultTab: 'Sign In',

    // Initialize function to set the default tab
    initialize() {
        console.log('Initializing with default tab set to Sign In');
        this.setDefaultTab('Sign In');  // Set the default tab to SignIn when the app loads
    },

    // Function to switch between Sign In and Sign Up tabs
    setDefaultTab(newTab) {
        this.defaultTab = newTab;
    },

    // Function to hash the password
    async generatePasswordHash() {
        try {
            // Use bcrypt to hash the password from the register form
            const hashedPassword = dcodeIO.bcrypt.hashSync(inp_registerPassword.text, 10);
            console.log('Generated password hash:', hashedPassword); // Log the generated hash
            return hashedPassword;
        } catch (error) {
            console.error('Error generating password hash:', error);
            showAlert('Error generating password hash', 'error');
            return null;  // Return null if there's an error
        }
    },

    // Function to verify the password hash during login
    async verifyHash(password, hash) {
        return dcodeIO.bcrypt.compareSync(password, hash);  // Verify password with stored hash
    },

    // Function to create a JWT token
    async createToken(user) {
        // Use JWT to create a token for user authentication (optional)
        return jsonwebtoken.sign(user, 'secret', { expiresIn: 60 * 60 });
    },

    // **Login** Function to authenticate the user
    async signIn() {
        const email = inp_email.text;
        const password = inp_password.text;

        try {
            // Query MySQL for the user based on the email
            const result = await SignIn_sql.run({ email });

            if (result.length > 0) {
                const user = result[0];  // Get the first user result

                // Verify the entered password with the stored hashed password
                if (await this.verifyHash(password, user.password_hash)) {
                    // Store the token (optional) and navigate to the dashboard
                    storeValue('token', await this.createToken(user));
                    await storeValue('userID', user.vat_number);  // Store VAT (user ID)

                    showAlert('Login Success! Welcome, ' + user.first_name, 'success');
                    navigateTo('Dashboard', { user_id: user.vat_number }, 'SAME_WINDOW');  // Navigate to Dashboard
                } else {
                    showAlert('Invalid password', 'error');
                }
            } else {
                showAlert('User not found', 'error');
            }
        } catch (error) {
            console.error('Error during login:', error);
            showAlert('An error occurred during login', 'error');
        }
    },

    // **Register** Function to create a new user
    async register() {
        try {
            // Generate hashed password
            const passwordHash = await this.generatePasswordHash();

            // Only proceed if the hash was successfully generated
            if (passwordHash) {
                // Log all the data being passed to the SQL query
                console.log('VAT Number:', vat_number.text);
                console.log('Email:', inp_registerEmail.text);
                console.log('First Name:', first_name.text);
                console.log('Representant:', representant.text);
                console.log('Phone:', inp_phone.text);
                console.log('Address:', inp_address.text);
                console.log('Password Hash:', passwordHash);

                // Insert new user into the MySQL database
                await SignUp_sql.run({
                    vat_number: vat_number.text,  // Reference to VAT input field
                    email: inp_registerEmail.text,  // Reference to email input field
                    password_hash: passwordHash,  // Hashed password
                    first_name: first_name.text,  // Reference to first name input field
                    representant: representant.text,  // Reference to representant input field
                    phone: inp_phone.text,  // Reference to phone input field
                    role: 'client',  // Default role as 'client'
                    standart_address: inp_address.text  // Reference to address input field
                });

                showAlert('Registration Successful! Welcome, ' + first_name.text, 'success');

                // Redirect the user to the dashboard after successful registration
                navigateTo('Dashboard', { user_id: vat_number.text }, 'SAME_WINDOW');
            } else {
                console.error('Password hash generation failed. SQL query will not be executed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            showAlert('Error creating new user', 'error');
        }
    },

    // Retrieve user ID (VAT) from global store
    getUserID: function () {
        return appsmith.store.userID;  // Use this to get the userID (VAT) on any page
    }
};





// ------------------------------------------------------------
// Temporary Login page
// ------------------------------------------------------------
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------