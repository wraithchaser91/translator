const router = require("express").Router();

const {success, serverFailure} = require("../../utils.js");

router.get("/heartbeat", (req,res)=>{
    try{
        success();
    }catch(e){
        serverFailure(`There was an error checking my hearbeat: ${e}`);
    }
})