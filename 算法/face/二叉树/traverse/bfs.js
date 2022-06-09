/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-31 13:41:53
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 11:24:33
 */ 
const { createTree } = require('../create-binary-tree/index')
//层次遍历 一层一层
//创建一个二叉树
let array = [10,7,6,8,9,13,5,11,14] 
let tree = new createTree();
array.forEach(item=>{
  tree.insert(item)
}) 

function bfsTree(root){ 
  let quque =[],bfsQueue=[]; //存储遍历的元素
  let curr = null;
  quque.push(root)
  while(quque.length>0){
      curr = quque.pop();//取出最后一个元素
      bfsQueue.push(curr.value)
     //查看当前左边是否存在元素 存在则压入栈前面
     if(curr.left) {
       quque.unshift(curr.left)
     }
     //查看当前元素右边是否存在元素
     if(curr.right){
       quque.unshift(curr.right)
     }
     //queue存储的元素都是当前层的左子树的子树和右子树的子树
  } 
  return bfsQueue;
}
let result =  bfsTree (tree.root);
console.log(result)

 // 再次进行 搞事情 
function bfsTreeN(root){
  let curr = null,queryArr=[];
  let query =[];
  query.push(root)
  while(query.length>0){ 
    curr = query.pop(); 
    queryArr.push(curr.value) 
    if(curr && curr.left){ 
      query.unshift(curr.left)
    }
    if(curr && curr.right){ 
      query.unshift(curr.right)
    } 
  } 
  return queryArr;
}

let re1 =bfsTreeN(tree.root)
console.log(re1)