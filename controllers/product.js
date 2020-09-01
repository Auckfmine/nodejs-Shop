const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");


// add a prodcut based on  users ID 
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: " all fields are required",
      });
    }

    let product = new Product(fields);

    //1kb = 1000
    //1mb ==1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: " image must be less then 1 mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json({ product });
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next();
  });
};

//read specific product
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};


// remove specific product by ID
exports.remove = (req, res) => {
  Product.findByIdAndDelete(req.product._id).exec((err, msg) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "product deleted successfully",
    });
  });
};

//update product based on ProductId
exports.update = (req, res) => {
  Product.findByIdAndUpdate(req.params.productId, { $set: req.body }).exec(
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json({
        message: "Product Updated Succefully ",
      });
    }
  );
};

//get all products
exports.readAll = (req, res) => {
  Product.find((err, products) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({products});
  });
};
