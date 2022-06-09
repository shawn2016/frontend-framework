/* 
  10 22 30
  14 12 16 6 10 2 8 20 18 4 
  n(小球个数) L(线段长度) t(几秒后的位置) 
  arr 初始时候小球的位置
 */
// 小球序号不一样 arr 下标表示小球当前的序号 value 表示小球当前的位置

var  n = 10;
var  L = 22;

// function Ball(){
//    this.number = params.n;
//    this.lineLength = params.length;
//    this.ballArr = params.length;
//    this.time = params.t;

// }
// Ball.prototype ={
//   findBall(){
//     //time 时间后
//   }
// }

function findBall(arr,l,t){
 var newarr= arr.map((item)=>{
    return {
      pos:item,
      direction:item >= l ?'left':'right',
    }
  })
  var result =[];
  //时间限制
   for(var j=1;j<=t;j++){
     var nowPos = newarr;//记录未开始下一秒前所有的小球的位置 
     result = newarr.map((item,index) => {

       //当前存在一个和其他小球相同的位置 则进行如果标志 right 则进行 -- 如果标志
       var haveSame = false;
       nowPos.forEach((v,i)=>{
         if(i!=index && v.pos == item.pos){
           haveSame = true;  
         }
       })
       //存在相同位置的小球 移动相反的方向
       var pos = item.pos;
       var direction =item.direction;
       if(pos==l){
          direction='left';
          pos--;
        }else if(pos==0){
          direction ='right';
          pos++;
      }else{ 
        if(haveSame){ 
           direction =='right'?pos--:pos++;
           direction=  direction =='right'?'left':'right'; 
         }else{ 
            direction =='right'?pos++:pos--;
            direction = direction =='right'?'right':'left';
         }
      }
       return {
        pos : pos,
        direction:direction,
       }
     });  
     console.log(j+'秒');
     console.log(result)
     newarr = result; //存储上一秒的数组
   }
   
   return result;
}

// var arr= findBall([4,6,8],10,5);
// console.log(arr);
var myarr = '14 12 16 6 10 2 8 20 18 4'.split(" ");
findBall(myarr,22,30)
function ball(arr,l,t){  
  //arr是小球的初始位置数组 
  //tmp数组将初始位置从小到大排序
  //resultArr记录小球结束的位置
  var tempArr = [];
  var resultArr = arr.map((item)=>{
    tempArr.push(item); 
    var pos = (parseInt(item)+t) % (2*l); 
    if(pos>l){
       pos = l-pos%l;
    }else{
       pos = pos;
    }
    return pos;
  })
  resultArr.sort((a,b)=>{return a-b});//结果的位置大小排序
  tempArr.sort((a,b)=>{return a-b}); //输入的数组进行顺序排序
  var dic ={}; //存储输入的时候 小球的排序 key->表示小球的初始位置 value 表示小球的输入顺序 
  tempArr.forEach((item,index)=>{
     dic[item] = index; //排序后的小球对应的位置
  })  
  var result = [];
  for(var i=0;i<arr.length;i++){
    /**arr[i]开始输入时候小球的值
     * dic[arr[i]] 找到排序后输入的小球的序号的位置
     * resultArr[[dic[arr[i]]]] 取出排序后的对应位置
     *  */ 
    result.push(resultArr[dic[arr[i]]]) 
  }
  return result;
} 
// var result = ball(myarr,22,30);
// console.log(result)
