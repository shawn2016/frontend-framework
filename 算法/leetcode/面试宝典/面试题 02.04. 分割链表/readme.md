<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 14:47:29
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 14:47:31
-->
### 解题思路
  分割链表，
  * 小于当前x的放在left链表中
  * 大于当前x放在right链表中
  * 将left链表和right链表合并起来，并返回

### 代码

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    if (head == null || head.next == null) {
    return head;
}
   let current = head,next;
   let leftFirst =new ListNode(-1)
   let left = leftFirst;

   let rightFirst=new ListNode(-1);
   let right=rightFirst;
   while(current){
       next = current.next;
     
       if(current.val <x){ 
          left.next = current;
          left = left.next; 
       }else{ 
           right.next = current;
           right= right.next 
       }
      
       current.next = null
       current = next;
   }  
  
   left.next = rightFirst.next;
   return leftFirst.next;
};
```