export default {
    async fetchAndSetClientId() {
        try {
            const userID = appsmith.store.userID;
            console.log('Fetched userID from store:', userID);  // Log the fetched userID

            if (userID && userID !== '1') {
                console.log('Storing userID as clientId:', userID);  // Store as clientId
                storeValue("clientId", userID);  // Store userID as clientId
                return userID;
            } else {
                console.log('No valid userID found, running DB query...');
                const result = await getClientIdFromDB.run();

                if (result && result.length > 0) {
                    const clientId = result[0].client_id;
                    console.log("Fetched clientId from DB:", clientId);
                    storeValue("clientId", clientId);  // Store fetched clientId
                    return clientId;
                } else {
                    console.log('No clientId found. Returning null');
                    return null;
                }
            }
        } catch (error) {
            console.error('Error fetching client ID:', error);
            return null;
        }
    },

    async getClientId() {
        console.log('Checking if clientId is stored...');
        if (appsmith.store.clientId && appsmith.store.clientId !== '1') {
            console.log('Using stored clientId:', appsmith.store.clientId);
            return appsmith.store.clientId;
        } else {
            console.log('Fetching clientId from DB...');
            return await this.fetchAndSetClientId();
        }
    }
};

// ------------------------------------------------------------
// client_id_c.js - Ensuring consistent use of clientId
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


