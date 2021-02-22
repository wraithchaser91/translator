import {alterState, createElement} from "../functions.js";

class Notification{
    constructor({buttonText, timeoutPeriod, delay}){
        Object.assign(this, {buttonText, timeoutPeriod, delay});
        this.ele = createElement("div", {classList:"notifications", state:"hidden"});
        this.p = createElement("p");
        this.ele.append(this.p);
        this.button = createElement("button", {text:this.buttonText, classList:"button3"});
        this.button.addEventListener("click", ()=>{
            alterState(this.ele, "hidden");
            clearTimeout(this.timeout);
        });
        this.ele.append(this.button);

        document.body.append(this.ele);

        this.timeout;
    }
    addMessage(type, text){
        clearTimeout(this.timeout);
        this.p.textContent = text;
        setTimeout(()=>{alterState(this.ele, "shown")},this.delay);
        alterState(this.p,type);
        this.timeout = setTimeout(()=>{
            alterState(this.ele, "hidden");
        }, this.timeoutPeriod);
    }
}
let generalNotifications = new Notification({buttonText: "dismiss", timeoutPeriod: 3500,delay: 100});

let addMessage = (type, text) => generalNotifications.addMessage(type, text);

export{
    addMessage,
}