/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-29 16:35:18
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-29 16:58:13
 */
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
  // let result = recyle(n) 
  // return result;
};
/**递归 */
function recyle(n){ 
  if(n==0) return 0;
  if(n==1) return 1;
  if(n==2) return 2;
  if(n==3) return 4;
  if(n>3){
      let r1 = recyle(n-1);
      let r2 = recyle(n-2);
      let r3 = recyle(n-3)
      console.log(r1,r2,r3)
      return  (r1+r2+r3)%1000000007
  }
 
}