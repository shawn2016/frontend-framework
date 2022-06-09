/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 10:21:01
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-02 09:22:00
 */
/**
 * 创建链表
 */

 class LinkNode {
    constructor(value){
      this.value = value;
      this.next = null;
    }
 }
 exports.LinkNode = LinkNode;

 function createLink(){
    this.head = null;
 }

 createLink.prototype.add=function(value){
   let linknode = new LinkNode(value)
   if(!this.head){
     this.head = linknode;
   }else{
     //进行遍历当前链表 添加到最后面
     this.insertNode(linknode)
   }
 }
 createLink.prototype.insertNode=function(node){
   let curr = this.head;
   while(curr){ 
     if(!curr.next){
       curr.next = node;
       return ;
     }
     curr = curr.next;
   } 
 }
 /** 添加环 n表示最后一个元素指向链表中的第几个 */
 createLink.prototype.addRing=function(key){
   let curr = this.head;
   let keyNode = null,n=1;
   while(curr.next){
     if(n==key){
      keyNode = curr;
     }
     n++
     curr = curr.next;
   }
   curr.next = keyNode;  
}
 createLink.prototype.print=function(){
  let curr = this.head;
  let stack=[]
  while(curr){ 
    stack.push(curr.value)
    curr = curr.next;
  } 
  console.log(stack.join("->"))
  return stack.join("->");
}


 module.exports = createLink;


//  let linkArr = [1,2,3,4,5,6];
//  let link = new createLink();
//  linkArr.forEach(item=>{
//   link.add(item)
//  })
//  console.log(JSON.stringify(link))