/*******HTML creation elements*******/
let createElement = (type,data={}) =>{
    let ele = document.createElement(type);
    if(data.classList)ele.classList = data.classList;
    if(data.id)ele.id = data.id;
    if(data.text)ele.textContent = data.text;
    if(data.role)ele.role = data.role;
    if(data.type)ele.type = data.type;
    if(data.name)ele.name = data.name;
    if(data.value)ele.value = data.value;
    if(data.type)ele.type = data.type;
    if(data.placeholder)ele.placeholder = data.placeholder;
    if(data.min)ele.min = data.min;
    if(data.max)ele.max = data.max;
    if(data.step)ele.step = data.step;
    if(data.title)ele.title = data.title;
    if(data.state)ele.dataset.state = data.state;
    if(data.innerHTML)ele.innerHTML = data.innerHTML;
    if(data.href)ele.href = data.href;
    if(data.cols)ele.cols = data.cols;
    if(data.rows)ele.rows = data.rows;
    if(data.method)ele.method = data.method;
    if(data.action)ele.action = data.action;

    return ele;
}

let getRandomNumber = (min, max, not=-1) =>{
    let count = 0, maxCount = 10000;
    while(true){
        let temp = ~~(Math.random() * (max-min))+min;
        if(temp != not){
            return temp;
        }
        count++;
        if(count >= maxCount){
            return "a";
        }
    }
}

let alterState = (ele, newState) => ele.dataset.state = newState;

let findStringLength = ele =>{
    let text = ele.textContent;
    let fontSize = window.getComputedStyle(ele).fontSize.replace("px","");

    return fontSize * text.length;
}

export{
    createElement,
    getRandomNumber,
    alterState,
    findStringLength
}