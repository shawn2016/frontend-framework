/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 10:59:25
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 14:31:46
 */
/**
 * 求链表的长度
 */

 const createLink = require("../create-link")
 let link= new createLink();

 [6,8,2,3,4,5,6,23,3].forEach(element => {
  link.add(element)
 });

 function getLinkLength(link){
   if(!link) return 0
   let number = 1;
   let curr = link;
   while(curr){
     number++;
     curr = curr.next;
   }
   return  number;
 }

 module.exports =getLinkLength