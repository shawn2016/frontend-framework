var decorator = function(inputEl,fn){ 
  //如果该事件元已经绑定了事件 
  if(typeof inputEl.oninput == 'function'){
    //缓存原有的事件
    var oninputfn = inputEl.oninput
    inputEl.oninput =function(){
      //执行原有的函数
      oninputfn();
      //执行新增加的函数
      fn();
    }
  }else{
    inputEl.oninput = fn;
  }
}
function selfFun(){
  console.log("我是通过原绑定的")
}
decorator( document.getElementById("input"),function(){
  console.log("我是通过装饰者增加的事件")
})
var plane = {
  fire: function(){
      console.log( '发射普通子弹' );
  }
}
var missileDecorator = function(){
  console.log( '发射导弹' );
}
var atomDecorator = function(){
  console.log( '发射原子弹' );
}
var fire1 = plane.fire;
plane.fire = function(){
  fire1();
  missileDecorator();
}
var fire2 = plane.fire;
plane.fire = function(){
  fire2();
  atomDecorator();
}
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹

window.onload=function(){
  console.log("onload1");
}
var _onload=window.onload||function(){ };
window.onload=function(){
  _onload();
  console.log("其他的事情");
}

Function.prototype.before = function( beforefn ){
  var __self = this; // 保存原函数的引用
  return function(){ // 返回包含了原函数和新函数的"代理"函数
      beforefn.apply( this, arguments ); // 执行新函数，且保证this 不被劫持，新函数接受的参数
  // 也会被原封不动地传入原函数，新函数在原函数之前执行
      return __self.apply( this, arguments ); // 执行原函数并返回原函数的执行结果，
  // 并且保证this 不被劫持
  }
}
Function.prototype.after = function( afterfn ){
  var __self = this;
  return function(){
      var ret = __self.apply( this, arguments );
      afterfn.apply( this, arguments );
      return ret;
  }
};
window.onload = function(){
  console.log (1);
}
window.onload = ( window.onload || function(){} ).after(function(){
  console.log(2);
}).after(function(){
  console.log (3);
}).after(function(){
  console.log (4);
});


//数据上报  
    Function.prototype.after = function( afterfn ){
        var __self = this;
        return function(){
            var ret = __self.apply( this, arguments );
            afterfn.apply( this, arguments );
            console.log(afterfn)
            return ret;
        }
    };
    var showLogin = function(){
        console.log( '打开登录浮层' );
    }
    var log = function(){
        console.log( '上报标签为: ' + this.getAttribute( 'tag' ) );
    }

    showLogin = showLogin.after( log ); // 打开登录浮层之后上报数据
    document.getElementById( 'button' ).onclick = showLogin;


//动态改变参数
Function.prototype.before=function(beforefn){
  var __self = this;

  return function(){
    beforefn.apply(this,arguments);    //(1)  
    return __self.apply(this,arguments);    //更新self里面的参数
  }
}

var ajax =function(type,url,param){
  console.log(param);
  //发送ajax请求的代码略
};
ajax('get','http://xx.com/userinfo',{name:'match'});
//ajax增加了一个参数 
//第一种方法 直接在参数列表上增加token
ajax('get','http://xx.com/userinfo',{name:'match',token:'eeee'});
//第一种方法缺点
/**
 * 但ajax函数相对变得僵硬了，每个从ajax函数里发出的请求都自动带上了Token参数，虽然在现在的项目中没有什么问题，但如果将来把这个函数移植到其他项目上
 * 或者把它放到一个开源库中供其他人使用，Token参数都将是多余的。
 * 也许另一个项目不需要验证Token，或者是Token的生成方式不同，无论是哪种情况，都必须重新修改ajax函数
 */
var getToken =function(){
  return'Token';
}
// 　　明显可以看到，用AOP的方式给ajax函数动态装饰上Token参数，保证了ajax函数是一个相对纯净的函数，提高了ajax函数的可复用性，它在被迁往其他项目的时候，不需要做任何修改
//进行参数的扩展
ajax=ajax.before(function(type,url,param){
  param.Token=getToken();
});

ajax('get','http://xx.com/userinfo',{name:'match'});


/**
 * before 和after探秘
 */
//动态改变参数
Function.prototype.before=function(beforefn){
  var __self = this;
  return function(){
    //先执行before函数
    beforefn.apply(this,arguments); 
    //执行当前的调用函数
    return __self.apply(this,arguments);    //更新self里面的参数
  }
}
Function.prototype.after=function(afterfn){
  var __self = this;
  return function(){
    //记录本身函数执行时应该返回的返回值
    var ret = __self.apply( this, arguments ); //先执行当前的函数
    //执行after的函数
    afterfn.apply( this, arguments ); 
    return ret;
  }
}
function afterfn(){
  console.log("执行了after函数")
}
function beforefn(){
  console.log("执行了before函数")
}
var add = function(a,b){
  return a+b 
}
add = add.before(beforefn) 
add(3,5)
add = add.after(afterfn)
add(5,3)
console.log(add)
