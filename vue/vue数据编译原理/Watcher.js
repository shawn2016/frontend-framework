/**
 * 监听者
 */

 function Watcher(vm,exp,cd){
   this.cb =cd;//更新界面的会掉
   this.vm = vm;
   this.exp = exp;//表达式
   this.depIds={};//包含所有相关的dep容器
   this.value = this.get();//得到表达式的初始值保存
 }
 Watcher.prototype ={
   update:function(){
     this.run();
   },
   run:function(){
     var value =this.get();
     var oldVal = this.value;//保存当前
     //当前的数据不一样时候才进行更新调用
     if(value !== oldVal){
       this.value = value;
       this.cb.call(this.vm,value,oldVal)
     }
   },
   //添加dep订阅
   addDep:function(dep){
     /**
      * 1.每次调用run()的时候会出发相应的属性getter getter里面会触发dep.depend(),继而触发这里的addDep
      * 2.加入相应的的属性dep.id已经存在当前的watcher中depids中，说明不是一个新的属性，仅仅是改变了其值而已，则不需要将其保存在当前的watcher中
      * 3.假如相应的属性是新的属性，则将当前的属性保存在dep中
      * 4.每个子属性的watcher在添加子属性的dep的同时，也会添加到父属性的dep,
      * //监听子属性同时监听父属性的变更，这样，父属性更新改变时候，子属性的watcher也能收到通知进行uodate
      * this.get()-->this.getVmValue()中完成，forEach从父级开始取值，间接调用了它的getVmVal
      * 触发了当前的addDep,在整个forEach过程中，当前的watcher会假如到每个父级过程的属性dep
      */
     //判断当前的dep和watcher的关系是否已经建立
     if(!this.depIds.hasOwnProperty(dep.id)){
       //将watcher添加到dep中
       dep.addSub(this);
       this.depIds[dep.id]=dep;
     }
   },
   //get 表达式建立watcher和dep的关系
   get:function(){
     //给dep指定当前的watcher
     Dep.target = this;
     //获取表达式中的值，内部用get和dep建立与watcher的关系
     var value = this.getVmVal();
     //去除dep指定的当前watcher
     Dep.target = null;
     return value;
   },
   getVmVal(){
     var exp = this.exp.split('.');
     var val = this.vm._data;
     exp.forEach((key) => {
       val = val[key]  
     });
     return val;
   }
 }