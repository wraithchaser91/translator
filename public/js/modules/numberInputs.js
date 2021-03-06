/*Makes inputs work how a user would expect*/
let addNumberInputListeners = item =>{
    item.addEventListener("focus", ()=>{
        setTimeout(()=>{
            item.select();
        },100)
    })
    item.addEventListener("input", ()=>{
        if(parseInt(item.value) > parseInt(item.max))item.value = item.max;
        if(parseInt(item.value) < parseInt(item.min))item.value = item.min;
    });
    item.addEventListener("blur", ()=> {if(item.value == "")item.value = item.min;})
    item.addEventListener("wheel", ()=> {})
}

let configureAllNumInputs = className =>{
    Array.from(document.querySelectorAll(`.${className}`)).map(item=>addNumberInputListeners(item));
}

export{
    configureAllNumInputs
}