<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-31 21:40:23
 * @LastEditors: Mfy
 * @LastEditTime: 2020-10-31 21:40:25
-->
### 解题思路
 # 移除链表中的重复节点 （借助内存）
   * 遍历链表，并存储节点val,
   * 判断当前的链表节点在存储中是否存在，
   * 如果存在 则进行移除节点  用prev.next = current.next 进行删除节点
   * 不存在 则继续遍历，并存储当前节点
 # 移除链表中的重复节点(不借助内存）
   * 需要定义两个指针，一个分别遍历链表，一个用于比较链表后面节点和当前节点差异
   * 使用两个while循环比较，内层的while比较结束后，将链表重置

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
//包含辅助内存 
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
//不使用辅助内存
/**
 * 不使用辅助内存则需要考虑的就是，两个指针进行对比比较
 */
var removeDuplicateNodes = function(head) { 
   
   let current1=head; //基准
   let current2=null,prev2=null; //游走
   while(current1){ 
        //指向下一个节点
       current2 = current1.next;
      //重置成当前节点
       prev2 = current1; 
       while(current2){
           //进行判断 
           if(current1.val ==current2.val){
             prev2.next = current2.next;  
           } else{
             prev2 = current2; 
           }
            current2 = current2.next;   
       } 
       current1 = current1.next;    
   }
   return head
};
```