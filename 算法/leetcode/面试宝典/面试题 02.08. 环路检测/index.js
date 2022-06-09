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