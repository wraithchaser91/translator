import {createElement, getPerc, findDevice, getLorem} from "./functions.js";
import {addMessage} from "./messages.js";
import {switches} from "./switches.js";
import {Waiter, Popup, Searchbar} from "./classes.js";
import {configureAllNumInputs} from "./numInputFunctions.js";

let device = findDevice();

let textToCopy = []
let textToAdd = [
    {
        name: "Client Messages",
        list:[
            `<%- include("./messages")%>`,
            `import {addMessage} from "./messages.js";
            addMessage(type, text);`,
            `import {showMessages} from "./messages.js";
            showMessages();`,
            `req.flash(type, text);`,
        ]
    },
    {
        name:"Switches",
        list:[
            `<div class="row switchRow">
                <p>Label</p>
                <label for="name" class="switch">Label</label>
                <input type="checkbox" name="name">
            </div>`,
            `switch.isOn;`,
            `switch.changeColour(colour)`
        ]
    },
    {
        name: "Waiter Object",
        list:[
            `import {Waiter} from "./classes.js";
            let waiter = new Waiter();`,
            `waiter.open(message);`,
            `waiter.changeText(text);`,
            `waiter.close()`
        ]
    },
    {
        name: "Popups",
        list:[
            `import {Popup} from "./classes.js";
            let popup = new Popup();`,
            `popup.createContent(data, function);`,
            `popup.open();`,
            `popup.close();`
        ]
    },
    {
        name:"Searchbar",
        list:[
            `import {Searchbar} from "./classes.js";
            let searchbar = new Searchbar(classToFind, exclusionList);`
        ]
    },
    {
        name:"Number Input Functionality",
        list:[
            `import {configureAllNumInputs} from "./numInputFunctions.js";
            configureAllNumInputs(className);`,
            `import {addInputListeners} from "./numInputFunctions.js";
            addInputListeners(item);`
        ]
    },
    {
        name:"HTML Element Creation",
        list:[
            `import {createElement} from "./functions.js";
            createElement(tagName, attributes);`
        ]
    },
    {
        name:"Get and Post Fetch Requests",
        list:[
            `import {sendGetRequest} from "./functions.js";
            sendGetRequest(route, function);`,
            `import {sendPostRequest} from "./functions.js";
            sendPostRequest(route, content, function, waiter);`
        ]
    },
    {
        name:"Device Detection",
        list:[
            `import {findDevice} from "./functions.js";
            let device = findDevice();`
        ]
    },
    {
        name:"Lazy Loading Content",
        list:[
            `import {getPerc} from "./functions.js";
            getPerc(element);`
        ]
    }
];

/******Creating the sidebar*******/
class Module{
    constructor(ele){
        this.ele = ele;
        this.title = this.ele.querySelector("h2").textContent;
        this.top = this.ele.getBoundingClientRect().top+window.scrollY;
        let button = createElement("button", {text:this.title});
        button.addEventListener("click", ()=>{
            window.scrollTo(0,this.top-offset);
        });
        sidebar.appendChild(button);

        let text = textToAdd.filter(item => item.name == this.title)[0];
        if(typeof text != "undefined")textToCopy.push(...text.list);
    }
}

let isSidebarOpen = false;
let offset = parseInt(window.getComputedStyle(document.querySelector("header")).height.replace("px", ""))+20;
let sidebar = document.querySelector("#sidebar");
let sidebarButton = document.querySelector("#sidebarButton");
let sidebarOpenTransform = `${device == "mobile" ? "translateY(0)" : "translateX(0)"}`;
let sidebarClosedTransform = `${device == "mobile" ? "translateY(150%)" : "translateX(-150%)"}`;
let sidebarButtonOpenTransform = `${device == "mobile" ? "translateY(0)": "rotate(90deg) translateY(0)"}`;
let sidebarButtonClosedTransform = `${device == "mobile" ? "translateY(150%)": "rotate(90deg) translateY(150%)"}`;
sidebarButton.addEventListener("click", ()=>{
    sidebar.style.transform = sidebarOpenTransform;
    sidebarButton.style.transform = sidebarButtonClosedTransform;
});
document.querySelector("#hideSidebar").addEventListener("click", ()=>{
    sidebar.style.transform = sidebarClosedTransform
    sidebarButton.style.transform = sidebarButtonOpenTransform
});
document.addEventListener("scroll", ()=>{
    if(!isSidebarOpen && getPerc() >= 5){
        sidebarButton.style.transform = sidebarButtonOpenTransform;
        isSidebarOpen = true;
    }
})

Array.from(document.querySelectorAll(".module")).map(item=>new Module(item));

