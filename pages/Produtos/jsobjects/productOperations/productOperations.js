export default {
  // Function to convert ID to a formatted string with a 'P' prefix
  idConverter: (num) => {
    if (num === undefined || num === null) {
      console.error('idConverter: num is undefined or null');
      return '';
    }
    let str = num.toString();
    let leadingZeros = "00000".substring(0, 5 - str.length);
    return 'P' + leadingZeros + str;
  },

  // Function to fetch products
  loadProducts: async function () {
    try {
      // Fetch products using the query
      const products = await getProducts.run();

      // Return all products in the required format
      const formattedProducts = products.map(p => {
        return {
          ID: this.idConverter(p.id),
          Name: p.name,
          SKU: p.sku,
          Category: p.category,
          UnitPrice: p.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
          Stock: p.total_stock,
          ProductID: p.id
        };
      });

      // Save the formatted products into Appsmith store
      storeValue('fetchedProducts', formattedProducts);
    } catch (error) {
      console.error('Error in loadProducts:', error);
    }
  }
};



// ------------------------------------------------------------
// Main product operations
// File name: productOperations.js
// ------------------------------------------------------------
