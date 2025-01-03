const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

const products = [
  {
    id: "6fb4",
    productName: "Addidas",
    productPrice: "65 $",
    productDescription: "Free Online Instagram Product Showcase Maker | LightX",
    productImage:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
  },
];

router.use("/add-product", (req, res, next) => {
  res.sendFile(path.resolve(rootDir, "views", "addProduct.html"));
});

router.use("/add-product-pug", (req, res, next) => {
  res.render("addProduct", {
    docTitle: "Add Product",
    path: "/admin/add-product-pug",
  });
});

router.use("/add-product-hbs", (req, res, next) => {
  res.render("./handlebars/addProduct", {
    pageTitle: "Add Product",
    path: "add-product-hbs",
  });
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
