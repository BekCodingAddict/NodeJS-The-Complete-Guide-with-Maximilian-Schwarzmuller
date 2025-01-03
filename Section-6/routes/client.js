const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utils/path");
const adminData = require("./admin");

router.get("/about", (req, res, next) => {
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(rootDir, "views", "about.html"));
});

router.get("/contact", (req, res, next) => {
  res.sendFile(path.resolve(rootDir, "views", "contact.html"));
});

router.post("/send-message", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
  res.send({
    success: true,
    message: "Your message successfully sended!",
  });
});

router.get("/products", (req, res, next) => {
  res.sendFile(path.resolve(rootDir, "views", "products.html"));
});

router.get("/products-pug", (req, res, next) => {
  const products = adminData.products;
  res.render("products", {
    products,
    docTitle: "Products",
    path: "/products-pug",
  });
});

router.get("/404-handlebars", (req, res, next) => {
  res.render("./handlebars/404", { pageTitle: "Page not fount" });
});

router.get("/products-hbs", (req, res, next) => {
  const products = adminData.products;
  res.render("./handlebars/products", {
    pageTitle: "Our Products - World Wise",
    hasProducts: adminData.products.length > 0,
    products,
  });
});

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(rootDir, "views", "index.html"));
});

module.exports = router;
