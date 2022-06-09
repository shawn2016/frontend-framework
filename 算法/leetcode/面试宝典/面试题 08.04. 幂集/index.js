/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-29 19:21:03
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-29 20:42:46
 */
/**
 * 幂集。编写一种方法，返回某集合的所有子集。集合中不包含重复的元素。
 说明：解集不能包含重复的子集。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var subsets = function(nums) { 
  //先进行查找 一个一个增加子集
  let collection=[];
  for(var i=0;i<nums.length;i++){
      let current = nums[i]; 
      generatorCollection(current,collection)
      collection.push([current]) 
  } 
  collection.push([])
 return collection;
};
//在generator中去找到{nums[0],nums[1]}的集合
function generatorCollection(item,collection){
  //进行循环collection前面的内容
  let recyleList = JSON.parse(JSON.stringify(collection))
  //在集合collection中，已经存在{nums[n-1]}的集合了，在增加一个元素后，无非是在前面的集合中再次增加寻找子集；
  for(var i=0;i<recyleList.length;i++){
      //获取当前collection的项目值
      let curr =JSON.parse(JSON.stringify( collection[i]));
      curr.push(item)
      collection.push(curr)
  } 
}
let result =subsets([1,2,3,4])
console.log(result)