class Switch{
    constructor(row){
        this.row = row;
        this.onColour = "#2cc32a";
        this.setup();
    }
    setup(){
        this.button = this.row.getElementsByTagName("label")[0];
        this.button.addEventListener("click", ()=>{
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
        if(this.isOn){
            this.input.checked = false;
            this.button.style.setProperty("--bg", "grey");
            this.button.style.setProperty("--trans", "-5px");
        }else{
            this.input.checked = true;
            this.button.style.setProperty("--bg", `${this.onColour}`);
            this.button.style.setProperty("--trans", `${this.width-this.dim + 5}px`);
        }
        this.isOn = !this.isOn;
    }
    changeColour(colour){
        this.onColour = colour;
        if(this.isOn){
            this.button.style.setProperty("--bg", `${this.onColour}`);
        }
    }
}

/*Switches*/
let switches = [];
Array.from(document.querySelectorAll(".switchRow")).map(item=>switches.push(new Switch(item)));

export{
    switches
}