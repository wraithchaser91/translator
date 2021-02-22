import {Popup} from "/js/modules/popup.js";
import {createElement} from "/js/functions.js";
import {createTempForm} from "/js/serverfunctions.js";

let item = -1;
let startDelete = () =>{
    if(item == -1)return;
    createTempForm(`${item.dataset.id}?_method=DELETE`, [{}])
}

let openPopup = i =>{
    item = i;
    popup.open();
    if(!isMouse){
        popup.focus(item);
        button.focus();
    }
}

let popup = new Popup();

let content = createElement("div", {state:"hidden", id:"popupContent"});
content.appendChild(createElement("h3", {text:"Are you sure?"}));
content.appendChild(createElement("p", {innerHTML:"This action is irreversible,<br> are you sure you wish to continue?"}));
let button = createElement("button", {text:"Continue", id:"confirm"});
button.addEventListener("click", ()=>startDelete());
content.appendChild(button);
popup.setContent(content);

let isMouse = true;
[...document.querySelectorAll(".deleteButton")].forEach(item=>{
    item.addEventListener("click", ()=>openPopup(item));
})

//Captures 'Enter' events. This is to find out if the popup was opened via a focus-fire event or not
//Reset to assumed default mouse if not Enter key 
document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter" || e.key == "NumpadEnter"){
        isMouse = false;
        e.stopPropagation();
    }else{
        isMouse = true;
    }
});

//Reset to assumed default mouse if a click event occurs
document.addEventListener("click", ()=>{
    isMouse = true;
})