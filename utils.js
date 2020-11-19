errorLog = (e,req,res,message,redirect="none") => {
    console.log(`ERROR: ${e}`);
    req.flash("error",message);
    if(redirect != "none"){
        res.redirect(redirect);
        return true;
    }
}

render = async(req, res, target, json={}) =>{
    res.render(target, Object.assign({
        user:req.user,
        message:req.flash()
    },json));
}

createSuccessObj = (json={}) =>{
    return Object.assign({
        status:200,
        statusText:"OK",
        ok: true,
    },json)
}

createFailureObj = (status, statusText, ok, json={}) =>{
    return Object.assign({
        status,
        statusText,
        ok,
    },json)
}

createServerFailObj= (json={}) =>{
    return Object.assign({
        status: 500,
        statusText: "Error occured",
        ok: false,
    },json)
}

module.exports = {
    errorLog,
    render,
    createSuccessObj,
    createFailureObj,
    createServerFailObj
}