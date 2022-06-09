/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-06 15:18:26
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 15:38:46
 */
var arr =[
  1,2,3,[4,5,6],[7,8,3]
]

function flatArr(arr){
  let newArr = []
  arr.forEach(item=>{
    if(Array.isArray(item)){
      newArr.push(...item)
    }else{
      newArr.push(item)
    } 
  })
  return newArr;
}
let arra =flatArr(arr)
console.log(arra)

function flagn(arr){
  let newArr=[]
 return  arr.reduce((pre,curr)=>{ 
    if(Array.isArray(curr)){
      newArr.push(...curr)
    }else{
       newArr.push(curr)
    }
    return newArr 
  },newArr)
}
let r4 =flagn(arr)
console.log(r4)
 