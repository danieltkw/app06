export default {
  // Products page   

  // Flag to check if we are in test mode
  isTestMode: false,

  // Function to fetch product details from the backend
  async getProductDetails() {
    try {
      const response = await fetch('/api/products'); // Replace with your actual API call
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return [];
    }
  },

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
  getProducts: async function () {
    console.clear();
    
    try {
      // Ensure the user is authenticated before proceeding
      this.checkAuthAndRedirect();  // <-- Inserted the check here

      // Fetch products using the configured query (No longer using clientId)
      const products = await getProductsWithStock.run(); 

      // Return all products
      return products.map(p => {
        return {
          ID: this.idConverter(p.id),
          Name: p.name,
          SKU: p.sku,
          Category: p.category,
          UnitPrice: p.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
          Stock: p.total_stock,
          ProductID: p.id,
        };
      });

    } catch (error) {
      console.error('Error in getProducts:', error);
      return [];
    }
  },

  // Add the authentication check here
  checkAuthAndRedirect: function () {
    if (storeValue('userID')) {
      // User is authenticated
      console.log('User is authenticated.');
    } else {
      // User is not authenticated, redirect to the login page
      navigateTo('LoginPage', {}, 'SAME_WINDOW');
    }
  },

  // Function to add product to cart
  addToCart: function (productId, quantity) {
    let cart = storeValue("cart", []);
    let product = cart.find(item => item.productId === productId);

    if (product) {
      // Update the quantity if the product is already in the cart
      product.quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({ productId, quantity });
    }

    // Save updated cart to store
    storeValue("cart", cart);
    showAlert(`Added ${quantity} item(s) to the cart!`, 'success');
  },

  // Function to fetch cart and calculate total
  getCartSummary: function () {
    let cart = storeValue("cart", []);
    return cart.map(item => {
      let product = this.getProductById(item.productId);  // Fetch product details by ID
      return {
        ...product,
        quantity: item.quantity,
        totalPrice: item.quantity * product.price
      };
    });
  },

  // Checkout function to proceed to payment
  checkout: function () {
    let cart = storeValue("cart", []);
    let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Display order summary and proceed to payment
    showModal("OrderSummaryModal", { cart, total });
  },

  // Function to fetch product by ID (For cart summary)
  getProductById: function (productId) {
    let products = storeValue('products', []);
    return products.find(p => p.id === productId);
  },

  // Function to validate stock availability
  validateStock: async function (productId, requestedQuantity) {
    const product = await getProductDetailsById(productId); // Fetch product details
    if (product.total_stock < requestedQuantity) {
      showAlert('Not enough stock available', 'error');
      return false;
    }
    return true; // Stock is sufficient
  }
};


// // ------------------------------------------------------------

// Products 

// // ------------------------------------------------------------
// // Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// // ------------------------------------------------------------






