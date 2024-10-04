export default {
    // SignIn function using simulated bcrypt or actual bcrypt for password comparison
    async signIn() {
        const email = inp_email.text.trim();
        const password = inp_password.text.trim();  // Trim password to remove extra spaces

        console.log('Entered Email:', email);
        console.log('Entered Password:', password);
        showAlert('SignIn function started');

        try {
            // Run SQL query to find the user by email
            showAlert('Executing SQL query to find user');
            const result = await SignIn_sql.run({ email });

            if (result.length > 0) {
                const user = result[0];
                const storedHash = user.password_hash;

                // Log found user data and the stored password hash
                console.log('User found:', user);
                console.log('Stored Hash:', storedHash);
                showAlert('Stored Hash: ' + storedHash);

                // Define whether to use bcrypt or the custom crypt function
                const useCustomCrypt = true;  // Switch between custom crypt and actual bcrypt here

                let isPasswordValid;

                if (useCustomCrypt) {
                    // Using the custom bcryptSimulator for comparison
                    console.log('Using custom bcryptSimulator for comparison');
                    isPasswordValid = await bcryptSimulator.validatePassword(password, storedHash);
                } else {
                    // Using actual bcrypt for comparison
                    console.log('Using actual bcrypt for comparison');
                    isPasswordValid = dcodeIO.bcrypt.compareSync(password, storedHash);
                }

                // Log the result of password comparison
                console.log('Password Comparison Result:', isPasswordValid);
                showAlert('Password comparison result: ' + isPasswordValid);

                if (isPasswordValid) {
                    showAlert('Login Successful!', 'success');
                    const userID = user.vat_number;
                    await storeValue('userID', userID);
                    navigateTo('Dashboard', { user_id: userID }, 'SAME_WINDOW');
                } else {
                    showAlert('Invalid password', 'error');
                    console.log('Password mismatch. Stored Hash: ' + storedHash + ' Entered Password: ' + password);
                }
            } else {
                showAlert('User not found', 'error');
                console.log('User not found with email:', email);
            }
        } catch (error) {
            // Log and show any errors encountered
            console.error('Error during login:', error);
            showAlert('An error occurred during login: ' + error, 'error');
        }
    }
};

// ------------------------------------------------------------
// Login function with switchable custom bcrypt simulator and actual bcrypt
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


