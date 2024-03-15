const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

// const productSchema = mongoose.Schema({
//   name: String,
//   price: Number,
//   breed: String , 
//   color: String, 
//   image: String,
// });




// With array 
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  breed: String,
  color: String,
  images: [String], // Array to store multiple image URLs
});


const Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.Product = Product;
module.exports.validate = validateProduct;