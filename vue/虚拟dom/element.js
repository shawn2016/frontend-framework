
/**
 * 虚拟dom元素的类
 * 创建element元素
 */
class Element{
  constructor(type,props,children){
    this.type = type;//要创建的元素节点类型
    this.props = props; //节点所包含的属性
    this.children = children;//子节点信息
  }
}

/**
 * 创建元素节点 
 * @param {*} type 类型
 * @param {*} props 属性
 * @param {*} children 孩子
 */
function createElement(type,props,children){
  return new Element(type,props,children)
} 

/**
 * 判断类型设置属性 属性的key的值区分表单元素和其他的元素，其中表单元素的属性填充方法和其他的不一样
 * @param {*} node 元素的node 
 * @param {*} key 要设置的属性key
 * @param {*} value  设置的属性值
 */
//表单数据类型
const FormElement  =['INPUT','SELECT','TEXTAREA']
function setAttr(node,key,value){
  switch(key){
     case 'value':
      //如果key为value的时候，对于表单元素而言是设置value的值
      if(FormElement.indexOf(node.tagName.toUpperCase())>-1){
         node.value = value;
      }else{
         node.setAttribute(key,value)
      }
      break; 
    case 'style':
      //样式属性设置
      node.style.cssText = value;
      break;
    default:
      //其他一律在标签上进行设置
      node.setAttribute(key,value)
    break;
  }
}

/**
 * render 可以将虚拟dom转化成真实dom
 * @param {*} eleObj  元素的节点信息
 */
function render(eleObj){
  let el = document.createElement(eleObj.type);
  //设置属性 
  for(var key in eleObj.props){
    setAttr(el,key,eleObj.props[key])
  }
  //遍历孩子节点，如果是虚拟dom则继续进行创建
  eleObj.children.forEach((child)=>{
    // 如果是一个元素 继续渲染
    child = (child instanceof Element)?render(child) : document.createTextNode(child)
    el.appendChild(child)
  }) 
  return el;
}

//渲染dom
function renderDom(el,target){
  target.appendChild(el)
}
export {
  createElement,
  render,
  renderDom,
  Element,
  setAttr
}