const router = require("express").Router();
const passport = require("passport");
const {checkUnAuthenticated} = require("../middleware");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Site = require("../models/Site");

//method override
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/", checkUnAuthenticated, (req, res) =>{
    res.render("index", {css:"login"});
});

//Login
router.post("/login", checkUnAuthenticated, passport.authenticate("local",{
    successRedirect: "dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

//Register
router.get("/updateskip", async(req, res) =>{
    let type = "updateEntry";
    if(type == "register"){
        //Register new user
        let username = "wraithchaser";
        let name = "Steven Kitchener";
        let password = "karina85";
        let email = "up629021@myport.ac.uk";
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
            let array = [["This", "That", "The other"], [1,2,3,4], [true, false, true]];
            class Test{
                constructor(name){
                    this.name = name;
                }
                printName(){
                    console.log(this.name);
                }
            }
            let testArray = [new Test("One2"),new Test("Me")];
            array.push(testArray);
            site.text = JSON.stringify(array);
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

//Logout
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

errorLog = error => console.log("ERROR: " + error);

module.exports = router;