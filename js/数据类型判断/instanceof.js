/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-18 18:58:42
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-18 19:00:50
 */
function instanceofMy(left,right){
  //判断left是不是right中
  let prototype = right.prototype;
  while(true){
    if(left ==null){
      return false
    }
    if(prototype ==left){
      return true;
    }
    left = left.__proto__
  }
}