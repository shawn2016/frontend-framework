### 解题思路
   * 首先判断当前链表是否存在环 
     * 判断方法其实就是指定一个快指针和一个慢指针，然后进行遍历链表，
     * 如果存在环，则快指针肯定会和慢指针进行会和；
  * 如果存在环，则此时快指针的位置和慢指针的位置肯定会相逢
     * 快指针和慢指针的所在位置有什么规律呢 ？ 
      设置环形链表的起点（a）到环链的起点（b）的距离是m
      设置两个指针的相遇点（C）距离环链的起点b（这里包含了两个距离）
        * 本次环已经走过的距离n,还未走过的是t 
    此时快指针走的距离 m+n+x(t+n)
    慢指针的走的距离就是 m+n+y(t+n)
    快指针的速度是慢指针的2倍因此存在关系
     m+n+x(t+n) = 2(m+n+y(t+n)); 得到关系 m+n = (m-2n)(t+n)
  其实这样一个指针从链表开头走，一个从环形链表上走，因为是倍数关系，所以有一个相遇

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
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let headA = head;
    let headB = head;
    let isCircle = false;
    //检测是否存在环形，如果存在，快指针在某一处一定可以和慢指针重逢
    while((headB && headB.next) ){
       
        headA = headA.next;
        headB = headB.next.next 
         if(headA ==headB){
            isCircle = true;
            break;
        }
    }
    headA = head;
    console.log(isCircle)
    if(isCircle ){
         while (headB != headA) {
                    headA = headA.next;
                    headB = headB.next;
                }
                return headB;

    }else{
        return null
    }
};
```