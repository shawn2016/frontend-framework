/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-14 13:34:21
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-14 15:59:11
 */
/**
 * 请设计一个栈，除了常规栈支持的pop与push函数以外，还支持min函数，该函数返回栈元素中的最小值。执行push、pop和min操作的时间复杂度必须为O(1)。

 */

 /**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []

};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x)

};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop();

};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.statck[this.stack.length-1]||-1

};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if(this.stack.length ==0) return -1
  //获取栈中的最小值
  var min = this.stack[0];
  this.stack.forEach(item=>{
    if(min>item){
      min = item;
    }

  })
  return min
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */