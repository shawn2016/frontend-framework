
/**
 * Mvvm的作用 建立匹配对象，并将对象加入到compiles中进行编译
 */
function Mvvm(options){
  //将配置对象保存到vm中
  this.$options  = options
  //将data对象保存在vm和变量data中
  var data = this._data = this.$options.data;
  //保存实例对象到me中
  var me = this;

  //遍历所有的属性
  //key是data中的某个属性 vm.xxx=>vm._data.xxx 实现此代理
  Object.keys(data).forEach(function(key){
     //对指定的属性实现代理
     me._proxy(key)
  })

  observer(data,this);
  //创建一个编译对象 用来编译解析我们的el元素
  this.$compile = new Compile(options.el|| document.body,this)
  console.log(this)

} 
Mvvm.prototype={
  $watch:function(key,cb,options){
    new Watcher(this,key,cb)
  },
  _proxy:function(key){
    var me =this;
    Object.defineProperty(me,key,{
      configurable:false,
      enumerable:true,
      get:function proxyGetter(){
        return me._data[key]
      },
      set:function proxySetter(newVal){
        me._data[key] = newVal
      }
    })
  }
}