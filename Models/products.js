const fsPromises = require('fs').promises;
let categories = require("../Data/Yad2.json");

class products {
    num;
    name;
    price;
    description;

    constructor(num, name, price, description) {
        this.num = num;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    async save(newProduct, categoryResult) {
        if (!categories[categoryResult].products) {
            categories[categoryResult].products = [];
        }
        categories[categoryResult].products.push(newProduct);
        await fsPromises.writeFile("./Data/Yad2.json", JSON.stringify(categories, null, 2));
    }
}

module.exports = { products };