 
/**
 * 
 * @param {*} oldTree 老树
 * @param {*} newTree 新树
 */
function diff(oldTree,newTree){
  let patches ={};
  let index = 0;
  //递归树比较后的结果放在补丁包中
  walker(oldTree,newTree,index,patches) 
  return patches
}
const ATTRS ='ATTRS'
const TEXT = 'TEXT'
const REMOVE ='REMOVE' 
const REPLACE ='REPLACE'
let Index = 0
/**
 * 
 * @param {*} oldNode 老节点
 * @param {*} newNode 新节点
 * @param {*} index 当前的index
 * @param {*} patches 当前存储的变化patch
 */
//index 私有化的变量到页面上
function walker(oldNode,newNode,index,patches){
  //创建当前自己的补丁包 每个元素都有自己的补丁包
   let currentPatch = []; 
   //如果没有新的节点就是删除了
   if(!newNode){
      currentPatch.push({type:REMOVE,index})
   }
   //判断是是字符串
   else  if(isStr(oldNode) && isStr(newNode)){
      if(oldNode !=newNode){
        currentPatch.push({type:TEXT,text:newNode})
      }
   }  else if(oldNode.type  == newNode.type){
     //比较属性是否更改
      let attrs = diffAttr(oldNode.props,newNode.props);
      if(Object.keys(attrs).length>0){
        //检测到属性变了，重新进行赋值
        currentPatch.push({type:ATTRS,attrs})
      } 
      //如果有儿子节点 遍历儿子节点 
      diffChildren(oldNode.children,newNode.children,index,patches)
   }else{
     //说明节点被替换了
     currentPatch.push({type:REPLACE,newNode})
   }
   if(currentPatch.length >0){ //补丁包中确实存在补丁，将元素和补丁对应起来，放在大的补丁包中
     patches[index] = currentPatch;
   }
   return patches;
}
/**
 * 判断是否是字符串
 * @param {*} node 
 */
function isStr(node){
  return Object.prototype.toString.call(node) =='[object String]'
}
/**
 * 比较孩子数据
 * @param {*} oldChildren 老孩子
 * @param {*} newChildren 新孩子
 * @param {*} index index dfs的代表值
 * @param {*} patches  对比存储的差异数据
 */
function diffChildren(oldChildren,newChildren,index,patches){
  //判断是否是
   //比较老的和新的第一个
  oldChildren.forEach((child,idx)=>{
    //索引问题  注意index的索引问题  
    //每次调用的时候传递给walk的时候是递增的，可能会有变化,所有的都基于一个序号进行增长
    walker(child,newChildren[idx],++Index,patches);
  })
  
}
/**
 * 比较属性
 * @param {*} oldProps 
 * @param {*} newProps 
 */
function diffAttr(oldProps,newProps){
  let patch ={}
  //判断老的属性和新的属性关系
  for(let key in oldProps){
    if(oldProps[key]!==newProps[key]){
        patch[key] = newProps[key] //有时可能是undefined
    }
  }
  //新的属性props可能增加了一些属性
  for(let key in newProps){
    if(!oldProps.hasOwnProperty(key)){
       patch[key] = newProps[key]
    }
  }
  return patch;
}
export default diff;