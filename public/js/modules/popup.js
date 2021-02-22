import {createElement, alterState} from "../functions.js";

export class Popup{
    constructor(){
        this.setup();
        this.focusableItem = null;
    }
    setup(){
        this.ele = createElement("section", {classList:"popup"});
        this.overlay = document.querySelector(".overlay");
        if(!this.overlay){
            this.overlay = createElement("div",{classList:"overlay", state:"hidden"});
        }
        this.closeFunction = (e) =>{
            e.stopPropagation();
            this.close();
        };
        this.overlay.addEventListener("click", this.closeFunction)
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.ele);

        this.cancelButton = createElement("button", {classList:"button2", id:"cancel", text:"Cancel"});
        this.cancelButton.addEventListener("click", ()=>this.close());
    }
    open(){
        if(this.content)alterState(this.content, "shown");
        alterState(this.overlay, "shown");
        alterState(this.ele, "open");
    }
    close(){
        if(this.content)alterState(this.content, "hidden");
        alterState(this.overlay, "hidden");
        alterState(this.ele, "closed");
        if(this.focusableItem)this.focusableItem.focus();
    }
    setContent(content, addButton=true){
        this.content = content;
        this.ele.appendChild(content);
        if(addButton)this.ele.appendChild(this.cancelButton);
    }
    addCloseFunction(fun){
        this.overlay.addEventListener("click", ()=>fun());
        this.cancelButton.addEventListener("click", ()=>fun());
    }
    setZIndex(num){
        this.ele.style.zIndex = num;
        this.overlay.style.zIndex = num;
    }
    removeCloseFunctions(){
        this.overlay.removeEventListener("click", this.closeFunction);
    }
    focus(item){
        this.focusableItem = item;
    }
}