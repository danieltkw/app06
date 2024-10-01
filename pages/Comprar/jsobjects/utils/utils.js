export default {
    // Fetch products from the database and populate the table
    async getProducts() {
        let products = [];
        try {
            const result = await getProducts.run(); // Fetch products using the query defined above
            products = result.map(p => {
                return {
                    Product_ID: p.product_id, 
                    Name: p.name,
                    SKU: p.sku,
                    Category: p.category || 'N/A',
                    Price: p.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
                    Stock: p.total_stock
                };
            });
            Table_products.setData(products); // Use setData to populate the table widget named Table1
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },

    // Triggered when a product row is clicked
    async showProductDetails() {
        const selectedProduct = Table_products.selectedRow; // Get the selected row in the table
        if (selectedProduct) {
            // Store the values in the appsmith store
            storeValue('productName', selectedProduct.Name);  
            storeValue('productSKU', selectedProduct.SKU);  
            storeValue('productCategory', selectedProduct.Category);  
            storeValue('productPrice', selectedProduct.Price);  
            storeValue('productStock', selectedProduct.Stock);  

            // Bind those values using Appsmith store in the UI input fields (in the widget's settings)
            // Example:
            // For inp_addName widget, bind: {{appsmith.store.productName}} in the Default Text field
            
            // Show the product details modal
            showModal('mdl_addProduct');
        } else {
            showAlert('Please select a product to view details.', 'info');
        }
    },

    // Function to add product to the cart (triggered by a button click)
    async addToCart() {
        const selectedProduct = Table_products.selectedRow;
        if (selectedProduct) {
            let cart = appsmith.store.cart || []; // Retrieve existing cart or start with an empty array
            cart.push({
                Product_ID: selectedProduct.Product_ID,
                Name: selectedProduct.Name,
                Price: selectedProduct.Price,
                Quantity: 1 // Default quantity
            });

            storeValue('cart', cart); // Store updated cart in Appsmith store
            showAlert('Product added to cart successfully!', 'success');
        } else {
            showAlert('Please select a product to add to the cart.', 'error');
        }
    }
};

// ------------------------------------------------------------
// Daniel T. K. W. - github.com/danieltkw - danielkopolo95@gmail.com
// ------------------------------------------------------------


