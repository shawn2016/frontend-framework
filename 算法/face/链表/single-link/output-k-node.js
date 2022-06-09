/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 10:58:54
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 15:07:21
 */
/**
 * 输出链表的倒数第几个节点
 */

 
const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
});

const getLinkLength = require('./link-length')
/**
 * 获取倒数第k个元素
 * @param {*} link 
 * @param {*} k 
 */
function getKlineNode(link,k){
  //获取当前link长度
  let linkSize = getLinkLength(link);
  if(linkSize <k) return null;
  let curr = link,nu =1;
  while(curr){
    if(k+nu == linkSize){
      return curr.value;
    }
    nu++;
    curr = curr.next;
  }
  return null;
}
let node = getKlineNode(link.head,5)
console.log(node)

let num = 0
function dgGetKlineNode(link,k){
  num = k;
  if(!link) return null;
  let curr = dgGetKlineNode(link.next,k)
  //当前存在值 返回继续遍历
  if(curr){
     return curr;
  }else{
    //不存在值 说明当前一次遍历结束
    num --;//递归一次 减去0
    if(num ==0){//num为0 说明到了节点
       return link.value
    }
  }
  return null
}

let node2 = dgGetKlineNode(link.head,30)
console.log(node2)


//双指针法


function dobuleGetKeyLink(link,key){
  if(!link) return null
  let curr = link,curr2 =link;
  //curr2先走k步
  for(var i =0;i<key;i++){
    curr2 = curr2.next;
  }
  //curr2到头,此时curr的位置正好是倒数第k的位置
  while(curr2){
    curr2 = curr2.next;
    curr = curr.next;
  }
  return curr.value 
}

let node3 = dobuleGetKeyLink(link.head,5)
console.log(node3)