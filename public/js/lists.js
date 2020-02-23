class ListInput{
    constructor(input, listArea, toLower = false){
        this.input = input;
        this.listArea = listArea;
        this.list = [];
        this.toLower = toLower;
        this.addListeners();
    }
    addListeners(){
        this.input.addEventListener("keydown", (e)=>{
            if(e.key === "Enter"){
                e.preventDefault();
                if(this.input.value != ""){
                    this.addItem(this.input.value);
                    this.input.value = "";
                }
            }
        });
    }
    addItem(string){
        let heading = document.createElement("h3");
        heading.textContent = string;
        heading.className = "pageName";
        heading.addEventListener("click", ()=>{
            this.listArea.removeChild(heading);
            this.list = this.list.filter(item => item != string);
        });
        this.listArea.appendChild(heading);
        this.list.push(string);
    }
    createList(start){
        let tempList = [];
        if(start != ""){
            tempList.push(start);
            if(start.substring(start.length-2, start.length-1) != "/")start+="/";
        }
        for(let item of this.list){
            tempList.push(`${start}${(this.toLower?item.toLowerCase():item)}`);
        }
        return tempList;
    }
}

let listInputs = document.getElementsByClassName("listInput");
let listContainers = document.getElementsByClassName("listContainer");
let listInputers = [];

for(let i = 0; i < listInputs.length; i++){
    listInputers.push(new ListInput(listInputs[i], listContainers[i], (i===0?true:false)));
}