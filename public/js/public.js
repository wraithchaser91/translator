let infoMessages = document.getElementsByClassName("infoMessage");
if(infoMessages.length != 0){
    setTimeout(()=>{
        for(let message of infoMessages){
            message.style.transform = "scale(0)";
        }
    },3000);
}