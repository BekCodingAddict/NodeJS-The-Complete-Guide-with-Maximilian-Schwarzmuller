const Product = require("../models/product");

const addProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;

  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageURL, description, price);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

module.exports = { addProduct, postAddProduct, getProducts };
