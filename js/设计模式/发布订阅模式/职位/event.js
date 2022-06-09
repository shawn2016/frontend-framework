//发布和订阅者模式
let event ={
  list:{},
  //订阅者
  on(key,fn){
    //当前的事件队列中如果不存在此key的事件队列 则进行初始化队列数据
     if(!this.list[key]){
       this.list[key] = []
     }
     this.list[key].push(fn)
  },
  emit(){
    let key = [].shift.call(arguments),
        fns = this.list[key];//获得当前发布者的key的值
      if(!fns || fns.length ==0){
        return false;
      }
      fns.forEach(fn => {
        fn.apply(this,arguments)
      });
  },
  //移除事件队列
  remove(key,fn){
   let fns = this.list[key];
   //没有缓存列表 则返回false
   if(!fns) return false;
   //如果没有传递对应的函数 则清空key 
   if(!fns){
    fns && (fns.length =0)
   }else{
     //遍历缓存列表 看看传入的fn与哪个函数相同
     //存在相同的则从缓存列表中删除
     fns.forEach((cd,i)=>{
       if(cd ==fn){
         fns.splice(i,1)
       }
     })
   }
  }
}
function cat() {
  console.log('一起喵喵喵');
}
function dog() {
  console.log('一起旺旺旺');
}

event.on('pet', data => {
  console.log('接收数据');
  console.log(data);
});
event.on('pet', cat);
event.on('pet', dog);
// 取消dog方法的订阅
event.remove('pet', dog);
// 发布
event.emit('pet', ['二哈', '波斯猫']); 
/**
 * 创建一个对象（缓存事件列表）
 * on方法是来把回调函数fn都加载缓存列表中
 * emit方法取到arguments的第一个当作key 根据key值取执行对应的缓存列表函数
 * remove方法可以根据key值取消订阅
 */