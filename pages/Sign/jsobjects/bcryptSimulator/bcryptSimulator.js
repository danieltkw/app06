export default {
    // Hash password using bcryptSimulator
    async hashPassword() {
        try {
            const password = inp_registerPassword.text;  // Get the entered password

            if (!password) {
                console.error('Password is undefined or empty');
                return;
            }

            // Generate a salt for testing purposes
            const salt = this.generateSalt(16);  // Correctly reference generateSalt using 'this'
            const costFactor = 10;  // Use cost factor to simulate bcrypt rounds

            // Hash the password using the custom bcryptSimulator
            const passwordHash = await this.bcryptSimulator(password, salt, costFactor);  // Correctly reference bcryptSimulator using 'this'

            console.log('Generated Password Hash (using bcryptSimulator):', passwordHash);

            // Store the hashed password in Appsmith store for use in the SQL query
            await storeValue('hashedPassword', passwordHash);

            return passwordHash;  // Return the hashed password if needed elsewhere
        } catch (error) {
            console.error('Error hashing password with bcryptSimulator:', error);
        }
    },

    // bcrypt-like password hashing simulator
    async bcryptSimulator(password, salt, costFactor) {
        console.log("Simulating bcrypt...");

        if (!password || !salt) {
            console.error('Password or salt is undefined');
            return;
        }

        let hashedKey = password + salt;  // Simple concatenation of password and salt

        // Simulate key stretching (bcrypt rounds based on the cost factor)
        for (let i = 0; i < Math.pow(2, costFactor); i++) {
            hashedKey = this.simpleHashFunction(hashedKey + salt);  // Correctly reference simpleHashFunction using 'this'
        }

        console.log("Stretched Hashed Key after cost factor:", hashedKey);

        return `$2a$${costFactor}$${salt}${hashedKey}`;  // Return a hash-like string
    },

    // Simple hash function for testing (ensures input is defined)
    simpleHashFunction(input) {
        if (!input) {
            console.error('Input is undefined in simpleHashFunction');
            return '';
        }
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;  // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);  // Return as hexadecimal (positive)
    },

    // Simple function to generate salt for testing purposes
    generateSalt(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let salt = '';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    },

    // Function to simulate bcrypt password validation
    async validatePassword(enteredPassword, storedHash) {
        if (!enteredPassword || !storedHash) {
            console.error('Entered password or stored hash is undefined');
            return false;
        }

        console.log("Validating password...");

        // Split the stored hash to extract salt and cost factor
        const parts = storedHash.split('$');
        if (parts.length < 4) {
            console.error('Invalid stored hash format');
            return false;
        }

        const costFactor = parseInt(parts[2], 10);
        const salt = parts[3].slice(0, 16);  // Assuming salt is the first 16 characters
        const storedHashValue = parts[3].slice(16);  // Remaining part is the stored hash

        console.log('Extracted Salt:', salt);
        console.log('Extracted Cost Factor:', costFactor);
        console.log('Stored Hash Value:', storedHashValue);

        // Simulate bcrypt hashing on entered password
        const hashedEnteredPassword = await this.bcryptSimulator(enteredPassword, salt, costFactor);

        // Compare the result with the stored hash value
        const hashedPart = hashedEnteredPassword.slice(28);  // Remove "$2a$cost$salt" part
        const isValid = hashedPart === storedHashValue;

        console.log('Hashed Entered Password:', hashedEnteredPassword);
        console.log('Comparison Result:', isValid);

        return isValid;
    }
};

// ------------------------------------------------------------
// bcryptSimulator.js - Password hashing and validation using bcryptSimulator
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------




