/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 15:22:13
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 11:42:10
 */
/**
 * 反转链表
 */
const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
}); 


function reverseLink(link){
  if(!link) return null; 
  let pre = null,pReversedHead;
  let curr = link; 
  while(curr){
    let needNext = curr.next;//创建一个临时的next  
    //调换当前的pre 和curr的指向 
    curr.next = pre;
    pre = curr;  
    curr = needNext;   
  }    
  return pre 
}


//重写单链表反转

function myreverseLink(link){
  if(!link) return null; 
  let curr = link,pre = null;
  while(curr){
    //存储下一个要访问的节点
    let nextT = curr.next;
    //将当前访问的节点访问到next
     curr.next =  pre;
     //然后将pre置为当前访问节点
     pre = curr;
     //curr继续访问下一个节点
     curr= nextT;
  }
  return pre
}


let result = myreverseLink(link.head) 
console.log(JSON.stringify(result)) 
