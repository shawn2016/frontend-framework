/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-31 15:58:16
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-31 16:21:18
 */
/**
 * 求二叉树第k层节点的个数
 */
const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

/**
 * 层序遍历
 * @param {*} root  当前的树
 * @param {*} key   当前底基层
 */
function findKeyNumber(root,k){
  if(!root || k==0) return 0 
  let currentNum = 1,
      nextCurr =0,h=1;
  let queue = [],
      curr = null;
  queue.push(root);
  while(queue.length > 0){
    if(k == h) return currentNum;
    curr = queue.pop();
    currentNum -- 
    if(curr.left){
      queue.unshift(curr.left)
      nextCurr ++ ;
    }
    if(curr.right){
      queue.unshift(curr.right)
      nextCurr ++ 
    }
    //判断是否遍历完
    if(currentNum == 0){
       h++; //计数遍历的第几层
       currentNum = nextCurr;
       nextCurr = 0; //开始下一步步骤
    }
  }
  return 0
}
let re = findKeyNumber(tree.root,4)

console.log(re)
let re1 = findKeyNumber(null,4)
console.log(re1)
