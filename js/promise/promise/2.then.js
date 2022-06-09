 
//1.（then中传递的函数）判断成功和失败的函数返回结
//2.判断是否是promise 如果是则停止 就采用他的状态
//3.如果不是promise 则直接将结果传递下去
let Promise = require("./Promise");

//问题1 x和promise2不能是同一个人
// let p1= new Promise((resolve,reject)=>{
//   resolve(33) 
// })
// let promise3 = p1.then(()=>{
//   console.log('promise3')
//   return promise3;
// })
// promise3.then(()=>{
//   console.log("执行") 
// },err=>{
//   console.log(err)
// })

// //promise1
let p = new Promise((resolve,reject)=>{
  // throw new Error(2)
  resolve(3);
})
let promise2 = p.then(data=>{
  return 100; 
},error=>{
  console.log(33333)
}).then(data=>{ 
  //这样x一直就是pending状态，所以不需要进行操作
  console.log(data)
  return 3
},err=>{
  console.log(err)
}).then(data=>{
  console.log(data)
})

//可选参数