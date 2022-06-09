/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-15 10:07:36
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-22 10:58:50
 */
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function(n, graph, start, target) {
  let array = [] //使用array存储当前的内容
   for (let i = 0; i < n; i++) {
       array.push(new Set())
   }
   //初始化array数组，将有向图图标的内容映射过去
   for (let [s, e] of graph) {
       array[s].add(e)
   } 
   // 用一个 set 对象来判断是否走过某个节点
   const visited = new Set() 
   return BfsReach(array, start, target, visited) 
};
//广度优先遍历邻接表数组
function BfsReach(array, start, target, visited){
   //当前找到了目标点 则进行false
   if(start == target){
       return true;
   }
   //如果visited中存在当前start节点，说明出现了闭环，走过了，因此返回falsee
      if (visited.has(start)) { // 如果开始节点已经走过（判断过），产生闭环，直接返回 false
           return false
       }
       //将当前节点添加到visited中
       visited.add(start) // 添加当前 start 节点为已经走过（遍历判断过）
        // 遍历判断 start 节点能到达的节点，set 对象用 of 遍
       for (let next of array[start]) {
           if (BfsReach(array, next, target, visited)) return true
       }
       return false;

}