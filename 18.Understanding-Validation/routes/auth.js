const path = require("path");
const express = require("express");
const router = require("./admin");
const authController = require("../controllers/auth");
const { check } = require("express-validator");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.post("/signup", check("email").isEmail(), authController.postSignUp);
router.get("/signup", authController.getSignUp);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
