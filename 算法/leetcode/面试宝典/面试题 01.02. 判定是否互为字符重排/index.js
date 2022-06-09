 
/**
 * 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

示例 1：

输入: s1 = "abc", s2 = "bca"
输出: true 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/check-permutation-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 //题目含义 比较两个字符串字符个数以及长度是否相同
var CheckPermutation = function(s1, s2) {
  if(!s1||!s2) return false;
  if(s1.length !== s2.length) return false;
  //长度相同时候，
  var s1Obj =cT(s1),s2Obj=cT(s2)
  if(Object.keys(s1Obj).length!=Object.keys(s1Obj).length)
  return false;
  for(var key in s1Obj){
    if(s1Obj[key]!=s2Obj[key]){
      return false;
    }
  }
  return true;
};
function cT(str){
  var obj = {}
  for(var i=0;i<str.length;i++){
    obj[str[i]] ?  obj[str[i]]++ :  obj[str[i]] =1
  }
  return obj;
}
var result = CheckPermutation("ddse","sedd")
console.log(result)