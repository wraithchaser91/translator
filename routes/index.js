const express = require("express");
const router = express.Router();
const {render} = require("../utils.js");
const {checkAuthentication} = require("../middleware");

router.get("/", checkAuthentication, async(req, res)=>{
    render(req,res,"index");
});

module.exports = router;