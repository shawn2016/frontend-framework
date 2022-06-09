/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 10:07:09
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 10:20:01
 */
const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 


function hasSubTree(root1,root2){
  if(!root1 || !root2) return false;
  return isSubTree(root1,root2) || isSubTree(root1.left,root2)  || isSubTree(root1.right,root2) 
}
function isSubTree(root1,root2){
  if(!root2) return true;
  if(!root1) return false;
  return root1.value !=root2.value  ? false:
  isSubTree(root1.left,root2.left) && isSubTree(root1.right,root2.right)  
}
console.log(JSON.stringify(tree.root))
let result = hasSubTree(tree.root,null)
console.log(result)

let result2 =hasSubTree(tree.root,{"left":{"left":{"left":null,"right":null,"value":5},"right":null,"value":6},"right":{"left":null,"right":{"left":null,"right":null,"value":9},"value":8},"value":7})
console.log(result2)