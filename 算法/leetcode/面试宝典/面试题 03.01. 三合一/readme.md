<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-14 13:31:19
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-14 13:31:22
-->
### 解题思路
  栈的基本操作原理；
push 入栈
pop 删除栈的第一个元素
peek 返回栈定的元素
isEmpty 判断当前栈是否为空

### 代码

```javascript
/**
 * @param {number} stackSize
 */
var TripleInOne = function(stackSize) {
    this.size = stackSize;
    this.stack =[];

};

/** 
 * @param {number} stackNum 
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function(stackNum, value) {
   if(!this.stack[stackNum]){
       this.stack[stackNum]=[]
   }
   if(this.stack[stackNum].length < this.size){
       this.stack[stackNum].push(value)
   }
   
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function(stackNum) {
  if(this.stack[stackNum] && this.stack[stackNum].length>0){
    return   this.stack[stackNum].pop();
  }
  return -1
};

/** 
 * @param {number} stackNum
 * @return {number} 栈的最后一个元素
 */
TripleInOne.prototype.peek = function(stackNum) {
     if(this.stack[stackNum] && this.stack[stackNum].length>0){
    return  this.stack[stackNum][this.stack[stackNum].length - 1]
  }
  return -1
};

/** 
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function(stackNum) {
    return !this.stack[stackNum] || !this.stack[stackNum].length 
};

/**
 * Your TripleInOne object will be instantiated and called as such:
 * var obj = new TripleInOne(stackSize)
 * obj.push(stackNum,value)
 * var param_2 = obj.pop(stackNum)
 * var param_3 = obj.peek(stackNum)
 * var param_4 = obj.isEmpty(stackNum)
 */
```