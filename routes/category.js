const express = require("express");

const router = express.Router();
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

const {
  create,
  read,
  categoryById,
  readAll,
  remove,
  update,
} = require("../controllers/category");
const { userById } = require("../controllers/user");

router.get("/category/getall", readAll);
router.get("/category/:categoryId", read);

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/category/:categoryId/:userId", isAdmin, remove);
router.put("/category/:categoryId/:userId",isAdmin , update)



router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
