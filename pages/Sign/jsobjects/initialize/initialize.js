export default {
    defaultTab: 'Canvas2',  // Define defaultTab here

    // Initialize function to set the default tab
    initialize() {
        console.log('Initializing with default tab set to Sign In');
        this.setDefaultTab('Canvas2');  // Set the default tab to 'Sign In' page
    },

    // Function to switch between Sign In (Canvas2) and Sign Up (Canvas3) tabs
    setDefaultTab(newTab) {
        if (newTab === 'Canvas2' || newTab === 'Canvas3') {
            this.defaultTab = newTab;  // Set the new default tab
        } else {
            console.error('Invalid tab name:', newTab);
        }
    }
};


// ------------------------------------------------------------
// Combined function: Initialize and Set Default Tab
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// -------------
