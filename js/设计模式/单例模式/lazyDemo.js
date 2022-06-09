//通常登录弹框
/**
 * 1.在页面写好的html,当进行登录时候进行展示
 * 2.在js中写好，需要的时候进行创建
 */
//2在需要的时候进行创建

var crteateLoginLayer = function(){
  var div = document.createElement('div');
  div.innerHTML = "我是登录悬浮框";
  div.style.display='none';
  document.body.appendChild(div)
  return div;
}
document.getElementById("loginBtn").onclick=function(){
  //什么时候使用什么时候创建
  var layer = crteateLoginLayer();
  layer.style.display = 'block'
}

//创建div的单例数据
var crteateLoginLayer = (function(){
  var instance = null;
  return function(){
    if(!instance) {
      var div = document.createElement('div');
      div.innerHTML = "我是登录悬浮框";
      div.style.display='none';
      document.body.appendChild(div)
      instance = div 
   }
   return instance
  }
})()

//通用的懒惰单例模式
//抽离单例模式管理器
var getSingle = function(fn){
  var result;
  return function(){
    return result || (result = fn.apply(this,arguments))
  }
}
var createLoginLayer = function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
};
//创建一个普通的div
var createSingleLoginLayer = getSingle( createLoginLayer );
document.getElementById( 'loginBtn' ).onclick = function(){
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};
//创建一个iframe
var createIframe = function(){
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe)
  return iframe;
}

var createSingleIframe = getSingle( createIframe );
document.getElementById('loginBtn').onclick=function(){
  var iframe = createSingleIframe();
  iframe.src = 'www.baidu.com'
}


//节点页面渲染

var list = [2,3,4,5,6];

//页面完毕后创建list元素列表
var buttonList = document.getElementById("createList");
var first = 0; //first作为全局的函数
var bindEvent = function(){
  buttonList.onclick=function(){
    first++; //控制只执行一次标志
    if(first >1) return 
    //创建元素
    var ul = document.createElement("ul");
    document.body.appendChild(ul)
    for(var i=0;i<list.length-1;i++){
      var li = document.createElement('li')
      li.innerHTML = list[i];
      ul.appendChild(li)   
    } 
  }
}
var render =function(){
  console.log("开始渲染列表")
  bindEvent()
}
render(); 
//采用单例控制模式


var bindEvent1 = getSingle(function(){
  buttonList.onclick=function(){
    first++; //控制只执行一次标志
    if(first >1) return 
    //创建元素
    var ul = document.createElement("ul");
    document.body.appendChild(ul)
    for(var i=0;i<list.length-1;i++){
      var li = document.createElement('li')
      li.innerHTML = list[i];
      ul.appendChild(li)   
    } 
  } 
});
var render1 = function(){
  console.log( '开始渲染列表' );
  bindEvent();
};
render1(); 