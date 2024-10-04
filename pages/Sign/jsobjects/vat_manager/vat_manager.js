export default {
    // Function to evaluate the current VAT and switch to a test VAT if needed
    async evaluateVAT() {
        let vatNumber = appsmith.store.vat_number; // Retrieve current VAT number from the store

        if (!vatNumber) {
            // If no VAT number is stored, randomly generate one for testing (for now, using the test VAT)
            vatNumber = "307277003"; // Use this as the default test VAT
            storeValue('vat_number', vatNumber); // Save the test VAT in the Appsmith store
            showAlert(`Using test VAT number: ${vatNumber}`, 'info');
        } else {
            // Logic to switch between actual and testing VAT
            if (vatNumber === "307277003") {
                showAlert('Currently using test VAT number', 'info');
            } else {
                showAlert(`Currently using real VAT number: ${vatNumber}`, 'success');
            }
        }

        // Display the VAT number in the title
        txt_productsTitle.setText(`Produtos - ${vatNumber}`);
    },

    // Function to manually switch to a testing VAT number if needed
    async switchToTestVAT() {
        const testVAT = "307277003";
        storeValue('vat_number', testVAT); // Switch to test VAT
        showAlert(`Switched to test VAT number: ${testVAT}`, 'success');

        // Update the title with the test VAT number
        txt_productsTitle.setText(`Produtos - ${testVAT}`);
    }
};

// ------------------------------------------------------------
// This file contains two functions:
// 1. evaluateVAT: Evaluates the current VAT number in use, saves it, and switches to a test VAT if needed.
// 2. switchToTestVAT: Manually switches to the test VAT number.
// File name: vat_manager.js
// ------------------------------------------------------------