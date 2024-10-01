export default {
    defaultTab: 'Sign In',

    // Initialize function to set the default tab
    initialize() {
        console.log('Initializing with default tab set to Sign In');
        this.setDefaultTab('Canvas2');  // Set the default tab to Canvas2 when the app loads
    },

    // Function to switch between Sign In (Canvas2) and Sign Up (Canvas3) tabs
    setDefaultTab(newTab) {
        if (newTab === 'Canvas2' || newTab === 'Canvas3') {
            this.defaultTab = newTab;
        } else {
            console.error('Invalid tab name:', newTab);
        }
    },

    // Function to hash the password and store it in a hidden widget or store
    async generatePasswordHash() {
        try {
            const hashedPassword = dcodeIO.bcrypt.hashSync(inp_registerPassword.text, 10);
            console.log('Generated password hash:', hashedPassword); 
            storeValue("hashedPassword", hashedPassword);  // Store hash in global store
            return hashedPassword;
        } catch (error) {
            console.error('Error generating password hash:', error);
            showAlert('Error generating password hash', 'error');
            return null;
        }
    },

    // Function to verify the password hash during login
    async verifyHash(password, hash) {
        const match = dcodeIO.bcrypt.compareSync(password, hash);
        console.log(`Password comparison result: ${match}`);
        return match;  // Verify password with stored hash
    },

    // Function to create a JWT token
    async createToken(user) {
        try {
            const token = jsonwebtoken.sign(user, 'secret', { expiresIn: 60 * 60 });
            console.log('Generated Token:', token);
            return token;
        } catch (error) {
            console.error('Error creating token:', error);
            return null;
        }
    },

    // **Login** Function to authenticate the user
    async signIn() {
        const email = inp_email.text;
        const password = inp_password.text;

        try {
            // Query MySQL for the user based on the email, now retrieving both email and password_hash
            const result = await SignIn_sql.run({ email });

            if (result.length > 0) {
                const user = result[0];  // Get the first user result
                console.log('User found:', user);

                // Verify the entered password with the stored hashed password
                const isPasswordCorrect = await this.verifyHash(password, user.password_hash);
                if (isPasswordCorrect) {
                    // Store the token (optional) and navigate to the dashboard
                    const token = await this.createToken(user);
                    if (token) {
                        storeValue('token', token);
                        await storeValue('userID', user.vat_number);  // Store VAT (user ID)
                        showAlert('Login Success! Welcome, ' + user.first_name, 'success');
                        navigateTo('Dashboard', { user_id: user.vat_number }, 'SAME_WINDOW');  // Navigate to Dashboard
                    } else {
                        showAlert('Error creating token', 'error');
                    }
                } else {
                    showAlert('Invalid password', 'error');
                    console.log(`Password mismatch. Entered: ${password}, Expected Hash: ${user.password_hash}`);
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
            const passwordHash = await this.generatePasswordHash();

            if (passwordHash) {
                console.log('VAT Number:', vat_number.text);
                console.log('Email:', inp_registerEmail.text);
                console.log('First Name:', first_name.text);
                console.log('Representant:', representant.text);
                console.log('Phone:', inp_phone.text);
                console.log('Address:', inp_address.text);
                console.log('Password Hash:', passwordHash);

                await SignUp_sql.run({
                    vat_number: vat_number.text,
                    email: inp_registerEmail.text,
                    password_hash: appsmith.store.hashedPassword,
                    first_name: first_name.text,
                    representant: representant.text,
                    phone: inp_phone.text,
                    role: 'client',
                    standart_address: inp_address.text
                });

                const user = {
                    vat_number: vat_number.text,
                    email: inp_registerEmail.text,
                    first_name: first_name.text
                };
                const token = await this.createToken(user);
                if (token) {
                    storeValue('token', token);
                    showAlert('Registration Successful! Welcome, ' + first_name.text, 'success');
                    navigateTo('Dashboard', { user_id: vat_number.text }, 'SAME_WINDOW');
                } else {
                    showAlert('Error creating token', 'error');
                }
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
        return appsmith.store.userID;
    }
};



// ------------------------------------------------------------
// Temporary Login page
// ------------------------------------------------------------
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------