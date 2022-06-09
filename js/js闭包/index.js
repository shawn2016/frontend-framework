 
//按照定义一的说法，需要通过作用域链在全局环境中查找变量n的函数foo()就是闭包
var n = 0;
function foo() {
    console.log(n)//0
}
foo();

//按照定义二的说法，嵌套在foo函数里的bar函数就是闭包
function foo1(){
    var a =0;
    function bar(){
        console.log(s)
    }
    bar()
}

function foo2(){
    var a = 3;
    return function(){
        console.log(a)
    }
}
/** 
 * 变量提升
 */
console.log("%c 变量提升 ",'background:yellow')
console.log(pa)
var pa = 100;
console.log(pa)
console.log("%c 面试题",'background:green')

console.log(v1); //undefined
var v1 = 100;
function foo() {
    console.log(v1);//undefined
    // var v1 = 200;
    // console.log(v1); //200
}
foo();
console.log(v1); //100

fun();
 function fun(){
    console.log(3)
}
var fa = 23; 
// function fa(){
//     console.log(55)
// }()
// console.log(fa())

//立即执行函数

(function(){})()
/** 
 * 其他写法
 */
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();

new function(){ /* code */ };
new function(){ /* code */ }();


/** 立即执行函数作用域
 * 
 */

var foo = "abc";
with({
    foo:"bar"
}){
    function f(){
        console.log(foo);
    };
    (function(){
        console.log(foo);
    })();
    f();
}

try{
    var e = 10;
    throw new Error();
}catch(e){
    function f(){
        console.log(e);
    }
    (function (){
        console.log(e);
    })();
    f();
}

function a(){
    a = 1;
    console.log(a);
};
a();
(function a(){
    a = 1;
    //此时的a表示当前的定义的函数
    console.log(a);
})();

/**
 * 自定义执行函数作用
 */
// var a = 0;
// function add(){
//     return ++a;
// }
// console.log(add());//1
// console.log(add());//2

function add(){
    return ++add.count;
}
add.count = 0;
console.log(add.count)
console.log(add());//1
console.log(add());//2

var addMy = (function(){
    var count = 0
    return function(){
        return ++count;
    }
})()
console.log(addMy())
console.log(addMy())


var b =3 
;(function(){
    console.log(2)
})()