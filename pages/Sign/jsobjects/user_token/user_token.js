export default {
    // Function to create a JWT token
    async createToken(user) {
        try {
            // Example payload, including user data like ID and email
            const payload = {
                userId: user.vat_number,  // Assuming 'vat_number' is the user ID
                email: user.email
            };
            
            const secret = 'your_secret_key';  // Replace with your actual secret key
            
            // Options for the token (e.g., expiration time)
            const options = {
                expiresIn: '1h'  // Token will expire in 1 hour
            };
            
            // Generate the JWT token using jsonwebtoken
            const token = jsonwebtoken.sign(payload, secret, options);
            console.log('Generated Token:', token);  // Log the generated token for debugging
            
            return token;  // Return the generated token
            
        } catch (error) {
            console.error('Error creating token:', error);  // Log any errors that occur
            return null;  // Return null if token creation fails
        }
    }
};

// ------------------------------------------------------------
// JWT Token creation function
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------

