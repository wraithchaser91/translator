const router = require("express").Router();
const {checkAuthentication, checkAdmin} = require("../middleware.js");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Site = require("../models/Site");

router.use(checkAuthentication);
router.use(checkAdmin);

router.get("/", async(req, res) =>{
    let list = [];
    try{
        list = await Site.find({});
    }catch(e){
        errorLog(e);
    }
    res.render("admin", {list, css:"/admin/main"});
});

router.get("/setup", async(req,res) =>{
    res.render("admin/setup", {site: new Site(), css:"admin/setup"});
});

router.post("/setup", async(req, res) =>{
    let username = req.body.username;
    let name = req.body.username;
    try{
        let user = await User.findOne({username});
        if(user){
            let site = new Site({
                hotelName: req.body.hotelName,
                pageList: JSON.parse(req.body.pageList),
                user
            });
            res.render("admin/setup",{site, css:"admin/setup", message:"This property already exists"});
            return;
        }else{
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt);
            user = new User({
                username,name,email:"Temporary",password:hashedPassword,isTempPassword:true,permissionLevel:1
            })
            await user.save();
            let site = new Site({
                hotelName: req.body.hotelName,
                pageList: JSON.parse(req.body.pageList),
                user
            });
            await site.save();
        }
    }catch(e){
        errorLog(e);
    }
    res.redirect("/");
});

router.get("/update/:id", async(req,res) =>{
    try{
        const site = await Site.findById(req.params.id);
        console.log(site);
    }catch(e){
        errorLog(e);
    }
    res.redirect("/admin");
});

errorLog = error => console.log("ERROR: " + error);

module.exports = router;