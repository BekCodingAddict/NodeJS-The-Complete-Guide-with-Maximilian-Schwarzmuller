const path = require("path");
const {
  addProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
} = require("../controllers/admin");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", addProduct);
router.get("/products", getProducts);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);
exports.routes = router;
