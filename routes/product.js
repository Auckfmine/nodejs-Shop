const express = require("express");

const router = express.Router();
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

const {
  create,
  read,
  productById,
  remove,
  update,
  readAll,
  listRelated,
  listCategories,
  listBySearch
} = require("../controllers/product");
const { userById } = require("../controllers/user");


router.post("/products/by/search", listBySearch);
router.get("/products", readAll);
router.get("/product/categories",listCategories)
router.get("product/related/:productId",listRelated) //list products in the same category
router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", isAdmin, remove);
router.put("/product/:productId/:userId", isAdmin, update);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
