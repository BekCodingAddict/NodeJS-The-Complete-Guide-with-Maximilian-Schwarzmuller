const { check } = require("express-validator");

exports.emailValidation = (req, res, next) => {
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email!")
    .custom((value, { req }) => {
      if (value === "test@test.com") {
        throw new Error("This email address if forbitten");
      }
      return true;
    });

  next();
};
