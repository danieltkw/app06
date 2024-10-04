export default {
    // Registration function using simulated bcrypt or actual bcrypt for password hashing
    async register() {
        try {
            // Define whether to use bcrypt or the custom crypt function
            const useCustomCrypt = true;  // Switch between custom crypt and actual bcrypt here

            let passwordHash;

            if (useCustomCrypt) {
                // Use custom bcryptSimulator to hash the password
                const salt = this.generateSalt(16);  // Use the local generateSalt method
                const costFactor = 10;
                console.log('Using custom bcryptSimulator for hashing');
                passwordHash = await this.bcryptSimulator(inp_registerPassword.text, salt, costFactor);  // Call as `this.bcryptSimulator` if in same file
            } else {
                // Use actual bcrypt to hash the password
                const salt = dcodeIO.bcrypt.genSaltSync(10);
                console.log('Using actual bcrypt for hashing');
                passwordHash = dcodeIO.bcrypt.hashSync(inp_registerPassword.text, salt);
            }

            // Now run the SQL query with the hashed password
            await SignUp_sql.run({
                vat_number: vat_number.text,
                email: inp_registerEmail.text,
                password_hash: passwordHash,  // Use hashed password from the previous step
                first_name: first_name.text,
                representant: representant.text,
                phone: inp_phone.text,
                role: 'client',
                standart_address: inp_address.text
            });

            showAlert('Registration Successful! Welcome, ' + first_name.text, 'success');
            navigateTo('Dashboard', { user_id: vat_number.text }, 'SAME_WINDOW');
        } catch (error) {
            console.error('Error during registration:', error);
            showAlert('Error creating new user', 'error');
        }
    },

    // Ensure that the bcryptSimulator function is present if it's in the same file
    async bcryptSimulator(password, salt, costFactor) {
        console.log("Simulating bcrypt...");

        // Step 1: Initial hash using a combination of password and salt
        let hashedKey = this.simpleHashFunction(password + salt);
        console.log("Initial Hashed Key:", hashedKey);

        // Step 2: Key stretching by repeated hashing (based on cost factor)
        for (let i = 0; i < Math.pow(2, costFactor); i++) {
            hashedKey = this.simpleHashFunction(hashedKey + salt);  // Repeated hashing with salt
        }

        console.log("Stretched Hashed Key after cost factor:", hashedKey);
        return `$2a$${costFactor}$${salt}${hashedKey}`;
    },

    // Simplified hash function (NOT secure)
    simpleHashFunction(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;  // Simulate hash operation
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);  // Return hashed value as hexadecimal
    },

    generateSalt(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let salt = '';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    }
};

// ------------------------------------------------------------
// Registration function with custom bcrypt simulator for password hashing
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
