//可以直接监听数组
var arr = [1,2,3,4,5,6,7,8]
// arr = new Proxy(arr,{
//   get(arr,key,reciver){
//     console.log(arguments)

//   },
//   set(arr,key,value,reciver){
//     arr[key]=value
//     console.log(arguments)
//   }
// })
// arr[0]
// arr[3]=5
// console.log(arr)


//
// Object.defineProperty 实现数组的拦截
for(var key in arr){
  Object.defineProperty(arr,key,{
    configurable:false, //是否是可配置的
    enumerable:true,//是否是可枚举的 通过Object.keys进行遍历或者for...in 
    set(val){
      console.log(val);
    },
    get(val){
      console.log(val)
    }
  })
}
arr.push(3) //无法检测到
arr[2]  //获取值时候可以检测到 因为key为2的时候已经被绑定
arr[3]=4 //能够获取到
arr[arr.length-1]=5 //无法监听到 因为刚新push的key没有进行属性的监听和绑定
arr.pop();//检测不到
arr.sort();//能够监测到 key的的value发生了变化
// arr.splice(arr.length-1,1) //无法删除 报错
arr.reverse() //可以检测到 key值对应的value发生变化