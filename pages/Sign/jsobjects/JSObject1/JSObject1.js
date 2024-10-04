export default {
    async hashPassword() {
        try {
            const password = inp_registerPassword.text;

            // Hash the password using bcrypt from dcodeIO
            const salt = dcodeIO.bcrypt.genSaltSync(10);
            const passwordHash = dcodeIO.bcrypt.hashSync(password, salt);

            console.log('Generated Password Hash:', passwordHash);  // Debugging

            // Store the hashed password in Appsmith store
            await storeValue('hashedPassword', passwordHash);

            return passwordHash;  // Return the hashed password if needed elsewhere
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    }
};

// ------------------------------------------------------------
// JSObject1: Function for hashing password with bcrypt
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
