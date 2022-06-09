 

var _ = exports

_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}
/**
 * 判断是否是数组
 * @param {*} list 
 */
_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
}
/**
 * 分割数组 可以直接引用
 * @param {*} arrayLike 
 * @param {*} index 
 */

_.slice = function slice (arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index)
}

/**
 * 
 * @param {*} value 
 */
_.isUndefined = function(value){
  return value===undefined
}
/** 
 * 
 */
_.truthy = function truthy (value) {
  return !!value
}

/**
 * 判断是否是字符串
 * @param {} list 
 */
_.isString = function isString (list) {
  return _.type(list) === 'String'
}

/**
 *深度 遍历数组
 * @param {*} array 
 * @param {*} fn 
 */
_.each = function each (array, fn) { 
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

/**
 * 转换成数组
 * @param {*} listLike 
 */
_.toArray = function toArray (listLike) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}
/**
 * 设置属性
 * @param {*} node   属性节点
 * @param {*} key    属性的key的值
 * @param {*} value  属性value
 */
_.setAttr = function setAttr (node, key, value) {

  switch (key) {
    //当前属性为style 表示样式更改 需要
    case 'style':
      node.style.cssText = value
      break
 
    case 'value':
      //如果当前属性为value 需要区分表单元素和非表单元素
      var tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}
