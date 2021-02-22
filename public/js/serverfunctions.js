import {createElement} from "./functions.js";
import {addMessage} from "./modules/messages.js";

const defaultFail = () => console.error("Default Server Function: Failure");
const defaultServerFail = () => console.error("Default Server Fail: Server Fail");
const defaultSuccess = () => console.log("Default Server Function: Success");
const findErrorStatusValue = obj =>{
    if(!obj || typeof obj == "undefined" || typeof obj.status == "undefined")return -1;
    return ~~(parseInt(obj.status) / 100);
}

let sendGetFetch = ({route, success=defaultSuccess, fail=defaultFail}) =>{
    fetch(route, {method: "get",headers: {'Content-Type': 'application/json'}})
    .then(response =>{
        if(response.status == 200)return response.json();
        else throw new Error(`Fetch error: statusText: ${reponse.statusText}, url: ${reponse.url}`);
    })
    .then(data => {
        if(findErrorStatusValue(data) == 2)success(data);
        else if(findErrorStatusValue(data) == 4)fail(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.error(error);
        addMessage("error", error);
    });
}

let sendPostFetch = ({route, content, success=defaultSuccess, fail=defaultFail, serverFail=defaultServerFail}) =>{
    fetch(route, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(content)})
    .then(response =>{
        if(response.status == 200) return response.json();
        else throw new Error(`Fetch error: statusText: ${reponse.statusText}, url: ${reponse.url}`);
    })
    .then(data => {
        if(findErrorStatusValue(data) == 2)success(data);
        else if(findErrorStatusValue(data) == 4)fail(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.error(error);
        addMessage("error", error);
        serverFail(error);
    });
}

/*Form Validation*/
let fetchValidation = async({dest, form, failure=defaultFail}) =>{
    sendGetFetch({route:`/validation/${dest}`, 
        success:data=>{
            if(findErrorStatusValue(data) == 2){
                if(form && typeof form != "undefined")form.submit();
                else throw new Error("Error: Can not find form");
            }else if(findErrorStatusValue(data) == 4){
                addMessage("error", data.statusText);
            }else{
                addMessage("error", `Error permorming validation: ${data.statusText}`);
            }
        },
        fail:data=>failure(data)
    })
}


let createTempForm = (route, values) =>{
    let form = createElement("form");
    form.method = "POST";
    form.action = route;
    form.style.display = "none";
    for(let value of values){    
        let i = createElement("input");
        i.value = value.value;
        i.name = value.name;
        form.appendChild(i);
    }
    document.body.appendChild(form);
    form.submit();
}

export{
    sendGetFetch,
    sendPostFetch,
    fetchValidation,
    createTempForm
}