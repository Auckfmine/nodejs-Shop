const express = require("express");

const router = express.Router();
const { userById, readProfile, updateProfile } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, readProfile);
router.put("/user/:userId", requireSignin, isAuth, updateProfile);
//this method runs evrytime we have (/:userID) in the route

router.param("userId", userById);

module.exports = router;
