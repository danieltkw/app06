export default {
    async getClientId() {
        if (appsmith.store.clientId) {
            return appsmith.store.clientId;
        } else {
            console.error('Client ID not found in store.');
            return 'defaultClientId';  // Return a default client ID if none is found
        }
    }
};

// ------------------------------------------------------------
// This file contains the `getClientId` function to fetch the client ID from the Appsmith store.
// File name: getClientId.js
// ------------------------------------------------------------
