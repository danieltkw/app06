export default {
  // Function to fetch products and update the products table in the UI
  async loadProducts() {
    try {
      // Fetch products using the SQL query
      const products = await getProducts.run();

      // Format the fetched products to be compatible with the UI
      const formattedProducts = products.map((p) => {
        return {
          ID: this.idConverter(p.id),
          Name: p.name,
          SKU: p.sku,
          Category: p.category,
          UnitPrice: p.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" }),
          Stock: p.total_stock,
          ProductID: p.id,
        };
      });

      // Store formatted products to Appsmith store for potential reuse
      storeValue("fetchedProducts", formattedProducts);
      console.log("Products loaded successfully:", formattedProducts);

      // Set the table data using setData instead of direct assignment
      tbl_products.setData(formattedProducts);
    } catch (error) {
      console.error("Error in loadProducts:", error);
    }
  },

  // Function to convert ID to a formatted string with a 'P' prefix
  idConverter: function (num) {
    if (num === undefined || num === null) {
      console.error("idConverter: num is undefined or null");
      return "";
    }
    let str = num.toString();
    let leadingZeros = "00000".substring(0, 5 - str.length);
    return "P" + leadingZeros + str;
  },
};

// ------------------------------------------------------------
// Main product operations
// File name: productOperations.js
// ------------------------------------------------------------

