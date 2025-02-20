const path = require("path");

const express = require("express");
const router = require("./admin");
const authController = require("../controllers/auth");
router.get("/login", authController.getLogin);

module.exports = router;
