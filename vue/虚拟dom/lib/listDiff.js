/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff (oldList, newList, key) {
  //获取新老节点的节点对应

  //获取列表中存在key和不存在key的元素 free中表示存在key的元素 非free中表示不存在key的元素

  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key) 
  console.log('key',key)
  console.log('--begin--oldList',oldList)
  console.log('--begin--newList',newList)
  console.log('--begin--oldMap',oldMap)
  console.log('--begin--newMap',newMap)
  
  //获取新列表中没有key值的元素
  var newFree = newMap.free

  //获取新老列表存在key的元素 {列表位置:key的值}
  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex 

  console.log('--begin--oldKeyIndex',oldKeyIndex)
  console.log('--begin--newKeyIndex',newKeyIndex)

  var moves = [] //存储当前操作

  //进行最优规划的操作
  var children = []  
  var i = 0
  var item
  var itemKey
  var freeIndex = 0
  //

  // 校验老的列表项目 检查是去掉还是删除了
  while (i < oldList.length) {
    //获取老列表中单个元素
    item = oldList[i] 
    //获取当前列表中的key
    itemKey = getItemKey(item, key)
    /**
     * 判断key的值是否存在
     * 存在进行进一步判断
     * 不存在则填入newFree的元素
     */
    if (!isUndefined(itemKey)) {
      //判断在新的节点中是否存在该key 如果不存在 则表示已经删除或者移动
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)//新的节点中不存在对应旧列表的子节点
      } else {
        //存在该key的值，表示有数据 把key为itemKey的值放入在children数组中
        var newItemIndex = newKeyIndex[itemKey]
        //元素可能删除或者更改
        children.push(newList[newItemIndex]) 
      }
    } else {
      //key 不存在 则将newFree 中的元素填入到列表中
      var freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  } 
  // childern中的孩子表示旧列表中的存在key的数据在新列表中也存在
  console.log('--middle--',children)


  //获取模拟列表
  var simulateList = children.slice(0) 

  // simulateList 中为null的元素，表示在oldTree中已经删除 去除空的
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i) //将moves中的对象进行存储
      removeSimulate(i) //删除列表中的数据 将
    } else {
      i++
    }
  }

  // i is cursor pointing to a item in new list
  // i 是指向新列表的游标
  // j is cursor pointing to a item in simulateList
  // j 是指向simulateList的游标
  console.log('--while--begin--newList',JSON.parse(JSON.stringify(newList)) );
  console.log('--while--begin--simulateItem',JSON.parse(JSON.stringify(simulateList)) )
  var j = i = 0
  //遍历新的列表
  while (i < newList.length) {
    item = newList[i]

    //获取当前新列表的key的值
    itemKey = getItemKey(item, key) 
    //取出模拟列表中的第一个
    var simulateItem = simulateList[j];
    //取出模拟列表中的key 为了判断和当前列表的key值判断
    var simulateItemKey = getItemKey(simulateItem, key)  
    /**
     * 判断item是否存在 存在进行判断
     * 不存在表示当前新列表中的值是新创建的，直接插入到元素中
     */
    if (simulateItem) {
      /**
       * 判断当前列表和正在取出模拟列表元素的数据是否相同
       * 如果相同就不需要进行操作，
       * 不相同则进行比较
       */
      if (itemKey === simulateItemKey) {
        j++;//如果当前的key和队列中的key相同 则继续便遍历下一个
      } else {
        //判断在旧列表中是否存在当前的key的值 如果不存在 表示新列表中该key的元素是新增加的
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          //直接插入insert
          insert(i, item)
        } else { 
          //如果当前的旧列表中存在当前key   获取下一个模拟队列中的key
          //获取simulateList中的下一个的key的值
          var nextItemKey = getItemKey(simulateList[j + 1], key)
          console.log("nextItemKey--",nextItemKey)
          //如果下一个的key的值和当前要对比的key的值相同，则移动当前的itemKey
          if (nextItemKey === itemKey) {
            remove(i)
            removeSimulate(j)
            j++ ;//移动到
          } else {
            // 和下一个key也不匹配 则进行插入元素操作
            insert(i, item)
          }
        }
      }
    } else {
      insert(i, item)
    }
    i++
  } 
  console.log('while---newList',JSON.parse(JSON.stringify(newList)) );
  console.log('while---simulateItem',JSON.parse(JSON.stringify(simulateList)) )
  console.log('while---moves',moves )


 /**
  * 移动元素
  * @param {*} index 
  */
  function remove (index) {
    var move = {index: index, type: 0}
    moves.push(move)
  }
 
  function insert (index, item) {
    var move = {index: index, item: item, type: 1}
    moves.push(move)
  }
/**
 * 移动模拟列表对元素进行删除
 * @param {*} index 
 */
  function removeSimulate (index) {
    simulateList.splice(index, 1)
  }


  return {
    moves: moves,
    children: children
  }
}
  /**
   * 判断是否是undefined
   * @param {*} value 
   */
  function isUndefined(value){
    return value===undefined
  }


/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree (list, key) {
  var keyIndex = {}
  var free = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    //当前列表中的key的值
    var itemKey = getItemKey(item, key)
    if (!isUndefined(itemKey)) {
      //存在key的值则进行赋值
      keyIndex[itemKey] = i
    } else {
      //不存在key的话压入到free中
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}

function getItemKey (item, key) {
  if (!item || !key) return void 666
  return typeof key === 'string'
    ? item[key]
    : key(item)
}

// exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
module.exports = diff

