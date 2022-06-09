/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-31 15:12:42
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 08:49:02
 */
/**
 * 计算树的深度
 */


const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 


//递归计算树的深度
function maxDepTree(root){
  let num = 0;
  if(!root) return 0;
  //取 左子树和右子树的最大高度 然后加上当前节点的1
  num = Math.max(maxDepTree(root.left),maxDepTree(root.right)) +1;
  return num;
} 
let result = maxDepTree(tree.root)
console.log(result)


//非递归 计算树的深度 层序遍历
var dpComTreeHeight =function(root){
  if(!root) return 0
  let currentNum = 1,//当前层的节点
      nextNum = 0,//下一层的节点数目
      depth = 0;//树的深度
  let queue = [],curr=null;
  queue.push(root); 
  while(queue.length >0){
    curr = queue.pop();
    currentNum --;
    //收集左节点
    if(curr.left){
      queue.unshift(curr.left)
      nextNum++;
    }   
    //收集右节点
    if(curr.right){
      queue.unshift(curr.right)
      nextNum ++ ;
    }
    //如果是当前该层的最后一个节点 
    if(currentNum == 0){
      depth++; 
      currentNum = nextNum;
      nextNum = 0;
    }
  }
  return depth;
}

let depth =dpComTreeHeight(tree.root);
console.log(depth)

exports.dpComTreeHeight =dpComTreeHeight;
exports.maxDepTree =maxDepTree