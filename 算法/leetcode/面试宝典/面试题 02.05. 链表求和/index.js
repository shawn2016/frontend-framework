/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  var sum = 0;//表示相加等于>10的时候进位
  let node = new ListNode(0);
  let current = node
  while(l1 || l2){
      let i = l1 ===null ? 0:l1.val;
      let j = l2== null ?0:l2.val;
       sum = i+j+sum;
       if(sum>=10){
         current.next =new ListNode(Math.floor(sum%10)) 
          sum=1 
       }else{
          current.next =new ListNode(sum) ;
          sum =0
       }
        current = current.next
        if(l1){
            l1=l1.next
        }
        if(l2){
            l2=l2.next
        } 
  } 
  if(sum ==1){
       current.next =new ListNode(1) ;
  }
  return node.next;
}
/*var addTwoNumbers = function(l1, l2) {
//遍历两个链表得到正确的值
var data1=[],data2=[]
while(l1){
    data1.unshift(l1.val);
    l1=l1.next
}

 while(l2){
    data2.unshift(l2.val);
    l2=l2.next
}
 
data1=parseInt( data1.join(""));
data2 =parseInt( data2.join(""));  

return reault;
};*/