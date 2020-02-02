class FormField{
    constructor(handler, label, input, prefs){
        this.handler = handler;
        this.label = label;
        this.input = input;
        this.prefs = prefs;
        this.addListeners();
        this.isPlaceHolder = true;
        if(this.input.value != ""){
            this.affectField();
        }
    }
    addListeners(){
        this.input.addEventListener("click", (e)=>{
            e.stopPropagation();
        });
        this.input.addEventListener("focus", ()=>{
            if(this.isPlaceHolder)this.affectField();
        });
        this.input.addEventListener("blur", ()=>{
            if(!this.isPlaceHolder && this.input.value === "")this.affectField();
        });
        this.label.addEventListener("click", (e)=>{
            e.stopPropagation();
            if(this.isPlaceHolder || this.input.value==="")this.affectField();
        });
    }
    affectField(){
        if(this.isPlaceHolder){
            this.label.style.transform = `translate(${prefs.activeX}, ${prefs.activeY})`;
            this.label.style.color = prefs.activeColour;
            this.label.style.border = prefs.activeBorder;

            this.input.focus();
            this.input.style.cursor = "auto";
            this.label.style.cursor = "default";
            this.isPlaceHolder = false;
        }else{
            this.label.style.transform = `translate(${prefs.defX}, ${prefs.defY})`;
            this.label.style.color = prefs.defColour;
            this.label.style.border = prefs.defBorder;

            this.input.blur();
            this.input.style.cursor = "pointer";
            this.label.style.cursor = "pointer";
            this.isPlaceHolder = true;
        }
    }
}

class FormFieldHandler{
    constructor(list = []){
        this.list = list;
    }
    addItem(item){
        this.list.push(item);
    }
}

let prefs ={
    activeColour:"#f84",
    defColour:"#666",
    activeX:"5px",
    activeY:"-22px",
    defX:"0px",
    defY:"0px",
    activeBorder:"1px solid #0008",
    defBorder:"unset"
}
let labels = document.getElementsByClassName("formLabel"); 
let inputs = document.getElementsByClassName("formInput"); 
let fieldHandler = new FormFieldHandler();
for(let i = 0; i < labels.length; i++){
    fieldHandler.addItem(new FormField(fieldHandler, labels[i], inputs[i], prefs));
}