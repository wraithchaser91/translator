const router = require("express").Router();
const cors = require("cors")
const Site = require("../models/Site");

let corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions));

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