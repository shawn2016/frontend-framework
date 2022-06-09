 
/**
 * 给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
  回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列。
  回文串不一定是字典当中的单词。 
 */
/**
 * 思路分析 判断是否是回文排列字符串 
 * 1.排列后的字符串的特征
 * 2.字符串中是偶数就能组成回文字符串，存在一个的字符就无法组成字符串
 * 3.字符串是奇数 只允许存在一个不能字符为1个
 * 
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function(s) { 
  var charSum = cT(s),isOdd = s.length %2==0;
  var isOne = 0;
  for(var key in charSum){
     if(charSum[key]%2!=0){
       isOne++;  
     }
     if((isOdd && isOne)||(!isOdd && isOne>1)){
      return false
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
// console.log(canPermutePalindrome('adfgdfa'))
// console.log(canPermutePalindrome('adfggdfa'))
console.log(canPermutePalindrome('abc'))
console.log(canPermutePalindrome('sa'))