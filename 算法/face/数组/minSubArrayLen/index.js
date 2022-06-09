/*
 * @Descripttion: 长度最小子数组
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 13:39:06
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-02 13:57:07
 */

var minSubArrayLen = function(s, nums) {
  let sum =0;//用于记录长度
  let min =  nums.length +1;
  let row = 0;//已经被加入到sum中的位置参数
  let arr = [];
  for(var i=0;i<nums.length ;i++){
    sum+=nums[i];
    arr.push(nums[i])
    //比较sum和s的长度 
    while(sum >=s){
      //此时让sum减去最前面的那个元素 
      min = Math.min(min,i-row+1);//记录当前最小的元素
      sum -= nums[row];
      arr.shift(); 
      row++;
    } 
  }  
  return min == nums.length + 1 ? 0 : min;
};
let result = minSubArrayLen(7,[1,2,3,5,9,4,1,6])
console.log(result)
