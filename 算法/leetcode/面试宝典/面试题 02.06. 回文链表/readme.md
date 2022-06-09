<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 16:02:44
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 16:02:46
-->
### 解题思路
 

### 代码 
####  借助堆栈的方法
   * 根据回文字符串 正序和倒序一样的标志 
   * 遍历链表，将回文字符串存入堆栈中，进行前置压入方式
   * 再次遍历链表，挨个比较堆栈中数据和链表的值是否相等，
   * 不相等则返回false即可

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
 * @return {boolean}
 */
// 回文字符串特点

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


```
## 反转链表
 * 将链表分成两部分，奇数的时候前面链表比后面链表多个数值
 * 找到中间位置，进行二倍next
 * 将后面的链表进行反转
 * 和前面的链表进行比较
``` javascript
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
```
