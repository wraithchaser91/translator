const router = require("express").Router();
const {checkAuthentication} = require("../middleware.js");
const getResults = require("../scraper");

router.use(checkAuthentication);

router.get("/", (req, res) =>{
    res.render("dashboard", {css:"main"});
});

router.post("/scrape", async (req, res) =>{
    let data;
    try{
    let list = JSON.parse(req.body.pageList);
    data = await getResults(list);
    }catch(e){
        errorLog(e);
    }
    let langs = JSON.parse(req.body.langList);
    if(langs.length == 0){
        res.redirect("/");
        return;
    }
    res.render("scrapedPage", {strings:data, langs});
});

errorLog = error => console.log("ERROR: " + error);
module.exports = router;