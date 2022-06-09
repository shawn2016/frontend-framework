// var sengMsg = (function sengMsg(){
//   var img = new Image();
//   //返回统计参数
//   return function(params){
//     var str = 'localhost:8080/a.gif?'
//     for(var key in params){
//       str+=key +'=' +params[key]
//     }
//     img.src= str;

//   }
// })()
// sengMsg({name:10})

// //代理对象通过script标签，进行页面通信
// //代理模版方案



// var myImage = (function(){
//   var imgNode = document.createElement( 'img' );
//   document.body.appendChild( imgNode );
//   return {
//       setSrc: function( src ){
//           imgNode.src = src;
//       }
//   }
// })();
// var proxyImage = (function(){
//   var img = new Image;
//   img.onload = function(){
//       myImage.setSrc( this.src );
//   }
//   return {
//       setSrc: function( src ){
//           myImage.setSrc( 'loading.gif' );
//           img.src = src;
//       }
//   }
// })();
// proxyImage.setSrc( 'https://static.xiaohuochai.site/icon/icon_200.png' );

// //进行获取点击
// var synchronousFile =function(id){
//   console.log("同步了文件"+id)
// }
// var checkbox = document.getElementsByTagName( 'input' );
// for ( var i = 0, c; c = checkbox[ i++ ]; ){
//     c.onclick = function(){
//         if ( this.checked === true ){
//           proxySynchronousFile( this.id );
//         }
//     }
// };

// //
// var proxySynchronousFile = (function(){
//   var cache = [], // 保存一段时间内需要同步的ID
//   timer; // 定时器
//   return function( id ){
//       cache.push( id );
//       if ( timer ){ // 保证不会覆盖已经启动的定时器
//           return;
//       }
//       timer = setTimeout(function(){
//       synchronousFile( cache.join( ',' ) ); // 2 秒后向本体发送需要同步的ID 集合
//       clearTimeout( timer ); // 清空定时器
//       timer = null;
//       cache.length = 0; // 清空ID 集合
//   }, 2000 );
//   }
// })();

//惰性加载中进行应用
// var cache = [];
// //打印的函数
// var miniConsole = {
//     log: function(){
//         var args = arguments;
//         cache.push( function(){
//             return miniConsole.log.apply( miniConsole, args );
//         });
//     }
// };
// miniConsole.log(1);

// var handler = function( ev ){ 
//   var cache =[]
//   if ( ev.keyCode === 13 ){
//     //当点击的时候进行获取script标签 预加载标签
//       var script = document.createElement( 'script' );
//       script.onload = function(){
//           for ( var i = 0, fn; fn = cache[ i++ ]; ){
//               fn();
//           }
//       };
//       script.src = 'miniConsole.js';
//       //大点结束后进行隐藏
//       document.getElementsByTagName( 'head' )[0].appendChild( script );
//       document.body.removeEventListener( 'keydown', handler );// 只加载一次miniConsole.js
//   }
//   return {
//     log: function(){
//         var args = arguments;
//         cache.push( function(){
//             return miniConsole.log.apply( miniConsole, args );
//         });
//     }
// } 
// };
// 按f2时候进行大点
// window.addEventListener('keydown',handler,false)
var miniConsole = (function(){
  var cache = [];
  var handler = function( ev ){
      if ( ev.keyCode === 13 ){
        console.log(cache)
          var script = document.createElement( 'script' );
          script.onload = function(){
              for ( var i = 0, fn; fn = cache[ i++ ]; ){
                  fn();
              }
          };
          script.src = 'miniConsole.js';
          document.getElementsByTagName('head' )[0].appendChild( script );
          document.body.removeEventListener('keydown', handler );// 只加载一次miniConsole.js
      }
  };
  document.body.addEventListener( 'keydown', handler, false );
  return {
      log: function(){
          var args = arguments;
          cache.push( function(){
              return miniConsole.log.apply( miniConsole, args );
          });
      }
  }
})();
miniConsole.log( 11 ); // 开始打印log


//缓存代理
var mult = function(){
  console.log( '开始计算乘积' );
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
      a = a * arguments[i];
  }
  console.log("乘积为"+a)
  return a;
};
// var a = mult(2,3,4,5); 
//进行缓存函数的计算
var  proxyMult = (function(){
  var cache = [];
  return function(){
    var args = Array.prototype.join.call(arguments,'');
    console.log(cache)
    //查看缓存中是否存在 存在则取缓存 
    if(args in cache){ 
      return cache[ args ];
    }
    //不存在则进行缓存 计算值
    return cache[ args ] = mult.apply(this,arguments)
  }
})()

var a = proxyMult(1,2,3) //
var b = proxyMult(3,2,3)
var c = proxyMult(1,2,3)
console.log(a) //6
console.log(b) //18
console.log(c)  //8


//---------------复杂函数进行--------

/**************** 计算乘积 *****************/
var mult = function(){
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
      a = a * arguments[i];
  }
  console.log("乘积基本函数执行了")
  return a;
};
/**************** 计算加和 *****************/
var plus = function(){
  var a = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
      a = a + arguments[i];
  }
  console.log("加和基本函数执行了")
  return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function( fn ){
  var cache = {};
  return function(){
    console.log(cache)
      var args = Array.prototype.join.call( arguments, ',' );
      if ( args in cache ){
          return cache[ args ];
      }
      return cache[ args ] = fn.apply( this, arguments );
  }
};
var proxyMultM = createProxyFactory(mult),
proxyPlusM = createProxyFactory(plus);
console.log(proxyMultM)
console.log ( proxyMultM( 1, 2, 3, 4 ) ); // 输出：24
console.log ( proxyMultM( 1, 2, 3, 4 ) ); // 输出：24
console.log ( proxyPlusM( 1, 2, 3, 4 ) ); // 输出：10
console.log ( proxyPlusM( 1, 2, 3, 4 ) ); // 输出：10
