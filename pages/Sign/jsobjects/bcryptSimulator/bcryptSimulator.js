export default {
    // Simplified bcrypt-like simulator for testing purposes
    async bcryptSimulator(password, salt, costFactor) {
        console.log("Simulating bcrypt...");

        // Simple concatenation of password and salt (for testing, NOT secure)
        let hashedKey = password + salt;

        // Perform key stretching (repeat hashing process based on cost factor)
        for (let i = 0; i < Math.pow(2, costFactor); i++) {
            hashedKey = this.simpleHashFunction(hashedKey + salt);  // Repeated hashing
        }

        console.log("Stretched Hashed Key after cost factor:", hashedKey);
        return `$2a$${costFactor}$${salt}${hashedKey}`;
    },

    // Simple hash function for testing (just generates a hash-like string)
    simpleHashFunction(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;  // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);  // Return as hexadecimal (positive)
    },

    // Simple function to generate salt for testing
    generateSalt(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let salt = '';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    },

    // Function to simulate bcrypt password validation (for sign in)
    async validatePassword(enteredPassword, storedHash) {
        console.log("Validating password...");

        // Split the stored hash to extract salt and cost factor
        const parts = storedHash.split('$');
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
    },

    // Example usage to test
    async exampleUsage() {
        const password = "testPassword";
        const salt = this.generateSalt(16);  // Generate a simple salt
        const costFactor = 10;  // Simulate bcrypt's cost factor (2^10 rounds)

        console.log("Generated Salt:", salt);

        // Simulate bcrypt password hashing
        const hashedPassword = await this.bcryptSimulator(password, salt, costFactor);
        console.log("Final Hashed Password:", hashedPassword);

        // Now, validate the entered password
        const isValid = await this.validatePassword(password, hashedPassword);
        console.log("Password is valid:", isValid);
    }
};

// ------------------------------------------------------------
// Simplified bcrypt simulator for testing purposes
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

