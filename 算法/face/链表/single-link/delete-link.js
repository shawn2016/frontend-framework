/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 16:09:28
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 20:18:49
 */
/**
 * 删除链表中的某个节点
 */

const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,19,23,7].forEach(element => {
 link.add(element)
});

/**
 * 删除链表中某个节点
 * @param {*} link 
 * @param {*} node 
 */
function deleteSingleNode(link,node){
  if(!link) return null;
  let curr = link,pre=null;
  while(curr){
     //当前存在 则删除
    if(curr.value == node){ 
      //不是删除的在最后一个
      if(curr.next){
        curr.value = curr.next.value;
        curr.next =  curr.next.next;
        break;
      }else{
        //最后一个元素
        pre.next = null;
        break;
      }  
    } 
    pre = curr;
    curr  = curr.next; 
  }
  //清除掉空的元素
}
deleteSingleNode(link.head,5)
link.print() 
 
deleteSingleNode(link.head,7)
link.print() 

/**
 * 删除链表中重复的节点
 * 题目描述 删除有序链表中重复的节点（只要是重复都去删除）
 */
 function deleteMoreNode(link){
    if(!link) return null
    let curr = link,pre = link;
    //第一个特殊
    if(curr.next && curr.value == curr.next.value){
      var isFirst = true;
    }
    while(curr){
      //比较当前和后面一个是否相等
      if(curr.next){
        //两个元素相等
        if(curr.value == curr.next.value){
          //持续遍历 直到不相等
          while(curr.next && curr.value == curr.next.value ){
            curr = curr.next;
          }  
          curr = curr.next;  
          pre.next = curr;   
        }else{ 
          pre = curr; 
          curr = curr.next;  
        }   
      } else{
        curr=curr.next;
      }
    }
    //第一元素相等 删除第一个元素  
    if(isFirst){  
      if(link.next){
        link.value = link.next.value;
        link.next = link.next.next || null; 
      }else{ 
        link.value = null
      }    
    }  
 }
let link2= new createLink();

[1,2,2,3,4,4,4,5,6,7].forEach(element => {
 link2.add(element)
});
deleteMoreNode(link2.head)
link2.print()

 let link3= new createLink(); 
[1,1,7,7,8,8].forEach(element => {
 link3.add(element)
});
deleteMoreNode(link3.head)
link3.print()


function deleteMoreNodeStack(link){
  if(!link) return null;
  let stack =[];
  stack.push(link.value)
  let curr = link.next,pre = link; 
  while(curr){ 
    if(stack.indexOf(curr.value)>-1){   
      //存在当前元素 进行删除 
      while(stack.indexOf(curr.value)>-1){  
         curr = curr.next;
         //此时说明元素已经不存在了
         if(!curr){
           pre.value = null;
           pre.next = null
           return ;
         }
      }   
      if(curr){
        stack.push(curr.value)
        pre.value = curr.value;
        pre.next = curr.next;
      }     
    }else{ 
      stack.push(curr.value)
      pre = curr;   
    }
    curr &&  (curr = curr.next) 
  } 
   
}

let link4= new createLink(); 
[1,1,4,6,7,7,8,8,9,9,9].forEach(element => {
 link4.add(element)
});
deleteMoreNodeStack(link4.head)
link4.print()
