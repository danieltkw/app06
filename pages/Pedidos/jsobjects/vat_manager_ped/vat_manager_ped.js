export default {
    // Function to evaluate the current VAT and switch to a test VAT if needed
    async evaluateVAT() {
        let vatNumber = appsmith.store.vat_number; // Retrieve current VAT number from the store

        if (!vatNumber) {
            // If no VAT number is stored, generate the test VAT number
            vatNumber = "307277003"; // Default test VAT
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
    },

    // Function to manually switch to a testing VAT number if needed
    async switchToTestVAT() {
        const testVAT = "307277003";
        storeValue('vat_number', testVAT); // Switch to test VAT
        showAlert(`Switched to test VAT number: ${testVAT}`, 'success');
    }
};

// ------------------------------------------------------------
// This file manages VAT switching between the actual VAT number and a test VAT number.
// File name: vat_manager_ped.js
// ------------------------------------------------------------

