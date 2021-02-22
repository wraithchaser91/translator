let render = async(req, res, target, json={}) =>{
    res.render(target, Object.assign({
        user:req.user,
        message:req.flash(),
        location: req.originalUrl,
        device: req.device.type,
    },json));
}

let log = (req, message) =>{
    req.flash("info", message);
}

let errorLog = (req,message) =>{
    console.error(`Error log: ${message}`);
    req.flash("error", message);
}

let createSuccessObj = (json={}) =>{
    return Object.assign({
        status:200,
        statusText:"OK",
        ok: true,
    },json)
}

let createFailureObj = (status, statusText, ok, json={}) =>{
    return Object.assign({
        status,
        statusText,
        ok,
    },json)
}

let createServerFailObj= (json={}) =>{
    return Object.assign({
        status: 500,
        statusText: "Error occured",
        ok: false,
    },json)
}

let success = (res, obj = {}) =>{
    res.send(createSuccessObj(obj));
}

let failure = (res, status, statusText, obj) =>{
    res.send(createFailureObj(status, statusText, false, obj));
};

let serverFailure = (res,statusText="There was a server error") =>{
    res.send(createServerFailObj({statusText}));
}

let formatDate = date =>{
    return date.toString().split(" ").slice(0,5).join(" ");
}

module.exports = {
    render,
    createFailureObj,
    createServerFailObj,
    createSuccessObj,
    log,
    errorLog,
    formatDate,
    success,
    failure,
    serverFailure
}