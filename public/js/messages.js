import {createElement} from "./functions.js";

let isNotificationsShown = false;
let showMessages = () => clientMessageContainer.classList.add("shown")
let addMessage = (type, text) =>{
    let classList ="infoMessage";
    if(type == "error"){
        text = `ERROR: ${text}`;
        classList = "error";
    }else if(type == "warning"){
        text = `WARNING: ${text}`;
        classList = " warning";
    }
    messageContainer.prepend(createElement("p", {text, classList}));
    if(!isNotificationsShown){
        notifications++;
        notificationNumber.textContent = notifications;
        bellIcon.classList.remove("animating");
        void bellIcon.offsetWidth;
        bellIcon.classList.add("animating");
        notificationNumber.style.display = "block";
        bell.style.color = "#888";
    }
}

let clientMessageContainer = document.querySelector("#clientMessages");
let messageContainer = document.querySelector("#messageContainer");
let bell = document.querySelector("#bell");
bell.addEventListener("click", ()=>{
    if(notifications != 0){
        notifications = 0;
        notificationNumber.style.display = "none";
        bell.style.color = "#c7c7c7";
        showMessages();
        isNotificationsShown = true;
    }
})
let bellIcon = document.querySelector("#bell i");
let notificationNumber = document.querySelector("#notificationNumber");
let notifications = 0;

document.querySelector("#clearMessages").addEventListener("click", ()=>{
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
    clientMessageContainer.classList.remove("shown");
    isNotificationsShown = false;
});

document.querySelector("#hideClientMessages").addEventListener("click", ()=>{
    clientMessageContainer.classList.remove("shown");
    isNotificationsShown = false;
});

//add the server messages to the notifications tab
for(let message of infoMessages){
    if(message=="")continue;
    addMessage("info", message);
}

for(let message of warningMessages){
    if(message=="")continue;
    addMessage("warning", message);
}

for(let message of errorMessages){
    if(message=="")continue;
    addMessage("error", message);
}

export{
    showMessages,
    addMessage
}