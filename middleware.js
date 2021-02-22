let sanitize = require("mongo-sanitize");

let cleanBody = (req, res, next) =>{
    req.body = sanitize(req.body);
    next();
}

let checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect(`/auth/login`);
    }
}

let checkUnAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect(`/`);
    }
}

let checkAdmin = (req, res, next) =>{
    if(typeof req.user == "undefined"){
        res.redirect(`/`);
    }else{
        if(req.user.permissionLevel > 1){
            return next();
        }else {
            res.redirect("/auth/login");
        }
    }
}

let checkTemporaryPassword = (req, res, next) =>{
    if(typeof req.user == "undefined"){
        res.redirect(`/`);
    }else{
        if(!req.user.temporaryPassword){
            return next();
        }else {
            res.redirect(`/auth/temporarypassword`);
        }
    }
}

const {
    createServerFailObj,
} = require("./utils.js");

const ACCESS_TOKEN = "7avxzkiia0besb8l3mczuh";
let checkPermissionForAccess = async(req,res,next) =>{
    if(!req.user){
        if(req.body.access_token != ACCESS_TOKEN && req.query.access_token != ACCESS_TOKEN){
            res.send(createServerFailObj({statusText:`No access to the server`}))
            return;
        }
    }
    return next();
}

module.exports = {
    checkAuthentication,
    checkUnAuthenticated,
    checkAdmin,
    checkTemporaryPassword,
    cleanBody,
    checkPermissionForAccess
}