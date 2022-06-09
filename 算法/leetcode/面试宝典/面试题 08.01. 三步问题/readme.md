### 解题思路
  本题的涉及到的是动态规划问题，首先进行分析该题目;
   当走到第一个台阶的时候：我们只能迈一步就到了
   走到第二个台阶的时候：此时可以一步一步上，两步就到，也可以一步就到；
   走到第三个台阶的时候：一步一步上，三步就到；先两步再一步，先一步在两步；此时三种，但是我们的方法还需要加上上第二个台阶的时候的方法；
   到第四个台阶的时候：
   此时我们思考： 前面可以一步两步、三步到第四个这里，假设到第四个台阶是s方法：
    如果到最后一个台阶的时候是一步上来 则s1 = f(n-1)
    如果最后一步是两个台阶上来的则 s2 =f(n-2)
    如果最后一步是三个台阶上来的 则s3=f(n-3)
  那么到第四个台阶就有三种可能，而到达的方法就是这几个方法的和：
    S = s1+s2+s3

如果到哒第n个台阶：
    s(n) = s(n-1)+s(n-2)+n(s-3)

### 代码

```javascript
/**
 * @param {number} n
 * @return {number}
 */
//动态规划
var waysToStep = function(n) {  
    //第1层、2层、3层 时候需要的走法，每上一层，都是和之前的进行累加的过程
    let dp = [0,1,2,4]
    for(let i = 4; i<n+1; i++){
        dp[i] = (dp[i-1] + dp[i-2] + dp[i-3])%1000000007
    }
    return dp[n]
};

```
```
/**递归 */
function waysToStep(n){ 
    if(n==0) return 0;
    if(n==1) return 1;
    if(n==2) return 2;
    if(n==3) return 4;
    if(n>3){
        let r1 = waysToStep(n-1);
        let r2 = waysToStep(n-2);
        let r3 = waysToStep(n-3)
        console.log(r1,r2,r3)
        return  (r1+r2+r3)%1000000007
    }
   
}
```
