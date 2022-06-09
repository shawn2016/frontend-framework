 
 
let fs = require("fs");

// 并行---两个函数同时执行

//1.回调函数执行
let event ={
  _arr:[],
  //发布和订阅的时间没有任何的关系
  on(fn){
    this._arr.push(fn)
  },
  emit(){
    this._arr.forEach(fn=>fn())
  }
}
let school ={};
event.on(function(){
  console.log("ok",)
})
event.on(function(){
  console.log("ok",)
  if(Object.keys(school).length ==2){
    console.log(school)
  }}
  )
//2.发布订阅模式
 
// 串行---两个同时执行异步的方法
fs.readFile("./file/age.txt",'utf-8',(err,data)=>{ 
  out1('age',data)
  out('age',data)
})
fs.readFile("./file/name.txt",'utf-8',(err,data)=>{ 
  out1('name',data)
  out('name',data)
})
//观察者模式 和发布订阅有什么区别
// 发布订阅无区别 不影响
//观察者（有关系的，而且是基于发布订阅的模式）