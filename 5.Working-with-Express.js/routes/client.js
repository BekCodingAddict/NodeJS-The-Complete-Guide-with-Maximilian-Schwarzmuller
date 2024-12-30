const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/about", (req, res, next) => {
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(__dirname, "..", "staticFiles", "about.html"));
});

router.get("/contact", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "staticFiles", "contact.html"));
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
  res.sendFile(path.resolve(__dirname, "..", "staticFiles", "products.html"));
});

router.get("/", (req, res, next) => {
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(__dirname, "..", "staticFiles", "index.html"));
});

module.exports = router;
