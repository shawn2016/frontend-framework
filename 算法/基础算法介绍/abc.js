 
//a+b+c = 1000且 a^2+b^2+c^2=1000 求ab c的组合
var arr=[]
console.time("start")
// var k = 0;
// for(var a = 0;a<=1000;a++){
//   for(var b = 0;b<=1000;b++){
//      for(var c = 0;c<=1000;c++){
//       k++
//        if((a*a +b*b+c*c) ==1000){
//          arr.push({a:a,b:b,c:c})
//        } 
//      }
//   }
// }
console.timeEnd("start")
console.log(arr)
// console.log(k)
let app = [];
var arr =[]
console.time("d")
for(var i=0;i<10300;i++){
  app.push(i)

}
console.timeEnd('d')
console.time("s")
for(var i=0;i<10300;i++){
  arr.unshift(i)

}
console.timeEnd('s')

