 
 
/**
 * 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。

示例 1：

输入: s = "leetcode"
输出: false 
示例 2：

输入: s = "abc"
输出: true

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/is-unique-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

//划分比较 将astr进行分割
/**
 * 
 * 
 */
var isUnique = function(astr) {
  if(!astr || astr.length >100) return true;
  var str = astr.split("") 
  for(var i=0;i<str.length;i++){
    var index= astr.indexOf(str[i])
      if(index >-1 && index!==i){
        return false;
      }
  }
  return true;  
};
console.log(isUnique(""))


var isUnique1 = function(astr) {
  if(!astr || astr.length >100) return true;
  var str = astr.split("") 
  for(var i=0;i<str.length;i++){
    for(var j=i+1;j<str.length;j++){
       if(str[i]==str[j]){
            return false;
       }
    }
  } 
  return true;  
};
console.log(isUnique("aderrtqt"))
