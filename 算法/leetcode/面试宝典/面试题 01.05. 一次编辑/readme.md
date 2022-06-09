 
### 解题思路
此处撰写解题思路
前置判断 
* 连个字符串的长度相差只能是<1
* 两个字符串的长度小于2的时候 一定可以拼成
* 两个字符串长度相等的时候，比较字符串中只能存在一个不一样的字符
* 两个字符串长度不等的时候，以短字符串作为比较基准，通过顺序比较字符串单个字符是否相等，如果不想等，则长字符串进行后移，超过1个等的位置，则返回false


### 代码

```javascript
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
  //遍历短s的字符串 为基准插入s
  var count = 0,s=0,l=0;
  var ll = longStr.length,sl=shortStr.length
  //长度相同 只能替换 
  //长度不同 删除或者添s加
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
```