const path = require("path");
const { body, check } = require("express-validator");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", authMiddleware, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", authMiddleware, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  authMiddleware,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  authMiddleware,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  authMiddleware,
  adminController.postEditProduct
);

router.post(
  "/delete-product",
  authMiddleware,
  adminController.postDeleteProduct
);

module.exports = router;
