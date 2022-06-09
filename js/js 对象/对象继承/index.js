
// 原型链继承

//本质上是重写圆形对象，代之以一个新类型的实例，
function Super(){
    this.value = true;
}
Super.prototype.getValue = function(){
    return this.value;
}
var NewSuper = new Super();
console.log("Super",Super)
console.log("NewSuper",NewSuper)
console.log("Super.prototype",Super.prototype)
console.log("NewSuper.__proto__",NewSuper.__proto__)
function Sub(){} 
//Sub继承super
Sub.prototype = NewSuper;
console.log("Sub.prototype",Sub.prototype)


// Sub.prototype.constructor = Sub;
var instance = new Sub();
console.log('new Sub()',instance)
console.log("instance.__proto__",instance.__proto__)

console.log(instance.getValue())


function Super1(){
    this.colors = ['red','blue','green'];
}
function Sub1(){};
//Sub继承了Super
Sub1.prototype = new Super1();
var instance1 = new Sub1();
console.log(instance1)
instance1.colors.push('black');
console.log(instance1.colors);//'red,blue,green,black'
var instance2 = new Sub1();
console.log(instance2.colors);//'red,blue,green,black'





//借用构造函数
function Super2(){
    this.colors = ['red','blue','green'];
}
function Sub2(){
    //继承了Super
    Super2.call(this);
}
var instance2 = new Sub2();
instance2.colors.push('black');
console.log(instance2.colors);// ['red','blue','green','black']
var instance3 = new Sub2();
console.log(instance3.colors);// ['red','blue','green']



// 组合继承
var data = function(){
    var count = 0;
function Super(name){
    console.log(count++)
    this.name = name;
    this.colors = ['red','blue','green'];
}
Super.prototype.sayName = function(){
    console.log(this.name);
};

function Sub(name,age){
    console.log(count++)
    //继承属性
         // 第二次调用Super()，Sub.prototype又得到了name和colors两个属性，并对上次得到的属性值进行了覆盖
    Super.call(this,name);
    this.age = age;
}
//继承方法
// 第一次调用Super()，Sub.prototype得到了name和colors两个属性
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
    console.log(this.age);
}

var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"
instance1.sayAge();//29

// var instance2 = new Sub("hu",27);
// console.log(instance2.colors);//['red','blue','green']
// instance2.sayName();//"hu"
// instance2.sayAge();//27
    
}
data();


function SuperU(){
    function Super(name){
        console.log("执行")
        this.name = name;
        this.colors = ["red","blue","green"];
    }
    Super.prototype.sayName = function(){
        return this.name;
    };
    
    function Sub(name,age){
        Super.call(this,name);
        this.age = age;
    }
    if(!Object.create){
    　　Object.create = function(proto){
    　　　　function F(){};
          console.log("创建函数")
    　　　　F.prototype = proto;
           console.log(F)
    　　　　return new F;
    　　}
    }
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    
    var instance1 = new Sub("bai",29);
    instance1.colors.push("black");
    console.log(instance1.colors);//['red','blue','green','black']
    instance1.sayName();//"bai"
    
    var instance2 = new Sub("hu",27);
    console.log(instance2.colors);//['red','blue','green']
    instance2.sayName();//"hu"
}
SuperU()


//原型继承
function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}
var superObj = {
    init: function(value){
      this.value = value;
    },
    getValue: function(){
      return this.value;
    }
  }
  
  var subObj = object(superObj);
  console.log(subObj)
  subObj.init('sub');
  console.log(subObj.getValue());//'sub'

  function PrototypeD(){
    var superObj = {
        colors: ['red','blue','green']
    };
    var subObj1 = object(superObj);
    subObj1.colors.push("black");
    console.log("subObj1",subObj1)
    
    var subObj2 = object(superObj);
    subObj2.colors.push("white");
    console.log("subObj2",subObj2)
    
    console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
    console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]
  }
  PrototypeD()
 //寄生式继承
  function P(){
    function parasite(original){
         //通过调用函数创建一个新对象
        var clone = Object.create(original)
         //以某种方式来增强这个对象
        clone.sayHi = function(){
            console.log("hi");
        };
        //返回这个对象 此时这个对象和创建的对象的引用空间变化
        return clone;//返回这个对象
    }
    var superObj = {
        colors: ['red','blue','green']
    };
    var subObj1 = parasite(superObj);
    subObj1.colors.push('black');
    var subObj2 = parasite(superObj);
    subObj2.colors.push('white');
    console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
    console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]
  }