/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 12:32:01
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 12:40:39
 */
// 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。
var kthToLast = function(head, k) {
  let current = head ,i=0;
  //遍历链表长度
  let leng = 0;
  while(current){
      leng++
    current = current.next;
  }
  current = head 
  while(current){
      if(i+k==leng){ 
          return current.val
      }
      i++;
      current =current.next
  }
  return null
};