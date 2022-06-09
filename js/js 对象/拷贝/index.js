 
/**
 * 浅拷贝
 */
// object.assign

var a ={
  age:22,
  data:{
    name:'3333',
  }
}
var  c = Object.create(a)
c.age =666
c.data.name =444
console.log(a)

// var b = Object.assign({},a)
// b.data.name =3;
// b.age =333
// console.log(a)

var arr =[12,2323,{name:2}]
var arr2=arr.concat();
arr2[2].name =44
console.log(arr)


var o ={age:333,data:{name:3232}}
var d={...o}
d.data.name =333
console.log(o)


//深拷贝
var obj = {
  offer:{
    money:13133,
    company:"一代大神"
  },
  name:'mfy'
}
var obj2 = JSON.parse(JSON.stringify(obj));
obj2.offer.money=3232323
console.log(obj)

var obj3 = {
  offer:{
    money:13133,
    company:"一代大神"
  },
  name:'mfy',
  fun:()=>{
    console.log(d)
  }
}

var obj4 = JSON.parse(JSON.stringify(obj3)); 
console.log('obj4',obj4)

function deepMerge(obj){
  var target = {};
  for(var key in obj){
    let itemObj = obj[key];
    if(typeof itemObj =='object'){
      target[key] = deepMerge(itemObj)
    }else{
      target[key]=obj[key] 
    }
  }
  return target;
}

var obj4 = deepMerge(obj3);
console.log(obj4)

var obj ={
  value:22,
}
function list(name,age){
  console.log(this.value) 
}
list.call(obj,'33',33)
list.apply(obj,['33',33])