const path = require("path");
const express = require("express");
const router = require("./admin");
const authController = require("../controllers/auth");
const { check, body } = require("express-validator");
const { emailValidation } = require("../validation/signUpValidations");
const User = require("../models/user");

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);
router.post("/logout", authController.postLogout);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address if forbitten");
        // }
        //return true;

        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exist!");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      '"Please enter a password with only numbers and text and at least 5 characters"'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match!");
        }
        return true;
      }),
  ],
  authController.postSignUp
);
router.get("/signup", authController.getSignUp);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
