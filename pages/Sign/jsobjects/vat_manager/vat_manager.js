export default {
    // Function to evaluate the current VAT and switch to a test VAT if needed
    async evaluateVAT() {
        let vatNumber = appsmith.store.vat_number;  // Retrieve current VAT number from the store

        if (!vatNumber) {
            vatNumber = "307277003";  // Default test VAT number
            storeValue('vat_number', vatNumber);
            showAlert(`Using test VAT number: ${vatNumber}`, 'info');
        } else {
            if (vatNumber === "307277003") {
                showAlert('Currently using test VAT number', 'info');
            } else {
                showAlert(`Currently using real VAT number: ${vatNumber}`, 'success');
            }
        }

        // Optional: Update some title in your UI if needed
        // For now, we removed txt_productsTitle since it was causing errors
    },

    // Function to manually switch to a testing VAT number if needed
    async switchToTestVAT() {
        const testVAT = "307277003";
        storeValue('vat_number', testVAT);  // Switch to test VAT
        showAlert(`Switched to test VAT number: ${testVAT}`, 'success');

        // Optional: Update some title in your UI if needed
        // For now, we removed txt_productsTitle since it was causing errors
    }
};

// ------------------------------------------------------------
// vat_manager.js - Handles VAT number logic
// Removed references to txt_productsTitle to fix undefined errors
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
