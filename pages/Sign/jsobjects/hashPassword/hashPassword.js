export default {
    // Function to hash password using bcryptSimulator
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
            if (!hashedKey) {
                console.error('hashedKey is undefined at iteration:', i);
                return;
            }
            hashedKey = this.simpleHashFunction(hashedKey + salt);  // Correctly reference simpleHashFunction using 'this'
        }

        console.log("Stretched Hashed Key after cost factor:", hashedKey);

        return `$2a$${costFactor}$${salt}${hashedKey}`;  // Return a hash-like string
    },

    // Simple hash function for testing (just generates a hash-like string)
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
    }
};

// ------------------------------------------------------------
// hashPassword.js - Function for hashing password using bcryptSimulator
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
