var _ = require('./util')

var REPLACE = 0 //替换文本
var REORDER = 1 //移动或者替换
var PROPS = 2 //属性更改
var TEXT = 3 //文本更改

/**
 * 替换
 * @param {*} node 视图上的节点信息
 * @param {*} patches 补丁对象的值 
 */
function patch (node, patches) {
  //定义初始值walker
  var walker = {index: 0};
  dfsWalk(node, walker, patches)
}

/**
 * 深度遍历节点进行替换
 * @param {*} node  节点
 * @param {*} walker  遍历到的节点
 * @param {*} patches  布丁信息
 */
function dfsWalk (node, walker, patches) {
  //当前walker的补丁值
  var currentPatches = patches[walker.index]

  //获取当前节点孩子的长度
  var len = node.childNodes
    ? node.childNodes.length
    : 0
  //遍历孩子节点  进行深层次的patch
  for (var i = 0; i < len; i++) {
    //当前孩子的值
    var child = node.childNodes[i]
    //增加walker 中的数据
    walker.index++
    //在遍历孩子节点
    dfsWalk(child, walker, patches)
  }

 //如果当前的节点存在补丁 则进行打补丁操作
  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}
/**
 * 修改dom节点的参数，进行打补丁
 * @param {*} node 
 * @param {*} currentPatches 
 */
function applyPatches (node, currentPatches) {
  //遍历当前的 currentPatches
  _.each(currentPatches, function (currentPatch) {
    //获取patch的类型 
    switch (currentPatch.type) {
      case REPLACE:
        //节点的替换  如果是节点类型则进行新的创建，如果不是重新render下node
        var newNode = (typeof currentPatch.node === 'string')
          ? document.createTextNode(currentPatch.node)
          : currentPatch.node.render()
        //替换新的none
        node.parentNode.replaceChild(newNode, node)
        break
      case REORDER:
        //替换元素
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS:
        //赋值新的属性节点信息
        setProps(node, currentPatch.props)
        break
      case TEXT:
        //文本节点则是获取文本节点将内容进行赋值
        if (node.textContent) {
          node.textContent = currentPatch.content
        } else {
          //  在ie的浏览器中
          node.nodeValue = currentPatch.content
        }
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}
/**
 * 更新属性
 * @param {*} node 节点
 * @param {*} props 属性数组
 */
function setProps (node, props) {
  //遍历props数组
  for (var key in props) {
    //当前属性的key的值已经不存在，表示已经移除
    if (props[key] === void 666) {
      //移除该属性
      node.removeAttribute(key)
    } else {
      //获取value
      var value = props[key]
      _.setAttr(node, key, value)
    }
  }
}
/**
 * 替换元素
 * @param {*} node  当前节点node
 * @param {*} moves  moves的类标
 */

function reorderChildren (node, moves) {
  //获取node下的子孩子 存储元dom
  var staticNodeList = _.toArray(node.childNodes)
  var maps = {}
  
  //获取当前列表孩子
  _.each(staticNodeList, function (node) {
    //如果是元素节点
    if (node.nodeType === 1) {
      //获取元素节点的key
      var key = node.getAttribute('key')
      if (key) {
        //key存在的话压入都map中
        maps[key] = node
      }
    }
  })

  //遍历moves的额函数
  _.each(moves, function (move) {
    var index = move.index
    //type为0的时候表示移除当前节点
    if (move.type === 0) { // remove item
      // 元素可能被移除，因此需要进行判断
      if (staticNodeList[index] === node.childNodes[index]) { 
        node.removeChild(node.childNodes[index])
      }
      //删除当前移除完成的点
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) {  
      //在当前的节点前插入节点
      //获取插入节点的key 存在的话就进行克隆即可，不存在进行判断是文本还是 dom节点，文本节点直接调用render dom节点
      var insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true) // reuse old item
        : (typeof move.item === 'object')
            ? move.item.render() //重新调用render
            : document.createTextNode(move.item)
      //移除插入的元素
      staticNodeList.splice(index, 0, insertNode)
      //在index的节点中节点中插入元素
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

patch.REPLACE = REPLACE
patch.REORDER = REORDER
patch.PROPS = PROPS
patch.TEXT = TEXT

module.exports = patch
