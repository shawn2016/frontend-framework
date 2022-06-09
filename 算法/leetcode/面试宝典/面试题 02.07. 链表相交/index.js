/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 16:16:09
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 16:43:55
 */
//给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是基于节点的值。换句话说，如果一个链表的第k个节点与另一个链表的第j个节点是同一节点（引用完全相同），则这两个链表相交。
 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  // if(!headA || !headB) return null;
  let s = headA,l=headB,al=0,bl=0;
  //计算两个链表长度
  while(s){
      s= s.next;
      al++
  }
   while(l){
      l= l.next;
      bl++
  }
  let count =0
  if(al>bl){
      s = headB;
      l = headA;
      count = al-bl
  }else{
      s = headA;
      l=headB
       count = bl-al
  }
  while(count){
      l = l.next;
      count --;
  } 
  var isEqual = null,recode=null; 
  while(s !=l){
      s =s.next;
      l= l.next;
  } 
  return s

  
};