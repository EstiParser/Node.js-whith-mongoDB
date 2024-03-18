const express = require('express');
const router = express.Router();
const productsController = require("../Controllers/productsController");
const middlewareToken = require('../middlewares/middlewareToken');

router.use(middlewareToken);
router.get('/:categoryName/:productName', productsController.getSpecificProductsFromSpecificCategory);
router.use(middlewareToken);
router.get('/:categoryName', productsController.getProductsFromSpecificCategory);
router.use(middlewareToken);
router.post('/:categoryName', productsController.addProductToSpecificCategory);
router.use(middlewareToken);
router.delete('/:categoryName/:productName', productsController.deleteProductsFromSpecificCategory);
router.use(middlewareToken);
router.put('/:categoryName/:productName', productsController.updateProductByproductNum);

module.exports = router;
