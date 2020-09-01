const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

//signup Logic

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

//Login Logic
exports.signin = (req, res) => {
  //find the user based on Email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist please signup",
      });
    }
    //if User is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }
    // generate a signed token with user id
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return response with user and token to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//Logout Logic
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signout success" });
};

//---requireSignin !----- (user can view other users profiles while he is signed in )

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//is Authenticated Permission  (user cant see other usres profiles while he is signed in (he can see only his profile))
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  //console.log(req.auth);
  if (!user) {
    return res.status(403).json({
      error: "Acces Denied",
    });
  }
  next();
};

//Is Admin Permission
exports.isAdmin = (req, res, next) => {
  
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource ! Access Denied",
    });
  }
  next();
};
