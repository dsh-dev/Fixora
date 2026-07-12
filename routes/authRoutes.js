const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
console.log(authController);
router.get("/register", (req, res) => {

    res.render("register");

});

router.get("/login", (req, res) => {

    res.render("login");

});
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", (req, res) => {

    res.clearCookie("token");

    res.redirect("/login");

});
module.exports = router;