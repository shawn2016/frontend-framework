/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-14 15:55:14
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-14 20:47:26
 */
/**
 * 
 */
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
  this.queue = [];

};

/**
* Push element x to the back of queue. 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function(x) {
  this.queue.push(x)

};

/**
* Removes the element from in front of queue and returns that element.
* @return {number}
*/
MyQueue.prototype.pop = function() {
 return this.queue.splice(0,1)
};

/**
* Get the front element.
* @return {number}
*/
MyQueue.prototype.peek = function() {
return this.queue[0]
};

/**
* Returns whether the queue is empty.
* @return {boolean}
*/
MyQueue.prototype.empty = function() {
  return this.queue.length ==0

};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/