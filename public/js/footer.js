import {alterState} from "/js/functions.js";
import {addMessage} from "/js/modules/messages.js";
import {configureAllNumInputs} from "/js/modules/numberinputs.js";

if(device == "phone"){
    const hamburger = document.querySelector("#hamburger");
    const header = document.querySelector("header");
    header.addEventListener("click", (e)=>e.stopPropagation());
    let isOpen = false;
    hamburger.addEventListener("click", (e)=>{
        e.stopPropagation();
        isOpen = !isOpen;
        alterState(hamburger, isOpen ? "active" : "inactive");
        alterState(header, isOpen ? "open" : "closed");
    })
    
    document.addEventListener("click", ()=>{
        if(isOpen){
            alterState(hamburger, "inactive");
            alterState(header, "closed");
            isOpen = false;
        }
    });
}
    
configureAllNumInputs("numFocus");

if(message != "")addMessage("info", message);