export default {
    async signIn() {
        const email = inp_email.text.trim();
        const password = inp_password.text.trim();
        
        console.log('Entered Email:', email);
        console.log('Entered Password:', password);
        //showAlert('SignIn function started');

        try {
            const result = await SignIn_sql.run({ email });

            if (result.length > 0) {
                const user = result[0];
                const storedHash = user.password_hash;

                console.log('User found:', user);
                // console.log('Stored Hash:', storedHash);
               // showAlert('Stored Hash: ' + storedHash);

                const isPasswordValid = dcodeIO.bcrypt.compareSync(password, storedHash);

                // console.log('Password Comparison Result:', isPasswordValid);
                // showAlert('Password comparison result: ' + isPasswordValid);

                if (isPasswordValid) {
                    showAlert('Login bem-sucedido!', 'success');
                    const userID = user.vat_number;
                    console.log('Storing userID:', userID);  // Added log for userID
                    await storeValue('userID', userID);
                    navigateTo('Dashboard', { user_id: userID }, 'SAME_WINDOW');
                } else {
                    showAlert('Senha inválida', 'error');
                    console.log('Password mismatch.');
                }
            } else {
                showAlert('Usuário não encontrado', 'error');
                console.log('User not found with email:', email);
            }
        } catch (error) {
            console.error('Error during login:', error);
            showAlert('Ocorreu um erro durante o login: ' + error, 'error');
        }
    }
};


// ------------------------------------------------------------
// Login function with improved logging for userID and password comparison
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------



