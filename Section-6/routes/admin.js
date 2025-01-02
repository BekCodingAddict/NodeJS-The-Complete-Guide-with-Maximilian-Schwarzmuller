const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const { error } = require("console");

const router = express.Router();

const products = [];

router.use("/add-product", (req, res, next) => {
  res.sendFile(path.resolve(rootDir, "views", "addProduct.html"));
});
router.use("/add-new-product", (req, res, next) => {
  fetch("http://localhost:9000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: req.body.productName,
      productPrice: String(`${req.body.productPrice} $`),
      productDescription: req.body.productDescription,
      productImage: req.body.productImage,
    }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log("Posted data:" + data))
    .catch((error) => console.log("Error:" + error));

  products.push({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
  });

  res.redirect("/");
});

exports.routes = router;
exports.products = products;
