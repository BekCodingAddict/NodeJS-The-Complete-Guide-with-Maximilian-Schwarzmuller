const path = require("path");
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
} = require("../controllers/shop");
const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);

module.exports = router;
