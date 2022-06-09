/*
 * @Descripttion: 后续遍历
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-30 20:09:25
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-31 13:13:11
 */ 
const { createTree } = require('../create-binary-tree/index')

let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

/**
 * 递归遍历
 */
let postOrderTrversal=[]
function postorderTraversal(root){
  if(!root) return 
  //先左
  if( root.left )
  root.left && postorderTraversal(root.left)
  //后右 
  root.right && postorderTraversal(root.right)
  //在根
  postOrderTrversal.push(root.value)
}
postorderTraversal(tree.root)
console.log(postOrderTrversal)

/**
 * 后序非递归遍历
 * 左 -> 右 ->根
 * 
 */

function postorderTraversalNot(root){
  let postOrderArray =[];
  let curr = root,stack1 = [],stack2=[];
  if(curr){
    stack1.push(curr)
  }
  // stack1 存储当前子树的目录结构
  while(stack1.length > 0){
    let curr = stack1.pop();//弹出当前元素
    //压入stack2中 stack2每次都存入的是根节点 然后是左子树的根节点 一直到叶子节点
    stack2.push(curr)
    //存储当前的左子树
    if(curr.left){ 
      stack1.push(curr.left)
    }
    //存储当前的右子树
    if(curr.right){
      stack1.push(curr.right)
    }
  }
  console.log(stack2)
  //遍历stack2的变量 此时stack 存储的数据结构正好是 节点的 根左右节点z
  while(stack2.length>0){
    let curr = stack2.pop();
    postOrderArray.push(curr || curr.value)
  }
  return postOrderArray;
}
let result = postorderTraversalNot(tree.root);
console.log(result)