/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 09:50:38
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-02 09:57:55
 */
const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
});
link.addRing(3) 

/**
 * 找到环的入口节点
 */
//先获取相遇节点

function getMeetNode(link){
  let slow = link;
  let fast = link;
  while(slow && fast.next){
    slow = slow.next;//慢指针
    fast = fast.next.next;//快指针
    if(slow.value == fast.value){
      return slow;
    } 
  }
  return null;
}

//根据入口节点 找到入口节点
function findEntry(link){
  let node = getMeetNode(link);
  if(!node) return null;
  let p1 = node;
  let p2 = link;
  while(p1 != p2){
    p1=p1.next;
    p2=p2.next
  }
  return p2
}
let result = findEntry(link.head)
console.log(result.value)
