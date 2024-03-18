const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: String,
    products: [{
    num: Number,
    name: String,
    description: String
  }]
});

const Yad2Model = mongoose.model("products", categorySchema);
module.exports = {Yad2Model};