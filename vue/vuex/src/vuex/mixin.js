 
export default function applyMixin(Vue){
  // let store ;
  //分发 混入钩子方法
  //父子组件的执行顺序s
  Vue.mixin({
    //内部会把生命周期函数拍平成一个数组
    beforeCreate:VuexInit

  })
}


//vue 的初始化 进行mixin混入模式 组件渲染从父亲到子孩子
function VuexInit(){  
    //将根的传递到页面组件中  给所有的属性添加$store属性
    const options = this.$options ;//获取用户所有的选项 
    if(options.store){
      //根实例  增$store
      this.$store = options.store; 
    }else if(options.parent && options.parent.$store) { 
      //子组件或者儿子组件 实例 将父亲的$store 传递给下一级
      this.$store = options.parent.$store;
     }
    //存在store的是根实例 不存在则是子组件 没有store
    console.log("mixin=====beforeCreate") 
}