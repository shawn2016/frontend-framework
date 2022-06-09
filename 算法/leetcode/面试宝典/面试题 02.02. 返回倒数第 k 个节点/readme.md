<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 12:40:30
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 12:40:32
-->
### 解题思路
  * 首先计算链表长度
  * 再次进行从头到尾遍历链表，如果i+k ==length 则当前位置就是其倒数第k个位置

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
 * @param {number} k
 * @return {number}
 */
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
```