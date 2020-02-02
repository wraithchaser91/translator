const router = require("express").Router();
const Site = require("../models/Site");


router.get("/", (req, res) =>{
    let obj = {
        site:"/site/:id"
    };
    res.send(JSON.stringify(obj));
});

router.get("/site/:id", async(req, res) =>{
    let site;
    try{
        site = await Site.findById(req.params.id);
    }catch(e){
        errorLog(e);
    }
    res.send(site);
});

errorLog = error => console.log("ERROR: " + error);
module.exports = router;