/******Setting up Copy buttons*******/
Array.from(document.querySelectorAll(".copyButton")).map((item,index)=>{
    item.addEventListener("click", ()=>{
        let temp = createElement("input", {classList:"", value:textToCopy[index]});
        document.body.appendChild(temp);
        temp.select();
        temp.setSelectionRange(0,99999);
        try {
            document.execCommand('copy');
            addMessage("info", "Text copied to clipboard");
          } catch (err) {
            addMessage("error", `There was an error trying to copy text to clipboard: ${err}`);
          }

          document.body.removeChild(temp);
    });
})

/******Message buttons*******/
let clientMessages = [
    {type:"info", msg:"This is what an informational message will look like"},
    {type:"warning", msg:"This is a warning message, note the colour change"},
    {type:"error", msg:"The is an error, it will always be preceeded by 'ERROR' for easy recognition even if youchange the colour"}
];

Array.from(document.querySelectorAll(".clientMessageButtons")).map((item,index)=>{
    item.addEventListener("click", ()=>{
        addMessage(clientMessages[index].type, clientMessages[index].msg);
    })
});

/*********Switch example********/
let switchStatusElement = document.querySelector("#switchStatus");
let s = switches[0];
s.button.addEventListener("click", ()=>{
    switchStatusElement.textContent = s.isOn ? "On" : "Off";
})

let colours = ["#ff2c2c", "#2cc32a", "#00d0ff", "#f84"];
Array.from(document.querySelectorAll(".switchColourChange")).map((item,index)=>item.addEventListener("click", ()=>s.changeColour(colours[index])));

/******Waiter example********/
let waiter = new Waiter();
Array.from(document.querySelectorAll(".waiterButton")).map((item,index)=>{
    item.addEventListener("click", ()=>{
        if(index == 0){
            let count = 5;
            setTimeout(()=>{
                waiter.close();
                clearInterval(countdown);
            },count*1000)
            waiter.open(`Regaining control in ${count}`);
            count--;
            let countdown = setInterval(()=>{waiter.changeText(`Regaining control in ${count}`);count--},1000);
        }else{
            let count = 10;
            setTimeout(()=>{
                clearInterval(countdown);
            },count*1000)
            waiter.open(`Showing timeout error in ${count}`);
            count--;
            let countdown = setInterval(()=>{waiter.changeText(`Showing timeout error in ${count}`);count--},1000);
        }
    })
});

/******Popup example********/
let simplePopup = new Popup();
simplePopup.createContent({
    heading:"This popup only has a heading and a confirm button"
}, ()=>{
    simplePopup.close();
})
let complexPopup = new Popup();
complexPopup.createContent({
    heading:"This popup has all of the optional elements",
    text: "You should put in the functionality of what the popup is for here.",
    warning: "Also give a warning like, 'This is irreversable'",
    buttonText: "Go for it!"
}, ()=>{
    complexPopup.close();
})

Array.from(document.querySelectorAll(".popupButton")).map((item, index)=>{
    item.addEventListener("click", ()=>{
        if(index == 0)simplePopup.open();
        else complexPopup.open();
    });
});

/******Searchbar example********/
let searchbar = new Searchbar("searchable", ["h5"]);
document.querySelector("#searchbarSection").appendChild(searchbar.ele);

/******Number Input example********/
configureAllNumInputs("numFocus");

/******HTML creation example********/
let elementNames = [
    "p","code","span","h4","h5"
];

let newElementsContainer = document.querySelector("#newElementsContainer");
document.querySelector("#newElementsButton").addEventListener("click", ()=>createRandomElement());

let createRandomElement = () =>{
    let random = ~~(Math.random()*elementNames.length);
    let text = `I am a new ${elementNames[random]} element!`;
    newElementsContainer.appendChild(createElement(elementNames[random], {text}));
}

/******Device detection example*******/
document.querySelector("#deviceString").textContent = `You are currently viewing this on a ${device}.`;

/******Lazy Loading example*******/
let min = 250, max = 900;
let addLorem = (amount) =>{
    let p = createElement("p");
    if(amount){
        p.textContent = getLorem(amount);
    }else{
        let rAmount = ~~(Math.random() * (max-min)) + min
        p.textContent = getLorem(rAmount);
    }
    infiniteSection.appendChild(p);
    infiniteCount++;
    inifiniteCounterElement.textContent = `The bottom has been reached ${infiniteCount} times.`;
}

let infiniteSection = document.querySelector("#infiniteScroll");

infiniteSection.addEventListener("scroll", ()=>{
    if(getPerc(infiniteSection) > 95){
        addLorem();
    }
});

let inifiniteCounterElement = document.querySelector("#infiniteCounter");
let infiniteCount = 0;

addLorem(600);