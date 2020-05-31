let sanitize = require("mongo-sanitize");

cleanBody = (req, res, next) =>{
    req.body = sanitize(req.body);
    next();
}

module.exports = {
    cleanBody
}