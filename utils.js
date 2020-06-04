errorLog = (e,req,res,message,redirect="none") => {
    console.log(`ERROR: ${e}`);
    req.flash("error",message);
    if(redirect != "none"){
        res.redirect(redirect);
        return true;
    }
}

render = async(req, res, target, json={}) =>{
    try{
        res.render(target, Object.assign({
            user:req.user,
            message:req.flash()
        },json));
    }catch(e){
        errorLog(e);
        res.render(target, Object.assign({
            user:req.user,
            message:req.flash()
        },json));
    }
}

module.exports = {
    errorLog,
    render
}