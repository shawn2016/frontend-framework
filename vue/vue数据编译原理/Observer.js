
function observer(value,vm){
  //被观察的必须是一个对象
  if(!value || typeof value!=='object') return 
  //创建新的Observer对象
  return new Observer(value)
 } 
 
//对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty()
// 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
function Observer(data){
  //保存data
  this.data = data;
  //开始对data进行监控
  this.walk(data)
}
Observer.prototype={
  walk:function(data){
    //保存observer对象
    var me = this;
    //遍历data中所有属性
    Object.keys(data).forEach(function(key){
      //对指定的属性进行属性监控
      me.defineReactive(me.data,key,data[key])
    })
  },
  defineReactive(data,key,val){
    //创建属性对应的Dep属性 dependcy 依赖
    var dep = new Dep();
    //通过间接的递归实现对data中所有层次的属性数据劫持
    var childObj = observer(val);
    //给data重新定义属性，添加data中所有层次的属性的数据劫持 添加set和get的方法
    Object.defineProperty(data,key,{
      enumerable:true,//可枚举
      configurable:false,//不可进行配置
      get:function(){
        //返回值，建立dep和watcher之间的关系
        if(Dep.target){
          dep.depend();
        }
        return val;
      },
      set:function(newVal){
        if(newVal == val) return 
        val = newVal
        //监视key的属性变化，更新界面
        //新的值如果是ovject的话，还需要进行监听
        childObj = observer(newVal);
        //通知订阅者
        console.log(dep)
        dep.notify();
      }
    })
  }
}

var uid = 0;
//通知变化的依赖
function Dep(){
  this.id=uid++;
  this.subs=[];//所需要进行依赖的watcher
}
Dep.prototype={
  addSub:function(sub){
    this.subs.push(sub)
  },
  depend:function(){
    //去watcher中添加deps的依赖关系
    Dep.target.addDep(this);
  },
  removeSub:function(sub){
    var index = this.subs.index(sub);//获取到当前的sub的index
    if(index !=-1){
      this.subs.splice(index,1)
    } 
  },
  notify:function(){
    //遍历所有的watcher 通知watcher更新
    this.subs.forEach(function(sub){
      sub.update();
    })
  }
}
Dep.target = null;