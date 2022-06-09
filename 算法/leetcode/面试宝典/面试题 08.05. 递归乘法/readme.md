### 解题思路
此处撰写解题思路

### 代码

```javascript
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
/**
 * 分析 4*6 其实就是4个6相加
 */
var multiply = function(A, B) {
    //递归
  let max = Math.max(A, B);
  let min = Math.min(A, B);

  const com = (value) => {
    if (value < 1) {
      return 0;
    }
    return max + com(value - 1);
  };
  return com(min);  
};
```
### 非递归
 ```
var multiply = function(A, B) {
    let min = Math.min(A,B)
    let max = Math.max(A,B)
    let sum=0;
    for(var i=0;i<min;i++){
        sum+=max
    }
    return sum;
    
}
```
