 

var a = '1';
var b = 3
var str = '我是变量'

var obj = {
  a:2,
  b:33
}
var arr = [
  2,3,4
]

var name ='mfy'
var editName = name;
editName = 'yyy'

var personalMsg ={
  name:'mfy',
  age:22,
  offer:'fy'
}

var clonePer = personalMsg;
personalMsg.name = 'yyy'

// ToPrimitive(personalMsg)
console.log('')
 


//引用类型校验

console.log("数组格式",[3,4,2,2])
console.log("对象Object",{a:3,b:44})
console.log("正则Regexp",new RegExp('.*?'))

// console.log(
//   Object.prototype.toString.call(null),'\n',
//   Object.prototype.toString.call(11),'\n',
//   Object.prototype.toString.call(false),'\n',
//   Object.prototype.toString.call('333'),'\n',
//   Object.prototype.toString.call([3,4,2,2]),'\n',
//   Object.prototype.toString.call({a:3,b:44}),'\n',
//   Object.prototype.toString.call(new RegExp('.*?')),'\n', 
//   Object.prototype.toString.call(new Promise((resolve,reject)=>{resolve(2)})),'\n',
// )


function Super (){
  this.name = 'myyu'
}
let superNew = new Super(); 

function myInstanceof(left,right){ 
  if(!right || !left) return false;  
  //左侧的实例进行查找
  let pro = left.__proto__;
  //获取右侧的原型
  let prototype = right.prototype;  
  while(pro){
    if(pro == prototype){
      return true
    }
    pro = pro.__proto__;
  }
  return false;
}

console.log(myInstanceof(superNew,Super))