const { countReset } = require("console")

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 16:02:29
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 16:28:49
 */
var obj ={
  a:333,
  i:3333,
  c:4444
}
var obj2 = {
  k:2
}
// obj2.prototype =obj;
// for(var key in obj2){
//   if(obj2.hasOwnProperty(key)){
//     console.log(key,obj2[key])
//   } 
// }
const map =new Map();
map.a=3;
map.b=55
console.log(map)
console.log(map.entries())

for(let key of map.entries()){
  console.log(key)
}
 