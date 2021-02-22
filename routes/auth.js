
const router = require("express").Router();
const passport = require("passport");
const {checkUnAuthenticated} = require("../middleware");

//method override
const methodOverride = require("method-override");
const { render, errorLog } = require("../utils");
router.use(methodOverride("_method"));

router.get("/login", (req,res)=>{
    render(req,res, "auth/login");
});

router.post("/login", checkUnAuthenticated, async(req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            return next(err); 
        }
        if(!user){
            errorLog(req,`Login failed: Invalid Credentials`);
            return res.redirect(`/auth/login`);
        }
        req.logIn(user, async(err)=>{
            if(err){
                return next(err); 
            }
            return res.redirect(`/`);
        });
    })(req, res, next);
});

//logout route
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect(`/auth/login`);
});

module.exports = router;