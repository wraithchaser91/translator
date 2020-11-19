/*Makes inputs work how a user would expect*/
let addInputListeners = item =>{
    item.addEventListener("focus", ()=>{
        setTimeout(()=>{
            item.select();
        },100)
    })
    item.addEventListener("keyup", ()=>{
        if(parseInt(item.value) > parseInt(item.max))item.value = item.max;
        if(parseInt(item.value) < parseInt(item.min))item.value = item.min;
    });
    item.addEventListener("blur", ()=> {if(item.value == "")item.value = item.min;})
    item.addEventListener("wheel", ()=> {})
}

let configureAllNumInputs = className =>{
    Array.from(document.querySelectorAll(`.${className}`)).map(item=>addInputListeners(item));
}

export{
    addInputListeners,
    configureAllNumInputs
}