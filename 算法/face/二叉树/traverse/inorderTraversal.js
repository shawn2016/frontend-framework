/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-30 20:08:58
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-31 09:54:21
 */

const { node } = require('webpack');
const { createTree } = require('../create-binary-tree/index')


//创建一个二叉树
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

/**
 * 递归进行遍历
 */
let inOrderArray = []
function inorderTraversal(nodeTree){
  if(!nodeTree) return;
  //先遍历左节点
  nodeTree.left && inorderTraversal(nodeTree.left)
  //存储当前根节点
  inOrderArray.push(nodeTree.value)
  //在遍历右节点
  nodeTree.right && inorderTraversal(nodeTree.right)
}
inorderTraversal(tree.root)
console.log(inOrderArray)


/**
 * 
 */

function inorderTraversalNot(root){
  let inOrderQueue = [];//存储遍历结果
  let curr = root,stack =[];
  while(curr!=null || stack.length>0){ 
    //先遍历左子树 到叶子节点
    while(curr!=null){
       //逐个压入左节点
       stack.push(curr); 
       curr = curr.left;  
    }  
    //进行出栈
    if(stack.length>0){
      //取出栈的最后一个元素 逐个是左子树排列的元素
      curr = stack.pop(); 
      //压入当前的元素，当前元素排列为左子树
      inOrderQueue.push(curr.value)
      //遍历当前节点的右子树
      curr = curr.right; 
    }
  }
  return inOrderQueue
}

let result  =inorderTraversalNot (tree.root)
console.log(result)

