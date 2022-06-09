 
//vue 特点 数据变化的时候更新视图
//监控、更新作用
/**
 * 观察者模式
 * 观察者和被观察者联系紧密
 * 两个对象是互相依赖的
 */
//被观察者 
class Subject{
  constructor(){
    this.state = "开心";
    this.arr = []
  }
   attach(o){
    this.arr.push(o)
   }
   setState(newState){
     this.state= newState; 
     //通知每个订阅的人 去更新状态
     this.arr.forEach(o=>o.update(newState))
   }
}
//观察者
class Observer{
  constructor(name){
    this.name = name
  }
  update(newState){
    console.log(this.name+":小宝宝的状态"+ newState)
  }
}
let o  = new Observer("我");
let c = new Subject("小宝宝")
c.attach(o)
c.setState("不开心")
c.setState("开心")




