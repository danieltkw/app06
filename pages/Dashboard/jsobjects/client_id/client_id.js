export default {
    // Function to fetch and store VAT (clientId)
    async fetchAndSetClientId() {
        try {
            const userID = appsmith.store.userID;  // Get stored VAT (userID) from login
            if (userID) {
                console.log("Fetched userID from store:", userID);
                storeValue("clientId", userID);  // Store the VAT in Appsmith store as clientId
                return userID;
            } else {
                console.log('No userID in store. Fetching from DB');
                const result = await getClientIdFromDB.run(); // Fallback query to fetch the VAT (vat_number)

                if (result && result.length > 0) {
                    const clientId = result[0].client_id; // 'vat_number' as 'client_id'
                    console.log("Fetched clientId from DB:", clientId);
                    storeValue("clientId", clientId); // Store the VAT in Appsmith store
                    return clientId;
                } else {
                    console.log("No result from getClientIdFromDB");
                    const defaultClientId = '1'; // Use '1' as default for testing
                    storeValue("clientId", defaultClientId);
                    return defaultClientId;
                }
            }
        } catch (error) {
            console.error('Error fetching VAT number (client ID):', error);
            const defaultClientId = '1'; // Use '1' as default for testing
            storeValue("clientId", defaultClientId);
            return defaultClientId;
        }
    },

    // Function to get the stored VAT (client ID)
    async getClientId() {
        if (appsmith.store.clientId) {
            console.log('Using stored clientId:', appsmith.store.clientId);
            return appsmith.store.clientId;
        } else {
            return await this.fetchAndSetClientId();  // Fetch and store clientId if not already stored
        }
    }
};

// ------------------------------------------------------------
// client_id.js - Handles fetching and storing client ID
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------
