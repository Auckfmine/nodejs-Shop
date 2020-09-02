const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Create Category
exports.create = (req, res) => {
  const category = new Category(req.body);

  category.save((err, data) => {
    //in case any error happens
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    //response after a category has been created
    res.json({ data });
  });
};

//get specific category by its ID (middleware)
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: " category Does Not Exist",
      });
    }

    req.category = category;
    next();
  });
};

// read  category
exports.read = (req, res) => {
  res.json(req.category);
};

// get All categories in the Data Base
exports.readAll = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

//Delete specific Category
exports.remove = (req, res) => {
  Category.findByIdAndDelete(req.params.categoryId, (err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Category Deleted Successfully",
    });
  });
};

//update Specific Category
exports.update = (req, res) => {
  Category.findByIdAndUpdate(
    req.category._id,
    { $set: req.body },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json({
        message: "Category Updated Successfully",
      });
    }
  );
};
