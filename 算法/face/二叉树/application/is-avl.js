/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 08:36:02
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 08:50:27
 */
/**
 * 判断是否是平衡二叉树
 */

const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 
 
let tree1 = new createTree();
[1,2,3,4,5,6].forEach(item=>{
  tree1.insert(item)
}) 
console.log(JSON.stringify(tree1) )
const {dpComTreeHeight,maxDepTree} = require("./tree-height"); 

//递归
function isAsl (root){
 if(!root) return true;
 //计算左子树和右子树高度
 let leftH = maxDepTree(root.left)
 let rightH = maxDepTree(root.right) 
 //左右子树的因子大于1即树的高度过高
 if(Math.abs(leftH-rightH)>1) return false;
 //在进行比较左右子树
 return isAsl(root.left) && isAsl(root.right)
}
let isAslr=isAsl(tree.root)
console.log(isAslr)
let isAslr1=isAsl(tree1.root)
console.log(isAslr1)