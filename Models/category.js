const fsPromises = require('fs').promises;
let categories = require("../Data/Yad2.json");

class category {
  category;
  products;

  constructor(categoryName) {
    this.category = categoryName;
    this.products = [];
  }

  async save() {
    categories.push({ category: this.category, products: [] });
    await fsPromises.writeFile("./Data/Yad2.json", JSON.stringify(categories, null, 2));
  }
}

module.exports = { category };

  