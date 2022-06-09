/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 15:20:44
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 16:02:58
 */
/**
 * 编写一个函数，检查输入的链表是否是回文的。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 回文字符串特点
/**
 * 借助堆栈的方法

var isPalindrome = function(head) {
   
   let l = head;
   let length =0,count=0;
   let stack = [] //从后向前存储链表中的值
   //计算回文字符串长度
   while(l){ 
      stack.unshift(l.val);
      l=l.next;
   }
   l = head
   while(l){
    if(stack[count]!=l.val){
        return false
    }
    count++;
    l=l.next;
   }
   return true;
}; */
//反转后面链表
var isPalindrome = function(head) {
  let slow = head;
  let fast = head;
  while(fast && fast.next!=null){
      slow = slow.next;
      fast = fast.next.next;
  }
   //如果fast不为空，说明链表的长度是奇数个
  if (fast != null) {
      slow = slow.next;
  } 
  //slow是中间链表
  var newList = reverse(slow); 
  fast = head//标记
  while(newList){
      if(newList.val !=fast.val ){
          return false
      }
      newList = newList.next;
      fast = fast.next
  }
  return true;
}
function reverse(list){
  // 反转链表
  let prev = null;
  while(list){
      let curr = list.next;
      list.next = prev;
      prev = list;
     list = curr

  }
  return prev;
}
