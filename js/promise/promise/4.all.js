
//promise.all 是在案全部等待，所有异步执行万，拿到结果



let Promise = require('./Promise')

let fs = require('fs');

function read(url) {
  let dfd = Promise.defer();
  fs.readFile(url, 'utf-8', (err, data) => {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise;
}
// read('./name.txt').then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })
 const p1 =new Promise((resolve,reject)=>{
  reject(33)
 })
let p = Promise.all([1, p1, 3, 4, read('./name.txt')])
p.then((data) => {
  console.log(data)
},err=>{
  console.log(err)
})

