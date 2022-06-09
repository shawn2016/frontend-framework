/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-28 18:17:22
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-29 16:34:16
 */
/**
 * @param {number} N
 * @param {number} M
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
//题目简单解析，将M插入到N的后序排列第i的位置开始到第j的位结束，
//看不懂题目的我 瑟瑟发抖呢

var insertBits = function(N, M, i, j) {
  var  t= 0; 
        for(let x=i;x<=j;x++){
            t=t|(1<<x);
        }
        t=~t;//将t求反,1111...000...111
        N=N&t;//N与t相与,就是将对应位清除。
        M=M<<i;
        return N|M; 
 
};