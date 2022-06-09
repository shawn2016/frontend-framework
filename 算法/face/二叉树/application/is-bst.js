/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 09:43:31
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 09:50:31
 */
const { createTree,NodeTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

function isValidBST(root,pre){
  //进行中序遍历
  if(!root) return true;
  let verLeft = isValidBST(root.left,pre)
  if(!verLeft){
    return false
  }
  //当前节点比前一个小，则不是递增的，则错误
  if(root.value <=pre){
    return false;
  }
  pre = root.value;
  let verRight = isValidBST(root.right,pre)
  if(!verRight) return false;
  return true; 
}

let result =isValidBST(tree.root)
console.log(result)

var data = {
  left:{
    value:4
  },
  right:{
    value:1
  },
  value:2
}

let result1 =isValidBST(data)
console.log(result1)