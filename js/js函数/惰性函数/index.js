
//绑定事件
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    }
    else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    }
    else{
        element['on' + type] = fun;
    }
}

//添加事件

//第一次绑定
var ele = document.getElementById("bind-event");
addEvent('bind-event',ele,()=>{
    console.log(111)
});
//第二次绑定 
var ele1= document.getElementById("bind-event2");
addEvent('click',ele1,()=>{
    console.log(222)
})


//惰性函数绑定方法1
function addEvent(type, element, fun){ 
    if (element.addEventListener) {
        addEvent = function(type, element, fun){
            element.addEventListener(type, fun, false);
        }
    }else if(element.attachEvent){
        addEvent = function(type, element, fun){
            element.attachEvent('on' + type, fun);
        }
    }else{
        addEvent =function(type,element,fun){
            element['on' + type] = fun;
        }
    }
    return addEvent(type, element, fun)
}

//惰性方法绑定2 利用嗅探思想
var addEvent = (function () {
    if (document.addEventListener) {
        return function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if (document.attachEvent) {
        return function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else {
        return function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
})();

