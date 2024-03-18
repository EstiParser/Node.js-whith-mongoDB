const fsPromises = require('fs').promises;
const categories = require('../Data/Yad2.json');
const { products } = require('../Models/products');
const { Yad2Model } = require('../Models/Yad2Model');

const getProductsFromSpecificCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const categories = await Yad2Model.find({ category: categoryName }).exec();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryNames = categories.map(c => c.category);
    categoryNames.sort();

    res.json(categoryNames);
  } catch (error) {
    console.error("Error fetching products from specific category:", error);
    res.status(500).json({ message: "Failed to retrieve products from specific category" });
  }
}



const getSpecificProductsFromSpecificCategory = async (req, res) => {
  const categoryName = req.params.categoryName;
  const productName = req.params.productName;

  try {
    const specificCategory = await Yad2Model.findOne({ category: categoryName }).exec();

    if (!specificCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const specificProduct = specificCategory.products.find(product => product.name === productName);

    if (!specificProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(specificProduct);
  } catch (error) {
    console.error("Error fetching specific product:", error);
    res.status(500).json({ message: "Failed to retrieve specific product" });
  }
}


const deleteProductsFromSpecificCategory = async (req, res) => {
  const categoryName = req.params.categoryName;
  const productName = req.params.productName;
  try {
    const result = await Yad2Model.findOne({ category: categoryName }).exec();

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    const index = result.products.findIndex(f => f.name == productName);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    result.products.splice(index, 1);
    await result.save();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
}

const addProductToSpecificCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const result = await Yad2Model.findOne({ category: categoryName }).exec();
    const newProduct = {
      num: products.length,
      name: req.body?.name || "",
      description: req.body?.description || ""
    };

    const p = new products(newProduct.num, newProduct.name, newProduct.description);

    result.products.push(p);
    await result.save();

    res.json(newProduct);
  }

  catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Failed to add product");
  }

}

const updateProductByproductNum = async (req, res) => {
  const categoryName = req.params.categoryName;
  console.log(categoryName);

  const productName = req.params.productName;
  console.log(productName);

  const change = req.body;
  console.log(change);
 
  try {
    const result = await Yad2Model.findOne({ category: categoryName }).exec();

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    const index = result.products.findIndex(f => f.name == productName);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Yad2Model.updateOne(
      { "products.name": productName },
      { $set: { "products.$.name": change.name, "products.$.description": change.description } }
    );

    res.status(200).json({ message: `Category ${categoryName} updated successfully to ${change}` });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
}

module.exports = {
  getProductsFromSpecificCategory, getSpecificProductsFromSpecificCategory
  , deleteProductsFromSpecificCategory, addProductToSpecificCategory, updateProductByproductNum
}







