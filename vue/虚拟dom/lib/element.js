 
 

var _ = require('./util')

/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
function Element (tagName, props, children) {

  //判断是否是元素元素类型
  if (!(this instanceof Element)) {
    if (!_.isArray(children) && children != null) {
      children = _.slice(arguments, 2).filter(_.truthy)
    }
    //如果不是元素节点类型 则直创一个文本节点即可
    return new Element(tagName, props, children)
  }
 // 判断属性 属性为数组的可能
  if (_.isArray(props)) {
    children = props
    props = {}
  }
   
  this.tagName = tagName
  this.props = props || {} 
  this.children = children || []
  //为元素增加key
  this.key = props
    ? props.key
    : void 666

  var count = 0 //记录每个孩子节点的count 
  //遍历每一个孩子节点
  _.each(this.children, function (child, i) {
    if (child instanceof Element) {
      count += child.count
    } else {
      children[i] = '' + child
    }
    count++
  })

  this.count = count
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props
  //为每个元素设置属性
  for (var propName in props) {
    var propValue = props[propName]
    _.setAttr(el, propName, propValue)
  }
 //添加孩子 ，并进行渲染
  _.each(this.children, function (child) {
    //判断孩子是否是元素节点，如果是元素节点，则进行render 如果不是元素节点，则直接创建文本节点
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl)
  })

  return el
}

module.exports = Element
