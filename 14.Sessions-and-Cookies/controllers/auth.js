const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = async (req, res, next) => {
  await User.findById("67b4cef85b426d77532bb2d0").then((user) => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect("/");
  });
};
exports.postLogout = async (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect("/");
  });
};
