/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 20:18:59
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 20:40:10
 */
/**
 * 求两个链表中的第一个公共的节点
 */

const { Console } = require("console");
const createLink = require("../create-link");
const link = require("./base");

let link1= new createLink();
[1,3,4,5,6,23,3].forEach(element => {
 link1.add(element)
});

let link2= new createLink();
[6,8,2,3,4,5,6,23,3].forEach(element => {
 link2.add(element)
});

/**
 * 计算两个链表中的一个公共节点
 * 
 */
const getLinkLength = require('./link-length')
 function findSameNode(link1,link2){
   if(!link1 || !link2) return null;
   //计算两个链表长度 
   let size1 = getLinkLength(link1);
   let size2 = getLinkLength(link2);
   let  n = size1- size2;
   let mH = null,sH = null;//mH存储长链表 sH存储短链表
   if(n>0){
      mH=link1;
      sH=link2
   }else{
     mH=link2;
     sH=link1
   }
   //大的先走
   n =Math.abs(n)
   while(n){
     mH = mH.next;
     n--;
   }  
   //两个链表 mH 和 sH长度都相等
   while( (mH && sH) && mH.value !=sH.value){
     mH= mH.next;
     sH = sH.next;
   }
   return mH;
 }

 let result = findSameNode(link1.head,link.head)
 console.log(result)

 let result1 = findSameNode({value:1,next:null},{value:2,next:null})
 console.log(result1)