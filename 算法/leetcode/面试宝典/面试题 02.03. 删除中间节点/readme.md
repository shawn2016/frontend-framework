<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 12:53:05
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 12:53:07
-->
### 解题思路
   理解题意：
    输入的是一个node节点，不在中间也不在最后，那只能删除自己？？
    删除自己的操作就是，将自己的val指向下一个节点的val,将自己的next指向自己下一个节点的next;
    相当于把链表表后面的前移～ 

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
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next
     
};
```