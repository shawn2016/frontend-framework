/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 14:37:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 15:20:12
 */
const createLink = require("../create-link");
const { head } = require("./base");
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
})

/**
 * 倒数打印链表
 */
function printReverseLink(link){
  //借助stack存储已经遍历的结构
  let stack = [];
  let curr = link;
  while(curr){
    stack.unshift(curr.value)
    curr=curr.next;
  }
  return stack.join("->")
}
let result = printReverseLink(link.head)
console.log(result)

let stackdB = []
function dbPrintReverseLink(link){
  //当前节点不为空
    if(link){
      //继续遍历下一个元素
      if(link.next!=null){
        dbPrintReverseLink(link.next)
      }
      //然后在进行存储当前节点，保证后面的节点都在当前节点的前面
      stackdB.push(link.value)
    }
}
dbPrintReverseLink(link.head);
console.log(stackdB.join("->"))



