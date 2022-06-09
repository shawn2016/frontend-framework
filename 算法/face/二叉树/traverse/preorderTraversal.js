/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-30 18:54:36
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-31 09:14:13
 */
//node 环境下测试
const { createTree } = require('../create-binary-tree/index')
console.log(createTree)


//创建一个二叉树
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
})  
// console.log("----",tree,"----")
/**
 * 前序遍历 递归做法 深层遍历
 * @param {*} tree 
 */
let preOrderArray = [];

function preorderTraversal(root){  
   //先遍历根节点 
   preOrderArray.push(root.value); 
   //遍历左子树
   root.left && preorderTraversal(root.left) 
   //遍历右子树
   root.right && preorderTraversal(root.right) 
}
 
preorderTraversal(tree.root);
console.log(preOrderArray)

/**
 * 前序遍历 非递归做法
 * @param {*} root 
 */
function preorderTraversalNot(root){
  let  preOrderArrDir=[],stack =[]; 
  let curr = root;
  //先遍历根 左子树 左子树的子节点
  while(curr!=null || stack.length>0){  
    //当前节点存在 则压入栈中
    while(curr!=null){
      //压入当前元素
      stack.push(curr);
      //存储当前的元素
      preOrderArrDir.push(curr.value)
      //将curr指向当前的左节点
      curr = curr.left;
    }
    //判断是否为空，如果不为空 弹出已经遍历的元素，进行遍历右子树
    if(stack.length !=0){
      curr = stack.pop();
      curr = curr.right;
    }
  }
  return preOrderArrDir
}
let notDg = preorderTraversalNot(tree.root)
console.log(notDg)
