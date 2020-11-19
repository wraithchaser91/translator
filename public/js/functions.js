import {addMessage} from "./messages.js";
import {addInputListeners} from "./numInputFunctions.js";

let findDevice = () =>{
    let width = window.screen.availWidth;
    if(width >= 768 && width < 1025) return "tablet";
    else if(width < 767) return "mobile";
    return "desktop"
}

let sendGetFetch = (route, fun) =>{
    fetch(route, {method: "get",headers: {'Content-Type': 'application/json'}})
    .then(response =>{
        if(response.status == 200)return response.json();
        else throw new Error("Fetch error");
    })
    .then(data => {
        if(data.status == 200)fun(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.log(error);
        addMessage("error", error);
    });
}

let sendPostFetch = (route, content, fun, waiter=null) =>{
    fetch(route, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(content)})
    .then(response =>{
        if(waiter)waiter.close();
        if(response.status == 200) return response.json();
        else throw new Error("Fetch error");
    })
    .then(data => {
        if(data.status == 200) fun(data);
        else throw new Error(data.statusText);
    })
    .catch(error => {
        console.log(error);
        addMessage("error", error);
    });
}

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
    if(data.title)ele.title = data.title;

    if(type=="input" && data.classList && data.classList.includes("numFocus"))addInputListeners(ele);

    return ele;
}

