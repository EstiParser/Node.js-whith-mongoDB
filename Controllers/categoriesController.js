let categories = require("../Data/Yad2.json");
const fsPromises = require('fs').promises;
const { category } = require('../Models/category');
const { Yad2Model } = require('../Models/Yad2Model');


const allCategories = async (req, res) => {
  try {
    const categorys = await Yad2Model.find();
    console.log('Categorys fetched from MongoDB');
    return categorys;
  }
  catch (error) {
    console.error(`Error in fetching categorys: ${error.message}`);
    throw error;
  }
};

const specificCategoryFromCategories = async (req, res) => {
  const categoryName = req.params.categoryName;
  
  try {
    const productResult = await categories.findOne({ category: categoryName }).exec();
    
    if (!productResult) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(productResult);
  } catch (error) {
    console.error("Error fetching specific category:", error);
    res.status(500).json({ message: "Failed to retrieve specific category" });
  }
};



const addCategory = async (req, res) => {
  const categoryName = req.body.name;

  try {
    const newCategory = new category(categoryName)

    const newcategory = new Yad2Model({
      category: newCategory.category,
      products: newCategory.products
    });

    await newcategory.save();
    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const deleteCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const result = await Yad2Model.findOne({ category: categoryName }).exec();
    await result.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateCategory = async (req, res) => {
  const categoryName = req.params.categoryName;
  const updating = req.body.categoryName;
  try {
    await Yad2Model.updateOne({ category: categoryName }, { $set: { category: updating } });
    res.status(200).json({ message: `Category ${categoryName} updated successfully to ${updating}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  allCategories,
  specificCategoryFromCategories,
  addCategory,
  deleteCategory,
  updateCategory
};
