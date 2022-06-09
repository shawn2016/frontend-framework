 
/**
 * 高阶函数-回调函数
 */
//1.请求回调，当我们请求不知道什么时候返回时候
function ajax(callback){
    $.ajax( 'http://xx.com/getUserInfo?' + userId, function( data ){
        //不确定什么时候返回，进行回调执行
        if ( typeof callback === 'function' ){
          callback( data );
        }
      });
}

//2.运用在函数中
var appendDiv = function(){
    for ( var i = 0; i < 100; i++ ){
      var div = document.createElement( 'div' );
      div.innerHTML = i;
      document.body.appendChild( div );
      div.style.display = 'none';
    }
  };
  appendDiv();
  //
  var appendDiv = function(){
    for ( var i = 0; i < 100; i++ ){
      var div = document.createElement( 'div' );
      div.innerHTML = i;
      document.body.appendChild( div );
   
    }
  };
  appendDiv((node)=>{
    node.style.display = 'none';
  });


  //3.数组操作
  var arr = [1,2,4,5,1,3,4];
  arr.sort((a,b)=>{
      return a-b; //数组从小到大排序
  })
  arr.sort((a,b)=>{
    return b-a; //数组从大到小排序
  })
  //对数组的每一项都增加3
  arr.forEach((item,index)=>{
      item=item+3;
  })


  /**
   * 函数作为返回值
   */
  var isString = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object String]';
  };
  var isArray = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object Array]';
  };
  var isNumber = function( obj ){
    return Object.prototype.toString.call( obj ) === '[object Number]';
  };

  //进行封装
  var isType = function( type ){ 
    return function( obj ){
      return Object.prototype.toString.call( obj ) === '[object '+ type +']';
    }
  };
  
  var isString = isType( 'String' ); 
  var isArray = isType( 'Array' ); 
  var isNumber = isType( 'Number' );
  
  console.log( isArray( [ 1, 2, 3 ] ) );    // 输出：true

//   AOP 面向切面编程
//通常，在javascript中实现AOP，都是指把一个函数“动态织入”到另外一个函数之中。下面通过扩展Function.prototype来实现

// 通过prototype进行扩展
Function.prototype.before = function(beforefn){
    var _this = this ;//保持函数原始引用；
    return function(){//返回了包含原函数和新函数的代理函数
        beforefn.apply(this,arguments) ;//先执行当前要先执行的函数
        return _this.apply(this,arguments) ;//在执行原函数

    }
}

Function.prototype.after = function(afterFn){
    var _this = this ;//保持函数原始引用；
    return function(){//返回了包含原函数和新函数的代理函数
        var ret = _this.apply(this,arguments) ;//在执行原函数
        afterFn.apply(this,arguments) ;//先执行当前要先执行的函数
       return ret;//返回原函数
    }
}

var func = function () {
    console.log(2);
  };

  func = func.before(function(){
      console.log("偶是前置函数")
  }).after(function(){
      console.log("偶是后置函数")
  })
  func();


  //返回参数的
  function not(f) {
    return function () {
      return !(f.apply(this, arguments));
    };
  }
  //偶数时，返回true；奇数时，返回false
  var even = function (x) {
    return x % 2 === 0;
  }
  //偶数时，返回false；奇数时，返回true
  var odd = not(even);
  var result = [1, 1, 3, 5, 5].every(odd);//true
  console.log(result)

//mapper 
  //所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()，并返回所有计算结果组成的数组
    function mapper(f){
        return function(a){
            // map 接受到的为当前参数和 函数操作
            console.log(a) //[1,2,3]
            console.log(f) //increment
            return Array.prototype.map.call(a,f);
        }
    }
    var increment = function(x){
        return x+1;
    }

    var incrementer = mapper(increment);
    incrementer([1,2,3]);//[2,3,4] 
//squareofsum 计算平方数
//返回一个新的可以计算f(g(...))的函数
//返回的函数h()将它所有的实参传入g()，然后将g()的返回值传入f()
//调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f,g){
    return function(){
        //需要给f()传入一个参数，所以使用f()的call()方法
        //需要给g()传入很多参数，所以使用g()的apply()方法 
        console.log(arguments)
        return f.call(this,g.apply(this,arguments));
    };
}
var square = function(x){
    return x*x;
}
var sum = function(x,y){
    return x + y;
}
//sun 将作为参数传入到square中 计算
var squareofsum = compose(square,sum);
squareofsum(2,3);//25

var sumMutiply = function(){ 
    var args =[].slice.call(arguments)
    console.log(args);
    var sum =  0;
    args.forEach(item=>{
        sum +=item;
    })
    return sum;
}
var squareofsum2 = compose(square,sumMutiply)

var result = squareofsum2(3,4,5,1,2);
console.log(result)
