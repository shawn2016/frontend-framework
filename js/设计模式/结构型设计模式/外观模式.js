//页面中的点击事件
/**
 * 
 */
 
function addEvent(dom,type,fn){
  if(dom.addEventListener){
    dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
    //不支持addEventListener的方法
    dom.attachEvent('on'+type,fn)
  }else{
    //两个的绑定方式都不支持
    dom['on'+type]=fn
  }
}
addEvent(document.getElementById("yyy"),'click',function(){
  console.log("这是我绑定的第一个事件")
})
addEvent(document.getElementById("yyy"),'click',function(){
  console.log("这是我绑定的第二个事件")
})

var getEevnt =function(e){
  return e ||window.e;
}
//获取元素
var getTarget = function(event){
  var e = event || window.event;
  return event.target || event.srcElement ;
}
//阻止默认行为
var preventDefault = function(e){
  var event = getEevnt(e)
  if(event.preventDefault){
    event.preventDefault();
  }else{
    event.returnValue =false
  }
}