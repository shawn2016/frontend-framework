/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-31 20:49:08
 * @LastEditors: Mfy
 * @LastEditTime: 2020-10-31 21:09:05
 */
//编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
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
 * @return {ListNode}
 */
var removeDuplicateNodes = function(head) {
  var node = [];
  let current = head;
  let prev = head;
  while(current){ 
      //如果当前的current的value在节点中存在 移除当前的current
      if(node.indexOf(current.val)!=-1){ 
          prev.next = current.next;  
      }else{ 
          node.push(current.val)
          prev = current; 
      }
      current = current.next; 
  }
  return head
};