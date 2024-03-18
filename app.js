const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middlewareTimeandUrl = require('./middlewares/middlewareTimeandUrl');
const middlewareCheak = require('./middlewares/middlewareCheak');
const categories = require("./Routers/categoriesRouter");
const products = require("./Routers/productsRouter");
const authRoute = require("./Routers/auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const mongoURI = 'mongodb://localhost:27017/Category&Product';
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

app.use(middlewareTimeandUrl)
app.use(middlewareCheak)


app.use(authRoute);
app.use(categories);
app.use(products);

app.listen(4006, () => {
  console.log("listening on http://localhost:4006");
});
module.exports = mongoose;




