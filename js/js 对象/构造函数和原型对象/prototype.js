
//原型对象
/**
 * 说起原型对象，就要说到原型对象、实例对象和构造函数的三角关系 
　　接下来以下面两行代码，来详细说明它们的关系
 */
function Foo(){};
Foo.property={
    say:()=>{
        console.log("hellow")
    }

}
var f1 = new Foo;
var f2 = new Foo;


// 　in操作符可以判断属性在不在该对象上，但无法区别自有还是继承属性
var o = {a:1};
//重新创建了对象
var obj = Object.create(o);
console.log(obj)
console.log(obj.a)
obj.b = 2;
console.log('a' in obj);//true
console.log('b' in obj);//true
console.log('b' in o);//false

//hasOwnProperty()
var o = {a:1};
var obj = Object.create(o);
obj.b = 2;
console.log("a在obj上属性",obj.hasOwnProperty('a'));//false
console.log("b在obj上属性",obj.hasOwnProperty('b'));//true

//判断
function hasPrototypeProperty(object,name){
    //name in Object 判断当前属性是否在原型链上
    //object.hasOwnProperty(name)  判断当前属性是否是object上的属性 
    //整合：该属性是否在原型链上
    return name in object && !object.hasOwnProperty(name);
}

console.log(hasPrototypeProperty(obj,'b'))