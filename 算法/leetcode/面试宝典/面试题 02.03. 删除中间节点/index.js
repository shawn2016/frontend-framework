/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 12:44:31
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 12:50:09
 */
//实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。 
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next
   
};