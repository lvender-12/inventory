const express = require('express')
const router = express.Router();
const productsController = require('../controller/productsController')
const categoriesController = require('../controller/categoriesController')

router.get('/product', productsController.GetAllProducts);
router.get('/product/add', categoriesController.GetAllCategories);
router.post('/product/add', productsController.AddProduct)

module.exports = router