const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  });
};

exports.readProfile = (req, res) => {
  User.findById(req.profile._id, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    { $set: req.body },
    { new: true },
    (err, updatedProfile) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      updatedProfile.hashed_password = undefined;
      updatedProfile.salt = undefined;
      res.json({
        success: true,
        updatedProfile,
      });
    }
  );
};
