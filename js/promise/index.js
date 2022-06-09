 
const Promise = require('./Promise')
let p = new Promise((resolve,reject)=>{
  resolve(33)
}) 
// p.then(data=>{
//   console.log(data)
// },err=>{
//   console.log(data)
// })

const p1= Promise.reject(1)
const p2= Promise.reject(3)
const p3= Promise.reject(4)

// const py = Promise.any([p1,p3,p2])
// console.log(py)
// py.then(data=>{
//   console.log(data)
// },err=>{
//   console.log(err)
// })
const pd = Promise.try((data,dd)=>{
  console.log(11)
  return 22
})
console.log(pd)
pd.then((data)=>{
  console.log(data)
},err=>{
  console.log(err)
})