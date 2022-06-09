/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 09:03:13
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 09:41:32
 */
/**
 * 创建二叉树的镜像
 */
const { createTree,NodeTree } = require('../create-binary-tree/index')
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

//创造镜像
function createMirrorTree(root){
  if(!root) return;
  let newNode = new NodeTree(root.value);
  //新节点左子树等于右子树
  newNode.left = createMirrorTree(root.right) || null
  //新节点右子树等于左子树
  newNode.right = createMirrorTree(root.left) || null
  return newNode
}
let newTree = createMirrorTree(tree.root)
console.log(JSON.stringify(newTree))




//比较两棵树 
function isMirrorTree(root1,root2){ 
  if(root1==null && root2==null ) return true;
  if(!root2 || !root1 ) return false;
  if(root1.value != root2.value) return false;
  return isMirrorTree(root1.left,root2.right) && isMirrorTree(root1.right,root2.left)
 } 
 let result =isMirrorTree(newTree,tree.root)

console.log("-----镜像树---",result)


//比较两棵树 --- 非递归

function isMirrorTreeNot(root1,root2){
  if(!root1 && !root2){
    return true;
  }else if(!root1 || !root2){
    return false
  } 
  let stack1=[],stack2 =[];
  let curr1 = null,curr2= null;
  stack1.push(root1);
  stack2.push(root2)
  while(stack2.length > 0 && stack1.length >0){
    curr1 = stack1.pop();//取出当前节点的数据
    curr2 = stack2.pop();   
    if(!curr1 && !curr2){
      continue ;
    }else if(curr2 &&  curr1 && curr1.value == curr2.value){
      stack1.push(curr1.left) //现存root1左
      stack1.push(curr1.right) //存root1 右
      stack2.push(curr2.right) //先存root2 左
      stack2.push(curr2.left) //存root2 左
    }else{
      return false;
    }
    //存栈的数据
  }
  return true;
}

let result1 =isMirrorTreeNot(newTree,null)

console.log("-----镜像树---",result1)
