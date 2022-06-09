/*
 * @Descripttion: 比较两棵二叉树是否相等
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-31 19:16:28
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-11 19:27:37
 */
const { createTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 
let tree2 = tree;

//递归
function isSametree(tree1,tree2){
  if(!tree1 && !tree2){
    return true;
  }
  if(!tree1 || !tree2){
    return false
  }
  //两个值不相同
  if(tree1.value != tree2.value){
    return false;
  }
  //比较左子树和右子树
  return  isSametree(tree1.left,tree2) && isSametree(tree2.right,tree2)
}

let result1 = isSametree(tree2,tree)
console.log(result1)
console.log(isSametree(tree2,null))

//非递归 进行先序遍历比较

function isSametreeNot(tree1,tree2){
  if(!tree1 && !tree2){
    return true;
  }else if(!tree1 || !tree2){
    return false
  } 
  let stack1 = [],stack2 =[];
  let curr1 = tree1,curr2= tree2;
  stack2.push(tree2);
  stack1.push(tree1)
  while(stack1.length >0 && stack2.length >0 ){
    curr1 = stack1.pop() //取出对应节点1
    curr2 = stack2.pop()
    //比较是否相同
    if(curr1==null && curr2==null){
      continue
    }else if(curr2!=null && curr1!=null && curr1.value ==curr2.value){
      //当前节点相同，比较下一个
      stack2.push(curr2.left)
      stack2.push(curr2.right)
      stack1.push(curr1.left)
      stack1.push(curr1.right)      
    }else{
      return false;
    }
  } 
  return true;
}

let result3 = isSametreeNot(tree2,tree)
console.log(result3)
console.log(isSametreeNot(tree2,null))

module.exports =isSametree

