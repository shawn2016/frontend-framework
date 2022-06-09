/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-31 14:30:29
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-31 15:15:09
 */

/**
 * 查找节点的个数
*/

const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 




//递归 先序遍历进行计算
let node = 1;
function comNodeSum(root){
    node ++ ;
    root.left && comNodeSum(root.left)
    root.right && comNodeSum(root.right)
}
comNodeSum(tree.root)
console.log(node)


//非递归 层次遍历
function codeNodeNotSum(root){
  let node = 1;
  let queue =[],curr = root;
  queue.unshift(root) //存储根节点
  while(queue.length>0){
    curr = queue.pop(); //取出队列中的最后一个
    node++ ;//计数当前的节点数量
    if(curr.left){
      queue.unshift(curr.left); //将左节点存入到前面
    }
    if(curr.right){
      queue.unshift(curr.right); //右节点入队
    }
  }
  return node;
}
let result =codeNodeNotSum (tree.root);
console.log(result)