/******Calculates how far a user has scrolled down the screen, useful for any lazy loading that may be needed*******/
let h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
let getPerc = (ele=null) =>{
    if(ele){
        let maxScroll = ele.scrollHeight - parseInt(window.getComputedStyle(ele).height.replace("px", ""));
        return ele.scrollTop / maxScroll * 100;
    }
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

let lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus commodo ante, eu facilisis enim fringilla semper. Proin at ante arcu. Aliquam pharetra vehicula sagittis. Praesent placerat mollis rhoncus. Proin maximus blandit odio, quis iaculis lectus mollis non. Pellentesque sagittis nulla dui, eu tristique tellus sodales ut. Nullam in massa quis justo vestibulum suscipit vitae vel justo. Nam eget dignissim dui. Pellentesque eu massa odio. Sed sit amet lectus vitae nulla condimentum pulvinar a ut nibh. Vivamus velit nibh, accumsan quis odio eu, finibus ultricies risus. Donec tempor congue nibh at accumsan. Curabitur accumsan hendrerit placerat.

Donec id aliquam enim. Morbi ornare leo at erat porttitor maximus. Fusce ut nunc quis neque iaculis ultricies. Praesent condimentum mauris nec elit vehicula, et tristique lorem euismod. Morbi imperdiet dignissim magna, eget sagittis enim ultricies sit amet. In magna lectus, placerat vitae blandit at, lacinia ac lacus. Phasellus ut ex congue, pulvinar eros a, elementum felis. Pellentesque sapien enim, feugiat a venenatis ac, iaculis non augue. In pharetra mauris hendrerit, tempus nulla eget, imperdiet magna.

Aenean sem arcu, malesuada vestibulum maximus quis, fermentum ac ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed dictum urna velit, et porttitor nulla consectetur nec. Cras egestas urna sit amet turpis condimentum, eget lacinia erat condimentum. Mauris ut sem eget lacus maximus rutrum. Pellentesque dui mauris, ullamcorper elementum venenatis ut, fermentum nec nibh. Sed efficitur mauris diam, eget mollis tellus condimentum quis. Aenean pharetra sapien eros, quis feugiat metus gravida ac. Quisque vestibulum malesuada lorem nec dictum. Quisque et sem tincidunt, interdum enim in, condimentum risus. Nam dictum tempus massa. Duis ut lectus quis libero volutpat semper et quis dolor. Nam consequat nec nisl vitae convallis. Aliquam hendrerit quam id velit aliquam, nec suscipit felis malesuada. Proin iaculis auctor elit. Cras vitae erat risus.

Nulla facilisi. Phasellus quis ipsum ac nunc venenatis tristique. Aliquam vitae metus est. Curabitur maximus sem mollis turpis laoreet, ut cursus tortor suscipit. Cras id viverra nunc, eu consequat risus. Quisque sollicitudin, nulla sed congue tempus, justo lectus ultricies ante, ac vehicula felis nibh sit amet lacus. Nam auctor imperdiet mi a viverra. Ut pretium augue dolor, quis pretium dolor facilisis nec. Proin condimentum non metus eu condimentum. Suspendisse potenti. Phasellus pulvinar vitae velit non facilisis. Sed ligula mauris, suscipit nec lobortis et, pulvinar sed ante. Etiam tristique commodo ex rutrum ultrices.

Etiam varius purus quis augue volutpat, et porta lorem ultrices. Integer dapibus venenatis leo non semper. Fusce accumsan nisi sed tellus euismod, eget eleifend mauris convallis. Morbi eu molestie dolor. Nunc condimentum dui id mauris maximus finibus. Cras dapibus placerat quam ut scelerisque. Maecenas varius ultricies bibendum. Mauris cursus efficitur quam sed volutpat. Ut in facilisis lacus. Fusce placerat a velit ac consectetur. Donec lobortis pretium sapien ut fringilla. Suspendisse massa leo, tristique vel dolor interdum, lacinia viverra justo. Ut ac suscipit erat. Fusce dignissim massa tristique est volutpat, sed commodo tortor placerat. Cras eleifend non erat ut efficitur.

Nullam dictum orci sed sem ultricies, non efficitur orci rhoncus. Etiam fermentum risus ipsum, eu commodo ante cursus sagittis. Pellentesque eget nisl eros. In elementum fringilla orci sit amet consectetur. Pellentesque congue, eros mollis venenatis consectetur, ipsum leo dignissim nulla, sed posuere ligula elit quis nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eget quam mollis, semper enim non, tempus ipsum. Nam facilisis odio eget dui varius, vel viverra felis pretium.

Praesent lacinia eleifend arcu, eu posuere diam accumsan et. Aliquam egestas et ex ut laoreet. Morbi blandit vestibulum sollicitudin. Aenean consequat eleifend leo, non fermentum elit consequat ac. Fusce tincidunt molestie lorem, eu vestibulum massa scelerisque eget. Maecenas eget ullamcorper risus, sit amet sollicitudin purus. Integer porttitor rutrum pharetra. Donec tempus nisl non rhoncus eleifend. Quisque consectetur tincidunt nisl et bibendum. In placerat et odio a pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla malesuada auctor nunc, laoreet gravida ipsum luctus ut. Vivamus in orci vel metus scelerisque pretium. Fusce sed tristique ipsum, quis tristique ex. Duis sagittis est quis tortor iaculis, et porttitor dolor ornare. Etiam faucibus nisi sed nunc tristique, eu lacinia elit lobortis.

Phasellus at lectus vel dolor feugiat suscipit. Nam pharetra augue sed turpis placerat egestas. Nam pharetra metus in lectus ornare, eget congue libero convallis. Vivamus ut metus congue, egestas arcu at, auctor metus. Vestibulum eget turpis purus. Etiam porta iaculis purus, et tempor libero dapibus eu. Donec augue nibh, ornare ut velit ac, malesuada posuere nunc.

Sed fringilla posuere lorem sit amet ultricies. Integer semper arcu sed iaculis tristique. Duis porta libero orci, ut dictum nisi aliquet ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec non venenatis leo. Nam malesuada lacus eget nunc commodo, et iaculis nunc pharetra. Fusce vitae orci tristique, scelerisque nunc vel, egestas neque. Sed ullamcorper mi quis tristique suscipit. Vivamus nunc dolor, dictum a ex quis, ullamcorper dictum metus. Proin id rhoncus sem. Aliquam erat volutpat. In hac habitasse platea dictumst. Suspendisse ac purus id ipsum molestie ultrices sit amet vulputate nunc. Nullam vel eleifend felis. Nullam eros ligula, feugiat ut lobortis ut, ultricies quis ligula.

Morbi rutrum nunc eros, eget viverra odio vehicula vel. Quisque vulputate eu erat id maximus. Aliquam blandit, lacus ut tristique eleifend, metus mauris dictum velit, nec dignissim purus nibh sed orci. Aenean ultricies ac turpis quis ultrices. Vestibulum viverra lobortis venenatis. Proin sagittis eros justo, vitae viverra nisi luctus sit amet. Nulla vitae tortor pulvinar, fringilla metus vel, semper augue. Curabitur suscipit vitae massa eget varius. Nunc aliquet velit non purus maximus ultricies.`

let getLorem = amount =>{
    let rand = ~~(Math.random()*(lorem.length - amount));
    return lorem.substring(rand, rand+amount);
}

export{
    findDevice,
    sendGetFetch,
    sendPostFetch,
    createElement,
    getPerc,
    getLorem
}