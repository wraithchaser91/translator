const router = require("express").Router();
const passport = require("passport");
const {checkUnAuthenticated} = require("../middleware");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const getResults = require("../scraper");

//method override
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/", checkUnAuthenticated, (req, res) =>{
    res.render("index", {css:"login"});
});

//Login
router.post("/login", checkUnAuthenticated, passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

//Register
router.get("/updateskip", async(req, res) =>{
    let type = "";
    if(type == "register"){
        //Register new user
        let username = "ollieD";
        let name = "Oliver Duffin";
        let password = "four";
        let email = "o.duffin@travelbookgroup.com";
        let isTempPassword = true;
        let permissionLevel = 0;

        try{
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            
            let user = new User({
                username,name,email,password:hashedPassword,isTempPassword,permissionLevel
            })
            await user.save();
            res.redirect("/");
        }catch(e){
            errorLog(e);
            res.redirect("/");
        }
    }else if(type == "updateEntry"){
        try{
            let site = await Site.findOne({});
            site.langList = ["German", "French"];
            await site.save();
        }catch(e){
            errorLog(e);
        }
        res.redirect("/");
    }

    else{
        res.redirect("/");
    }
});

router.get("/scraper", async(req, res) =>{
    try{
        let hotelName = "Test Site"
        const site = await Site.findOne({hotelName});
        const data = await getResults(site.pageList);
        res.send(data);
    }catch(e){
        errorLog(e);
        res.redirect("/");
    }
})

//Logout
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

errorLog = error => console.log("ERROR: " + error);

module.exports = router;