<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-01 16:48:50
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-01 16:48:52
-->
### 解题思路
  链表相交，相交节点后面的数据全部相等，则这个是时候只需要进行判断，链表长度，让长链表进行自动走到和短链表一样的长度，比较两个链表是否相等；
 

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
    //让长链表进行先走几步，和短链表重合
    while(count){
        l = l.next;
        count --;
    }  
    //当一直走的时候，说明是正确的，如果没有，则短的剩下
    while(s !=l){
        s =s.next;
        l= l.next;
    } 
    return s
};
```