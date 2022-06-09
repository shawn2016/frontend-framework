/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-14 20:47:42
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-15 09:42:18
 */
/**
 * 栈排序。 编写程序，对栈进行排序使最小元素位于栈顶。最多只能使用一个其他的临时栈存放数据，但不得将元素复制到别的数据结构（如数组）中。该栈支持如下操作：push、pop、peek 和 isEmpty。当栈为空时，peek 返回 -1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-of-stacks-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var SortedStack = function() {
  this.stack =[];
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function(val) {
    //在进行push的时候
    this.stack.push(val);
    this.stack =this.stack.sort((a,b)=>{
        return b-a
    });
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
  return   this.stack.pop()

};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
    console.log( this.stack )
  return this.stack[this.stack.length-1]||-1
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
return this.stack.length ==0
};

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */