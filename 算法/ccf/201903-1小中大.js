/**
 * 题目描述
 *  题目背景 最大值最小值以及中位数是常用的统计信息
 * 
 */

function OpData(params){
 //参数赋值的时候需要注意到参数名字需要写正确
  this.array = params.array;
  this.number = params.number;
}
OpData.prototype ={
  constructor:OpData,
  maxNumber:function(){ 
    //考虑到负数的时候sort需要传递明确的大小排序 否则负数不准确
    var sort = this.array.sort((a,b)=>{return a-b}); 
    return sort[this.array.length-1];
  },
  minNumber:function(){  
    var sort = this.array.sort((a,b)=>{return a-b});  
    return sort[0]
  },
  centerNum:function(){
    var length = this.array.length; 
    if(length ==1){
      return this.array[0];
    }
    if(length % 2 == 0){
      //偶数位数数组
      var mid1 = Math.floor(this.array.length/2);
      var mid2 = mid1-1; 
      return (this.array[mid1]+this.array[mid2])/2;
    }else{ 
      //奇数位数数组
       var mid = Math.floor(this.array.length);
       return this.array[mid];
    }
  }
}

var data =new OpData({
  array:[-2,-1,3,4],
  number:4,
})
console.log(data.maxNumber());
console.log(data.minNumber());
console.log(data.centerNum());
