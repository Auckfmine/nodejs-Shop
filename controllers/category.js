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
