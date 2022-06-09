 
let fs = require("fs");
//文件名字 编码 c

/** 
 * 1.进行输入输出式 控制在函数内部*/
let school1 ={}
function out1(key,value){
  school1[key] = value
  if(Object.keys(school1).length ==2){
    console.log("计数方式进行获取的school",school1) 
  }
} 

function after(times,cb){
  let school = {}
  return function(key,value){ 
    school[key] = value
    //达到次数执行 到达指定次数的时候就可以执行
    if(--times==0){
        cb(school)
    }
  }
}
let out = after(2,function(result){
  console.log("after方式进行获取的school",school1) 
})

// 串行---两个同时执行异步的方法
fs.readFile("./file/age.txt",'utf-8',(err,data)=>{ 
  out1('age',data)
  out('age',data)
})
fs.readFile("./file/name.txt",'utf-8',(err,data)=>{ 
  out1('name',data)
  out('name',data)
})

// 并行---两个函数同时执行

//1。回调函数执行
//2.发布订阅模式