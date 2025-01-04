const Product = require("../models/product");

const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};
const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/oreders",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
module.exports = { getProducts, getIndex, getCheckout, getCart, getOrders };
