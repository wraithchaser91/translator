const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", async(req,res,next)=>{
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { req.flash("error", `Login failed: ${req.body.username}`); return res.redirect(`/`); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          req.flash("log", `Login success: ${req.body.username}`);
          return res.redirect(`/`);
        });
      })(req, res, next);
});

//logout route
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

module.exports = router;