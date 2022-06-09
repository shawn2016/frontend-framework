 
// finally 最终的 就是所有的异常都会被执行
const Promise =  require('./Promise')
let p = new Promise((resolve,reject)=>{
  console.log(333)
  resolve(2)
}) 
 
p.finally(()=>{
  console.log("最终的")
  return new Promise((resolve,reject)=>{console.log(332223)})
}).then((e)=>{
  console.log(e)
})



