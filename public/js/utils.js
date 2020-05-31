let device = "desktop";
let width = window.screen.availWidth;
if(width >= 768 && width < 1025){
    device = "tablet";
}else if(width < 767){
    device = "mobile";
}