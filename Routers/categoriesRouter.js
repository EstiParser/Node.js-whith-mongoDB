const express = require('express');
const router = express.Router();
const categoriesController =require("../Controllers/categoriesController");
const middlewareToken = require('../middlewares/middlewareToken');

router.use(middlewareToken);
router.get('/',categoriesController.allCategories);
router.use(middlewareToken);
router.get('/:categoryName',categoriesController.specificCategoryFromCategories);
router.use(middlewareToken);
router.post('/',categoriesController.addCategory);
router.use(middlewareToken);
router.delete('/:categoryName',categoriesController.deleteCategory);
router.use(middlewareToken);
router.put('/:categoryName',categoriesController.updateCategory);


module.exports=router;
