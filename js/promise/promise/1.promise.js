 
/**
 * promise 承诺
 */
// const Promise = require('./Promise')
 
 //then 的用法

 const fs = require('fs');
// const Promise = require('./promise');
 // 1回调嵌套 异步错误处理不能够统一
//  fs.readFile('./name.txt','utf-8',(err,file)=>{
//    console.log(file);
//    fs.readFile('./name.txt','utf-8',(err,file)=>{
//     console.log(file);
//   })
//  })
function read(){
  return new Promise((resolve,reject)=>{
      fs.readFile('./name.txt','utf-8',(err,file)=>{
        if(err) reject(err)
        resolve(file)
      })
  })
}
//如果一个promise的then方法中的函数函数（成功和失败）
//返回的结果是一个promise会自动将这个结果执行，并且采用他的状态
//如果成功会将成功的结果向外层的下一个then传递
read('./name.txt').then(data=>{
  console.log(data)
  return read(data)
},err=>{
  console.log(err)
  //如果返回的是一个普通的值 会将普通值作为下一次的结果
  return undefined;
}).then(data=>{
  console.log("读取成功的data",data) 
  return data;
},err=>{
  console.log('失败')
}).then(data=>{
    //希望这里不在继续执行
  console.log("data",data) 
  //终止Promise 返回一个pending的状态的值
  return new Promise(()=>{})  
},err=>{
  console.log('失败')
})
.then(data=>{xw
  console.log("最后一个then",data)  
},err=>{
  console.log("最后一个失败")
})
.then(data=>{
  console.log("最后一个then",data)  
},err=>{
  console.log("最后一个失败")
})

//z只有两种情况会失败 返回一个失败的promise 或者抛出一场
//每次执行promise的时候 都会返回一个新的Promis实例

