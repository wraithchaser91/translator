const express = require("express");
const router = express.Router();
const Basic = require("../models/basic");
const {cleanBody} = require("../middleware");
const errors = require("../errors");

router.get("/", async(req, res)=>{
    let list;
    try{
        list = await Basic.find({});
        list = list.reverse();
    }catch(e){
        console.log(e);
        res.render("error", {error: errors.internalServerError});
        return;
    }
    res.render("index", {list});
});

router.post("/", cleanBody, async(req,res)=>{
    let basic = new Basic({
        name: req.body.name
    });
    try{
        await basic.save();
    }catch(e){
        console.log(e);
    }
    res.redirect("/");
});

module.exports = router;