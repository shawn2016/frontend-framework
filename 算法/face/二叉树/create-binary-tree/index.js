
/**
 * 创建二叉树 本实例主要进行编写
 */
class NodeTree{ 
  constructor(val){
    this.left = null //左子树
    this.right = null //右子树
    this.value= val; //存储的值
    return this;
  }
} 

/**
 * 构建二叉树 
 */
function createTree(){
  this.root = null;
}
createTree.prototype.insertNode=function(node,newNode){
  //判断新节点和根节点的大小
  if(node.value > newNode.value){
    if(node.left ==null){
      node.left = newNode
    }else{
      //遍历左节点 进行查找
      this.insertNode(node.left,newNode)
    }
  }else{
    if(node.right == null){
      node.right = newNode
    }else{
      this.insertNode(node.right,newNode)
    }
  }
} 
createTree.prototype.insert=function(val){
    let node = new NodeTree(val); 
    //如果没有根节点 则直接插入到根节点中 
    if(!this.root){
      this.root = node;
    }else{  
      //否则插入到左右元素中
      this.insertNode(this.root,node)
    }
}
exports.createTree = createTree;
exports.NodeTree = NodeTree;