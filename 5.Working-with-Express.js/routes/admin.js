const express = require("express");
const path = require("path");

const router = express.Router();

router.use("/add-product", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "staticFiles", "addProduct.html"));
});
router.use("/add-new-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
