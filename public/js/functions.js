import {addMessage} from "./messages.js";
import {addInputListeners} from "./numInputFunctions.js";

let findDevice = () =>{
    let width = window.screen.availWidth;
    if(width >= 768 && width < 1025) return "tablet";
    else if(width < 767) return "mobile";
    return "desktop"
}

let sendGetFetch = (route, fun) =>{
    fetch(route, {method: "get",headers: {'Content-Type': 'application/json'}})
    .then(response =>{
        if(response.status == 200)return response.json();
        else throw new Error("Fetch error");
    })
    .then(data => {
        if(data.status == 200)fun(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.log(error);
        addMessage("error", error);
    });
}

let sendPostFetch = (route, content, fun, waiter=null) =>{
    fetch(route, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(content)})
    .then(response =>{
        if(waiter)waiter.close();
        if(response.status == 200) return response.json();
        else throw new Error("Fetch error");
    })
    .then(data => {
        if(data.status == 200) fun(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.log(error);
        addMessage("error", error);
    });
}

/*******HTML creation elements*******/
let createElement = (type,data={}) =>{
    let ele = document.createElement(type);
    if(data.classList)ele.classList = data.classList;
    if(data.id)ele.id = data.id;
    if(data.text)ele.textContent = data.text;
    if(data.role)ele.role = data.role;
    if(data.type)ele.type = data.type;
    if(data.name)ele.name = data.name;
    if(data.value)ele.value = data.value;
    if(data.type)ele.type = data.type;
    if(data.placeholder)ele.placeholder = data.placeholder;
    if(data.min)ele.min = data.min;
    if(data.max)ele.max = data.max;
    if(data.title)ele.title = data.title;

    if(type=="input" && data.classList && data.classList.includes("numFocus"))addInputListeners(ele);

    return ele;
}

/******Calculates how far a user has scrolled down the screen, useful for any lazy loading that may be needed*******/
let h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
let getPerc = (ele=null) =>{
    if(ele){
        let maxScroll = ele.scrollHeight - parseInt(window.getComputedStyle(ele).height.replace("px", ""));
        return ele.scrollTop / maxScroll * 100;
    }
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

export{
    findDevice,
    sendGetFetch,
    sendPostFetch,
    createElement,
    getPerc
}