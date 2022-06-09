/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-31 19:59:28
 * @LastEditors: Mfy
 * @LastEditTime: 2020-10-31 20:49:27
 */
/**
 * 字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成（比如，waterbottle是erbottlewat旋转后的字符串）。
 */
//想的比较复杂了
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function (s1, s2) {
  if (s1.length != s2.length) return false;
  if (s1 == s2) return true;
  // //找到旋转点
  // var index = findPoint(s1, s2)
  // //  将s1中的字符串传递过去
  // var s3 = s1.substring(index, 0),
  //   s4 = s1.substring(index);
  // console.log(s4 + s3)
  // if (s4 + s3 == s2) return true; 
  return (s2+s2).indexOf(s1)!=-1;
};
// function findPoint(s1, s2) {
//   var i = 0; j = 0, record = 0; //s2作为基本川
//   while (i < s1.length && j < s2.length) {
//     if (s1[i] != s2[j]) {
//       record = i;
//       i++;
//     } else {
//       j++;
//       i++
//     }
//   }
//   console.log(record)
//   return record + 1
// }
// //waterbottle
// //erbottlewat
console.log(isFlipedString('waterbottle','erbottlewat'))
console.log(isFlipedString(
  "PvcvpkpHwaXQxpgGzURBvHRMvCsCPPmlKBSzXDWSvrxLBPdAvRpgcIwNOVQDdwPIElrAFqmb",
  "SvrxLBPdAvRpgcIwNOVQDdwPIElrAFqmbPvcvpkpHwaXQxpgGzURBvHRMvCsCPPmlKBSzXDW"
))