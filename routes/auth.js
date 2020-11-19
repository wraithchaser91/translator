const express = require("express");
const router = express.Router();
const {errorLog, render} = require("../utils.js");
const {checkUnAuthenticated} = require("../middleware");
const passport = require("passport");

//method override
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/login", checkUnAuthenticated, (req,res)=>{
  render(req,res,"auth/login");
});

router.post("/login", checkUnAuthenticated, passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

//logout route
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

module.exports = router;