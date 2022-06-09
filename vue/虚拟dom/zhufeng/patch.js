import {Element,render,setAttr}  from './element'

let allPathes ;
 let index= 0;//默认哪个需要打补丁
 /**
  * 进
  * @param {*} node  进行patch的父元素 为dom节点
  * @param {*} patches  diff后生成的patches
  */
function patch(node,patches){
  //给某个元素打补丁
  allPathes = patches; 
  console.log(node)
  walk(node);
  return 
}

/**
 * 递归遍历节点
 * @param {*} node  当前遍历的节点
 */
function walk(node){
  let currentPatch = allPathes[index++];
  let childNode = node.childNodes;
  childNode.forEach(child=>walk(child))
  if(currentPatch){
    doPatch(node,currentPatch)
  }
}
/**
 * 进行元素替换以及元素更改操作
 * @param {*} node  当前的进行替换节点
 * @param {*} patches  当前patch更改的内容
 */
function doPatch(node,patches){
  patches.forEach((patch)=>{
    switch(patch.type){
      case 'ATTRS':
        for(var key in patch.attrs){
          let value = patch.attrs[key]; 
          if(value){
            setAttr(node,key,value)
          }else{
            node.removeAttribute(key)
          }  
        }
        break;
      case 'TEXT':
        node.textContent = patch.text;
        break;
      case "REPLACE":
        //获取到当前的新的元素，如果当前是元素则进行创建，如果不是则进行创建节点
        let newNode = (patch.newNode instanceof Element) ?
        render(patch.newNode):document.createTextNode(patch.newNode); 
        node.parentNode.replaceChild(newNode,node)
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break;
      default :
      break;
    }
  })

}
export default patch;