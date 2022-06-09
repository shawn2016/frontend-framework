/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 09:16:17
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-02 09:34:28
 */
 
 const createLink = require("../create-link")
 let link= new createLink();
 
 [6,8,2,3,4,5,6,23,3].forEach(element => {
  link.add(element)
 });
 link.addRing(3) 

 let link1= new createLink();
 
 [6,8,2,3,4,5,6,23,3].forEach(element => {
  link1.add(element)
 }); 
/**
 * 判断链表是否存在 环
 * 穷举法
 */
function isCommonRing(link){
  let curr = link;
  while(curr){
    //已经访问过了 则存在 表示 有环
    if(curr.isVisted){
      return true;
    }
    curr.isVisted = 1; 
    curr =curr.next
  }
  return false;
}

let result =isCommonRing(link.head)
console.log(result)
let result1 =isCommonRing(link1.head)
console.log(result1)

console.log("----快慢指针----")
/**
 * 快慢指针
 */
function isHaveRingFast(link){
  let slow = link;
  let fast = link;

  while(slow && fast.next){
    slow = slow.next;//慢指针
    fast = fast.next.next;//快指针
    if(slow.value == fast.value){
      return true;
    } 
  }
  return false;
}
let result2 =isHaveRingFast(link.head)
console.log(result2)
let result3 =isHaveRingFast(link1.head)
console.log(result3)