export class Switch{
    constructor(row){
        this.row = row;
        this.onColour = "#2cc32a";
        this.listOfFunsBefore = [];
        this.listOfFunsAfter = [];
        this.setup();
    }
    setup(){
        this.label = this.row.querySelector("p");
        if(this.label){
            this.label.addEventListener("click", ()=>{
                this.switch();
            })
        }
        this.button = this.row.getElementsByTagName("label")[0];
        this.button.addEventListener("click", (e)=>{
            e.preventDefault();
            this.switch();
        });
        this.width = ~~(window.getComputedStyle(this.button).width.replace("px", ""));
        this.dim = ~~(window.getComputedStyle(this.button).getPropertyValue("--dim").replace("px", ""));
        this.input = this.row.getElementsByTagName("input")[0];
        this.isOn = this.input.checked;
        if(this.isOn){
            this.input.checked = true;
            this.button.style.setProperty("--bg", `${this.onColour}`);
            this.button.style.setProperty("--trans", `${this.width-this.dim}px`);
        }
    }
    switch(){
        for(let fun of this.listOfFunsBefore){
            let ret = fun(this);
            if(ret == -1)return;
        }
        this.isOn ? this.turnOff() : this.turnOn();
        for(let fun of this.listOfFunsAfter)fun(this);
    }
    changeColour(colour){
        this.onColour = colour;
        if(this.isOn){
            this.button.style.setProperty("--bg", `${this.onColour}`);
        }
    }
    addSwitchFunction(fun, isBefore=false){
        if(isBefore)this.listOfFunsBefore.push(fun);
        else this.listOfFunsAfter.push(fun);
    }
    turnOff(){
        this.input.checked = false;
        this.button.style.setProperty("--bg", "grey");
        this.button.style.setProperty("--trans", "-5px");
        this.isOn = false;
    }
    turnOn(){
        this.input.checked = true;
        this.button.style.setProperty("--bg", `${this.onColour}`);
        this.button.style.setProperty("--trans", `${this.width-this.dim + 5}px`);
        this.isOn = true;
    }
}