const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async url => {
    const result = await axios.get(url);
    return cheerio.load(result.data);
};

const getResults = async list => {
    let array = [];
    for(let item of list){
        const $ = await fetchData(item);
        findText(array,$("body"));
    }
    return array;
}

findText = (list, element) =>{
    if(element.children){
        if(typeof element.children == "function"){
            let childArray = element.children();
            let keys = Object.keys(childArray);
            for(let i = 0; i < childArray.length; i++){
                findText(list, childArray[keys[i]]);
            }
        }else if(typeof element.children == "object"){
            let childArray = element.children;
            for(let child of childArray)findText(list, child);
        }
    }else{
        if(!forbiddenTypes.includes(element.parent.type))if(shouldAdd(list,element.data))list.push(element.data);
    }
}

const dontAdd = [
    "Skip to content","Share on facebook","Facebook","Share on twitter","Twitter","Share on linkedin","LinkedIn","Facebook","Twitter","Youtube","Share on google","Google+","Share on pinterest","Pinterest","Share on reddit","Reddit","Share on vk","VK","Share on odnoklassniki","OK","Share on tumblr","Tumblr","Share on delicious","Delicious","Share on digg","Digg","Share on skype","Skype","Share on stumbleupon","StumbleUpon","Share on telegram","Telegram","Share on pocket","Pocket","Share on xing","XING","Share on whatsapp","WhatsApp","Share on email","Email","Share on print","Print","Whatsapp","Android","Apple","Codepen","Github","Jsfiddle","Linkedin","Reddit","Skype","Pinterest","Tripadvisor","Tumblr","Twitch","Link",
    "×",
    "Dismiss alert",
    "-","^","Facebook-f"
];

const forbiddenTypes = [
    "script",
    "style",
    "img"
];

const startsWith = [
    "<img"
];

shouldAdd = (list,string) =>{
    if(!string)return false;
    if(string.replace(/ /g, "") == "")return false;
    if(list.includes(string.trim()))return false;
    if(dontAdd.includes(string.trim()))return false;
    if(!filterOutNumbers(list, string))return false;
    if(!filterOutStartsWith(string))return false;
    // console.log(dontAdd[dontAdd.length-2], string);
    return true;
}

filterOutNumbers = (list,string) =>{
    let rem = string.replace(/[0-9]|%/g, "");
    return rem != "" && !list.includes(string);
}

filterOutStartsWith = string =>{
    for(let test of startsWith){
        if(string.startsWith(test))return false;
    }
    return true;
}

module.exports = getResults;