const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controller/users.js");

router.route("/signup")
// Route for signupform
.get( userController.signupForm)
//signup User
.post(wrapAsync(userController.signupUser));

router.route("/login")
//login Form
.get(userController.loginForm)
// Login
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login", 
        failureFlash: true}),
        userController.loginUser,       
);

router.get("/logout", userController.logoutUser);

module.exports = router;