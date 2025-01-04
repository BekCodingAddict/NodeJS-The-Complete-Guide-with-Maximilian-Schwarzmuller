const path = require("path");
const {
  addProduct,
  postAddProduct,
  getProducts,
} = require("../controllers/admin");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", addProduct);
router.get("/products", getProducts);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

exports.routes = router;
