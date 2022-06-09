
function Student(){
    console.log('学生')
}
var student = new Student()

function Student(name){
    console.log('学生')
    this.name = name 
}
var student = new Student(name)

function Student(name){
    console.log('学生')
    this.name = name 
}
// var student =  Student(name)
// console.log(student.name)

console.log(student instanceof Student) //true
console.log(student instanceof Object)  //true

console.log(student)
//constructor
 console.log(student.constructor == Student) //true
 console.log(student.__proto__.constructor == Student) //true

 //返回值
 function fn(){
     this.a = 2;
     return ;
 }
 var test = new fn(); 
 console.log(test)//fn {a: 2}
 //如果构造函数返回一个对象
 function fn1(){
     this.a = 2;
     return {
         a:1,
         b:3
     }
 }
 var test1= new fn1();
 console.log(test1) //{a: 1, b: 3} 其不在和构造函数fn1有任何关系

 //未添加new关键字
 function Person(){
    console.log("未添加new关键字的this",this)
    if(!(this instanceof Person)){ 
        return new Person();
    }
    this.age = 30;
}
function Person2(){
    console.log("添加new关键字的this",this)
   // if(!(this instanceof Person)){
   //     return new Person();
   // }
   this.age = 30;
}
var p = Person();
var p2 = new Person2();

//构造函数含有相同的属性和函数
// 构造函数允许给对象配置同样的属性，但是构造函数并没有消除代码冗余。使用构造函数的主要问题是每个方法都要在每个实例上重新创建一遍。在上面的例子中，每一个对象都有自己的sayName()方法。这意味着如果有100个对象实例，就有100个函数做相同的事情，只是使用的数据不同


// 但是，在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而且，如果对象需要定义很多方法，就要定义很多全局函数，严重污染全局空间，这个自定义的引用类型没有封装性可言了
// 
// 如果所有的对象实例共享同一个方法会更有效率，这就需要用到下面所说的原型对象 