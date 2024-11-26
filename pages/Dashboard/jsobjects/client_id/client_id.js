export default {
    async fetchAndSetClientId() {
        try {
            const userID = appsmith.store.userID;
            console.log('Fetched userID from store:', userID);  // Log the fetched userID

            if (userID && userID !== '1') {  // Check that the userID is valid (not '1')
                console.log('Storing userID as clientId:', userID);  // Log to confirm storing
                storeValue("clientId", userID);  // Store userID as clientId
                return userID;
            } else {
                console.log('No valid userID found in store, running DB query...');
                const result = await getClientIdFromDB.run();

                if (result && result.length > 0) {
                    const clientId = result[0].client_id;
                    console.log("Fetched clientId from DB:", clientId);  // Log fetched clientId from DB
                    storeValue("clientId", clientId);  // Store the fetched clientId
                    return clientId;
                } else {
                    console.log('No clientId found in DB. Returning null');
                    return null;  // Instead of defaulting to '1', return null or handle this in the UI
                }
            }
        } catch (error) {
            console.error('Error fetching client ID:', error);
            return null;  // Return null in case of an error
        }
    },

    async getClientId() {
        console.log('Checking if clientId is stored in appsmith.store...');
        if (appsmith.store.clientId && appsmith.store.clientId !== '1') {  // Ensure valid clientId
            console.log('Using stored clientId:', appsmith.store.clientId);  // Log stored clientId
            return appsmith.store.clientId;
        } else {
            console.log('No valid clientId found in store, fetching from DB or default...');
            return await this.fetchAndSetClientId();  // Fetch and set clientId if not available
        }
    },

    
};

// ------------------------------------------------------------
// client_id.js - Fetching, logging, and clearing userID/clientId with enhanced error handling
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


