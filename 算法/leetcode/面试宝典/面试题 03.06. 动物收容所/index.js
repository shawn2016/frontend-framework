/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-15 09:47:00
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-15 19:21:33
 */
/**
 * 动物收容所。有家动物收容所只收容狗与猫，且严格遵守“先进先出”的原则。在收养该收容所的动物时，收养人只能收养所有动物中“最老”（由其进入收容所的时间长短而定）的动物，或者可以挑选猫或狗（同时必须收养此类动物中“最老”的）。换言之，收养人不能自由挑选想收养的对象。请创建适用于这个系统的数据结构，实现各种操作方法，比如enqueue、dequeueAny、dequeueDog和dequeueCat。允许使用Java内置的LinkedList数据结构。



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/animal-shelter-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var AnimalShelf = function() {
  this.animalsQueue =[  ]
};

/** 
 * @param {number[]} animal
 * @return {void}
 */
AnimalShelf.prototype.enqueue = function(animal) { 
    if(this.animalsQueue.length>=20000) return ;
    this.animalsQueue.push(animal)
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueAny = function() {
    if(this.animalsQueue.length==0){
        return [-1,-1]
    }
   let r =  this.animalsQueue.shift();
   return r;
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueDog = function() {
  //遍历
 for(var i=0;i< this.animalsQueue.length;i++){
     if(this.animalsQueue[i][1]==1){
         return this.animalsQueue.splice(i,1)[0]
     }
 }
 return [-1,-1]
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueCat = function() {
      //遍历
 for(var i=0;i< this.animalsQueue.length;i++){
     if(this.animalsQueue[i][1]==0){
         return this.animalsQueue.splice(i,1)[0]
     }
 }
 return [-1,-1]
};

/**
 * Your AnimalShelf object will be instantiated and called as such:
 * var obj = new AnimalShelf()
 * obj.enqueue(animal)
 * var param_2 = obj.dequeueAny()
 * var param_3 = obj.dequeueDog()
 * var param_4 = obj.dequeueCat()
 */