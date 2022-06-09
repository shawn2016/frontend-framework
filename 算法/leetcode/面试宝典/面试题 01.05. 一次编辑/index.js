 
/**
 * 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。
 */
/**
 * 
 * 题目思路解析 是否需要一次或者0次编辑
 * 插入一个字符、删除一个字符或者替换一个字符
 * 两个字符串特征  长度相差一个
 *  2345
 *  231345
 */
/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function(first, second) { 
  if(Math.abs(first.length-second.length)>1) return false; 
  if(first.length <=1 && second.length <=1) return true;
  var shortStr,longStr;
  if( first.length > second.length ){
    shortStr=second;
    longStr = first
  } else{
    longStr=second;
    shortStr = first
  }
  //遍历短的字符串 为基准插入
  var count = 0,s=0,l=0;
  var ll = longStr.length,sl=shortStr.length
  //长度相同 只能替换 
  //长度不同 删除或者添加
  while(s<sl && l<ll){
    if(shortStr[s]==longStr[l]){
      s++;
      l++;
    }
    if(shortStr[s]!=longStr[l]){
      if(ll==sl){
        s++;
        l++;
        count++
      }else{
        l++;
        count++
      }
    }
    if(count >1) return false;
  }
  // 循环完成后情况分析
  if(s<sl) return false;
  return true;    
};
console.log(oneEditAway('teacher','tearscher'))
// console.log(oneEditAway('pales','pal'))s