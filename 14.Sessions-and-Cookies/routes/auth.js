const path = require("path");
const express = require("express");
const router = require("./admin");
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

module.exports = router;
