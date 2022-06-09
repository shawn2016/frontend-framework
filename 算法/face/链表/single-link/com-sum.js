/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 20:48:03
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 21:30:52
 */
const createLink = require("../create-link")
class LinkNode {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

let link= new createLink();
[6,8,4].forEach(element => {
 link.add(element)
});

let link1= new createLink();
[6,8,9,9].forEach(element => {
 link1.add(element)
});

/**
 * 计算两个链表的和
 */

 function comSumNode(link1,link2){
   if(!link1 || !link2) {
     return link1 || link2
   }
   let curr1 =link1,curr2 = link2;
   //t用来进行计算的总会 sum表示是否有进位
   let t = new createLink(),sum=0;
   while(curr1 && curr2){ 
     let value = curr2.value + curr1.value; 
     //判断前一位是否有进位
     value = sum ? value+1 : value;
     sum = 0 
     //当前的t.value是否大于0 如果是 则表示下一位需要进位
     if(value>10){
       sum=1;
       value =value -10;
     }  
    t.add(value)
    curr2 = curr2.next;
    curr1 = curr1.next; 
   }
   //查看sum ,curr2和curr1是否存在剩余的元素
   while(curr1){
     value = sum? curr1.value+sum:curr1.value;
     sum =0;
     if(value>=10){
       sum =1
       value = value-10
     }
     t.add(value)
     curr1= curr1.next;
   }
   while(curr2){
    value = sum? curr2.value+sum:curr2.value;
    sum =0;
    if(value>=10){
      sum =1
      value = value-10
    }
    t.add(value)
    curr2= curr2.next;
  }
  //还存在sum
  if(sum){
    t.add(sum)
  }
   return t.head;
 }
 let result = comSumNode(link1.head,link.head)
 console.log(JSON.stringify(result)) 