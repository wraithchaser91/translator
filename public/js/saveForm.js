document.getElementById("saveButton").addEventListener("click", ()=>{
    let form = document.getElementById("setupForm");
    if(form.checkValidity())startSave(form);
});

startSave = (form) =>{
    let listNames = ["pageList", "langList"];
    for(let i = 0; i < listNames.length; i++){
        let list = listInputers[i].createList((i===0?document.getElementById("url").value:""));
        let i1 = document.createElement("input");
        i1.value = JSON.stringify(list);
        i1.name = listNames[i];
        i1.style.display = "none";
        form.appendChild(i1);
    }
}