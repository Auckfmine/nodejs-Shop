const express = require("express");

const router = express.Router();
const { userSignupValidator } = require("../validator/index");
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

// used the user controller inside of the router
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
