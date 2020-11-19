import {createElement, findDevice} from "./functions.js";

let device = findDevice();
export class Popup{
    constructor(){
        this.setup();
    }
    setup(){
        this.ele = createElement("section", {classList:"col-top-center popup"});
        this.ele.style.transition = "0.5s";
        this.overlay = document.querySelector(".overlay");
        if(!this.overlay){
            this.overlay = createElement("div",{classList:"overlay"});
        }
        this.overlay.addEventListener("click", (e)=>{
            e.stopPropagation();
            this.close();
        });
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.ele);

        
        this.openTransform = device == "mobile"?"translateX(0)":"translate(-50%, -50%) scale(1)";
        this.closeTransform = device == "mobile"?"translateX(150%)":"translate(-50%, -50%) scale(0)";
        this.openTransition = "0.5s";
        this.closeTransition = "0.2s";
    }
    open(){
        this.overlay.style.display = "block";
        this.ele.style.transform = this.openTransform;
        this.ele.style.transition = this.openTransition;
    }
    close(){
        this.overlay.style.display = "none";
        this.ele.style.transform = this.closeTransform;
        this.ele.style.transition = this.closeTransition;
    }
    createContent(data, fun){
        this.ele.innerHTML = "";
        this.ele.appendChild(createElement("h3", {text:`${data.heading ? data.heading : "Popup"}`}));
        if(data.text)this.ele.appendChild(createElement("p", {text:data.text}));
        if(data.warning)this.ele.appendChild(createElement("p", {classList:"warning",text:data.warning}));
        let confirmButton = createElement("button", {classList:"secondaryButton", id:"confirm", text:`${data.buttonText?data.buttonText : "Confirm"}`});
        confirmButton.addEventListener("click", ()=>{
            fun();
            this.close();
        });
        let cancelButton = createElement("button", {classList:"tertiaryButton", id:"cancel", text:"Cancel"});
        cancelButton.addEventListener("click", ()=>this.close());
        this.ele.appendChild(confirmButton);
        this.ele.appendChild(cancelButton);
    }
}

export class Waiter{
    constructor(){
        this.setup();
    }
    setup(){
        this.overlay = createElement("section",{classList:"waiterOverlay col-center"});
        this.overlay.addEventListener("click", (e)=>{
            e.stopPropagation();
        });
        this.spinner = createElement("div", {id:"spinningWheel"});
        this.overlay.appendChild(this.spinner);
        this.text = createElement("p", {id:"spinnerText", text:"Saving"});
        this.warning = createElement("p", {classList:"warning"});
        this.refreshButton = createElement("button", {text:"Refresh Page", classList:"secondaryButton"});
        this.refreshButton.addEventListener("click", ()=>location.reload());
        this.overlay.appendChild(this.text);
        document.body.appendChild(this.overlay);

        this.delay = 150;
        this.errorDelay = 10000;
        this.spin = 0;
        this.shouldOpen = false;
        this.isOpen = false;
        this.hasTimedout = false;
    }
    open(text="Saving"){
        this.shouldOpen = true;
        this.text.textContent = text;
        setTimeout(()=>{
            if(this.shouldOpen){
                this.isOpen = true;
                this.overlay.style.display = "flex";
                this.interval = setInterval(()=>{
                    this.spinner.style.setProperty("--deg", `${this.spin}deg`);
                    this.spin+=1;
                    if(this.spin > 36000)this.spin = 0;
                },5);
            }
        },this.delay);
        setTimeout(()=>{
            if(this.isOpen)this.timeout();
        },this.errorDelay);
    }
    close(){
        this.overlay.style.display = "none";
        if(this.hasTimedout){
            this.overlay.removeChild(this.warning);
            this.overlay.removeChild(this.refreshButton);
        }
        this.shouldOpen = false;
        this.isOpen = false;
        this.hasTimedout = false;
        clearInterval(this.interval);
        this.spin = 0;
    }
    timeout(){
        this.hasTimedout = true;
        this.text.textContent = "The process is taking longer than normal, you may want to refresh the page";
        this.warning.textContent = "If you do refresh the page the action that was taking place may not have completed, if this error persists please contact your support team"
        this.overlay.appendChild(this.warning);
        this.overlay.appendChild(this.refreshButton);
    }
    changeText(text){
        this.text.textContent = text;
    }
}

export class Searchbar{
    constructor(classToFilter, exclusionList=[]){
        this.classToFilter = classToFilter;
        this.exclusionList = exclusionList;
        this.setup();
    }
    setup(){
        this.ele = createElement("div", {id:"searchContainer"});
        let inputRow = createElement("div", {classList:"row-center inputRow"});
        inputRow.appendChild(createElement("i", {classList:"fas fa-search"}));
        this.input = createElement("input", {type:"text"});
        this.input.addEventListener("keyup", ()=>{
            this.filter(this.input.value);
        })
        inputRow.appendChild(this.input);
        this.ele.appendChild(inputRow);
        this.resetButton = createElement("button", {classList: "secondaryButton", text:"Reset"});
        this.resetButton.addEventListener("click", ()=>this.reset());
        this.ele.appendChild(this.resetButton);
        this.noSearchString = createElement("p", {text:"No searches found", classList:"hidden"});
        this.ele.appendChild(this.noSearchString);

        this.items = [];
        Array.from(document.querySelectorAll(`.${this.classToFilter}`)).map(item=>this.items.push(new FilterableItem(item,this.exclusionList)));
    }
    filter(toFind){
        if(toFind == ""){
            this.reset();
            return;
        }
        let toAdd = true;
        this.noSearchString.style.display = "block";
        for(let item of this.items){
            item.search(toFind);
            if(item.isShown && toAdd)toAdd = false;
        }
        if(!toAdd){
            this.noSearchString.style.display = "none";
        }
        this.resetButton.style.transform = `translateY(${device=="mobile"?110:95}%)`;
    }
    reset(){
        for(let item of this.items){
            item.show();
        }
        this.input.value = "";
        this.noSearchString.style.display = "none";
        this.resetButton.style.transform = "translateY(0)";
        this.resetButton.blur();
    }
}

class FilterableItem{
    constructor(ele, toExclude){
        this.ele = ele;
        this.setup(toExclude);
        this.isShown = true;
    }
    setup(exclusion){
        let toFind = [
            "h1","h2","h3","h4","h5","h6","p","a","code","li","span"
        ];
        toFind = toFind.filter(item=> !exclusion.includes(item));
        this.list = [];
        for(let item of toFind){
            this.list.push(...this.ele.querySelectorAll(item));
        }
    }
    show(){
        this.ele.style.display = "flex";
        this.isShown = true;
    }
    hide(){
        this.ele.style.display = "none";
        this.isShown = false;
    }
    search(toFind){
        this.hide();
        for(let item of this.list){
            if(item.textContent.toLowerCase().includes(toFind.toLowerCase())){
                this.show();
                break;
            }
        }
    }
}