/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 10:02:55
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-02 10:12:21
 */
 
const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
});
link.addRing(3) 

function comRingLength(link){
   if(!link) return null;
   let fast = link;
   let slow = link;
   //找到相遇点
   while(fast.next && slow){
     fast =fast.next.next;
     slow = slow.next
     if(fast == slow){
       break;
     }
   }
   console.log(slow.value)
   //继续出发
   slow =slow.next; 
   fast = fast.next.next;
   let num = 1;
   //当它们再次相遇的时候；
   while(slow != fast){
     fast = fast.next.next;
     slow = slow.next; 
     num ++;
   }
   return num; 
}
let number = comRingLength(link.head)
console.log(number)