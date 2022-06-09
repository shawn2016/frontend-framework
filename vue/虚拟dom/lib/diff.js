var _ = require('./util')
var patch = require('./patch')
var  listDiff  = require('./listDiff') 

/**
 * 对比新旧两棵树的异同点 生成patch 补丁数组
 * @param {*} oldTree
 * @param {*} newTree 
 */
function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  //深度遍历树形结构
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

/**
 * 深度遍历搜索  Depth First Search
 * @param {*} oldNode 原有节点 
 * @param {*} newNode 新的节点
 * @param {*} index   当前比较的索引值
 * @param {*} patches 补丁对象
 */
function dfsWalk (oldNode, newNode, index, patches) {
  var currentPatch = []

  // 如果当前位置对应的新节点为空 则表示老节点被移动
  if (newNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
  // 老节点和新节点都是字符串 
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    //两个字符串不相等 说明其内容进行更换
    if (newNode !== oldNode) {
      //将当前的节点压入到该patch中
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  // 如果节点的名字以及key的值都相同，则表示当前的节点为同一个节点，比较其属性和孩子节点是否变化
  } else if (
      oldNode.tagName === newNode.tagName &&
      oldNode.key === newNode.key
    ) {
    // 比较props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    //比较孩子节点如果存在ignore 属性则不进行比较
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
  // 节点不相同的时候 则表示替换
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

/**
 * 比较孩子节点
 * @param {*} oldChildren  老节点孩子
 * @param {*} newChildren  新节点孩子
 * @param {*} index        当前index
 * @param {*} patches      补丁
 * @param {*} currentPatch 当前currentPatch补丁
 */
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  //对比两个孩子的列表变化
  var diffs = listDiff(oldChildren, newChildren, 'key') 
  newChildren = diffs.children 

  //如果当前存在移动的列表
  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    //将移动的内容直接压入到当前补丁中
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  //记录节点的索引的值
  var currentNodeIndex = index;
  //进行查看对比老的节点
  _.each(oldChildren, function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1;
    //比较单个孩子节点和单个新元素节点
    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child;//将比较完的进行赋值
  })
}
/**
 * 比较props
 * @param {*} oldNode  旧的节点
 * @param {*} newNode  新的节点
 */
function diffProps (oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.props
  var newProps = newNode.props

  var key, value
  var propsPatches = {}

  // 比较key的值
  for (key in oldProps) {
    value = oldProps[key]
    //props的值改变
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key] //有时可能是undefined underfined 表示当前属性已经被删除
    }
  }
  //老props里面的属性被删除

  // 新的属性增加
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // If properties all are identical
  if (count === 0) {
    return null
  }

  return propsPatches
}

function isIgnoreChildren (node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff
