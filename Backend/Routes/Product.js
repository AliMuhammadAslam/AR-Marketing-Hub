const express = require("express"),
router = express.Router();


// Importing controller
const productController = require('../Controller/Product');

// Browse products
//router.get("/product_details", productController.getProducts);

// Fetch books by search value
//router.post("/books/:filter/:value/:page", productController.findProducts);

// Fetch individual book details
//router.get("/books/details/:book_id", productController.getProductDetails);

module.exports = router;