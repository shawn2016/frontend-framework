/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 21:41:20
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 22:02:17
 */
/**
 * 
 */

const createLink = require("../create-link")
let link= new createLink();
[1,2,3,4,5,6].forEach(element => {
 link.add(element)
});
let link2= new createLink();
[3,5,6,7,9].forEach(element => {
  link2.add(element)
 });

 /**
  * 合并两个有序链表 常规做法
  * @param {*} link1 
  * @param {*} link2 
  */
function mergeLink(link1,link2){
  if(!link1 && !link2){
    return link2 || link1;
  }
  let newLink = new createLink();
  let curr1=link1,curr2=link2;
  while(curr1 && curr2){ 
    if(curr1.value > curr2.value){
      //如果link2的元素小将2的元素压入到新链表中 则2的指针向后移动
      newLink.add(curr2.value);
      curr2 =curr2.next;
    }else{
      newLink.add(curr1.value);
      curr1 =curr1.next;
    }
  }
  //查看是否还存在剩余元素
  while(curr2){
    newLink.add(curr2.value);
    curr2 = curr2.next;
  }
  while(curr1){
    newLink.add(curr1.value);
    curr1 = curr1.next;
  }
  return newLink;
}


let result = mergeLink(link2.head,link.head)
result.print()
class LinkNode {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

//递归实现
function dgMergeLink(link1,link2){
  let newLink = new LinkNode();
  //link1 或者link2为空 则返回对方
  if(link1 ==null){
    return link2;
  }else if(link2 ==null){
    return link1
  }else{
     //比较两个的大小
     if(link2.value > link1.value){
       newLink = link1; //将link1压入 继续遍历link1.next
       newLink.next = dgMergeLink(link1.next,link2)
     }else{
      newLink = link2; //将link2压入 继续遍历link2.next
      newLink.next = dgMergeLink(link1,link2.next)
     }
     return newLink 
  } 
}
let result1 = dgMergeLink(link2.head,link.head) 
let r = new createLink();
r.header = result1;
r.print()