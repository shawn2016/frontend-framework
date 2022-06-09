 
import applyMixin from './mixin'
// import { forEachValue } from './utils'
import Modulecollection from './module/module-collection'
import { forEachValue } from './utils';
export let Vue;
//安装模块

/**
 * 初始化安装模块
 * @param {*} store 容器
 * @param {*} rootState  根模块
 * @param {*} path 所有路径
 * @param {*} module 我们刚刚格式化后的结果
 */
const installModule=(store,rootState,path,module)=>{
      //将各种源都放入在中 对当前模块进行操作，
      //需要遍历当前模块上的actions、MUTATION、GETTERS都把他定义在modules中

      //存在问题 如果一个子模块的上级模块没有写namespace则可能导致此模块的路径直接暴露在全局中，则更改上级模块的时候，子模块也会跟着进行改变
      let namespace = store._modules.getNamespaced(path);
     //给当前订阅的事件增加一个命名空间[a,c]  

      //将所有子模块的状态安装到父模块中
      if(path.length>0){
        //将自己的状态挂载到父元素上 
        //Vue.set vuex可以动态添加模块
        // [a,c]
       let parent= path.slice(0,-1).reduce((memo,current)=>{
          return memo[current]
        },rootState)
        //如果这个对象本身不是响应式的，那么Vue.set 就相当于 
        //如果该数据不是响应式的 则进行响应式赋值，如果节点是响应式的，则直接进行赋值即可
        Vue.set(parent,path[path.length-1],module.state);
      } 

      module.forEachMution((mutation,key)=>{
        store._mutations[namespace+key] = (store._mutations[namespace+key]||[]);
        store._mutations[namespace+key].push((payload)=>{
          //执行插件
          store._subscribes.forEach((fn)=>{ 
             fn(mutation,store.state)
          })
          //重新payload 调用这个方法
          mutation.call(store,getState(store,path),payload)
        })
      }) 
      module.forEachAction((action,key)=>{
        store._actions[namespace+key] = (store._actions[namespace+key]||[]);
        store._actions[namespace+key].push((payload)=>{
          //重新payload 调用这个方法
          action.call(store,store,payload)
        })
      }) 
      //模块中getter的名字重复了会被覆盖
      module.forEachGetters((getter,key)=>{
        store._wrappedGetters[namespace+key]=function(){
          return getter(getState(store,path))
        }
      })
      
      //循环
      module.forEachChild((child,key)=>{
        //递归加载模块
        installModule(store,rootState,path.concat(key),child)
      })

  }
/**
 * restevm信息 主要是把state绑定到vue的实例data中去，能够响应式获取数据
 * @param {*} store 容器
 * @param {*} state 当前状态
 */
const resetStoreVm=function(store,state){
    const computed = {}; //定义计算属性
    store.getters ={}; //定义store中的getters
  
     //将getters存储到计算属性中去
    forEachValue(store._wrappedGetters,(fn,key)=>{
      computed[key] =()=>{
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        //用户每次取值都会执行此函数
        get: () => store._vm[key]    //取值的时候取计算属性的值，实现缓存的功能
      })
    })
    //
    store._vm = new Vue({//计算属性的所有属性都会放到实例中去
      data:{
        $$state:state
      },
      computed, //挂在到vm中
    }) 
}

/**
 * 获取最新的状态 可以保证视图更新
 * @param {*} store vuex的存储实例对象
 * @param {*} path 当前命名空间的下一个子模块
 */
function getState(store,path){
  return path.reduce((newState,current)=>{
    return newState[current]
  },store.state)
}

//容器的初始化
class Store {
  //options 当前new Vuex.store的配置内容
  constructor(options) {
    const state = options.state || {};//数据变化要更新视图
    //响应式的数据

    this._actions={};
    this._mutations={};
    this._wrappedGetters={}; 
    this._subscribes =[];//订阅的函数 ---供插件使用

    //1.模块收集，核心为数据的格式化，格式化成我想要的结果，形成树的结构
    this._modules = new Modulecollection(options)
    console.log( this._modules)
    
    //2.安装module 根模块的状态中，将子模块通过哦模块名字定义在根模块中
    installModule(this,state,[],this._modules.root); //收集模块
  
    //3.创建实例 将状态和getters定义在当前的实例上
    resetStoreVm(this,state); 

    //4.插件的执行 插件内部会依次执行
    options.plugins.forEach(plugin=>plugin(this))
    
    //状态编写 属性数值以$开头，就不会添加到内部的data中，默认不会将属性挂在到实例上
    //1.添加状态逻辑 Vue的实例在页面中存在，因此能够进行更新值
    //数据在哪里使用，就会收集对应的依赖
    /** 第一版本 
    //2.处理getters 具有缓存的作用，多次取值如果值不变，不会重新调用get方法
    //获取getters //增加缓存
    this.getters = {};
    //options.getters 多次取值n次
    forEachValue(options.getters, (fn, key) => {
      //将用户的getteers 定义在实例上
      computed[key] = () => {
        return fn(this.state);
      }
      Object.defineProperty(this.getters, key, {
        //用户每次取值都会执行此函数
        get: () => this._vm[key]    //取值的时候取计算属性的值，实现缓存的功能
      })
    })

    //3.计算属性的实现
    this._vm = new Vue({
      data: {
        $$state: state,//会将$$state 对应的对象，都会通过defineProperty属性劫持
      },
      computed,//计算属性是如何实现缓存的 dirty
    })

    //3.实现muations  options.muations
    this._mutations = {};
    this._mutations = {};
    forEachValue(options.mutations, (fn, key) => {
      //和commit对应 更改
      this.mutations[key] = (payload) => fn(this.state,payload) 
    })
    
    //实现actions
    forEachValue(options.actions, (fn, key) => {
      this._actions[key] = (payload) => fn(this,payload)
    })
     * 
 */
  }
  /**
   * 订阅函数
   * @param {*} fn  订阅函数操作
   */
  subscribe(fn){
    //将订阅的函数压入到_subscribes的订阅函数队列中
    this._subscribes.push(fn) 
  }
  /**
   * 更换state 主要能够进行刷新的时候存储数据
   * @param {*} state 
   */
  replaceState(state){ 
    //类型校验 包含数组内容 算出新的状态 改的时候也需要更改新的值
    this._vm._data.$$state = state;
  }
  //严格模式下 action和mutations的区别
  commit = (type,payload) => {//更改文档 保证当前this 当前store实例
      //调用commit去找绑定好的mutations 
      // 传入的type和payload
      this._mutations[type].forEach((mutation)=>mutation.call(this,payload))
  }
  //dispatch
  dispatch=(type,payload)=>{
    this._actions[type].forEach((action)=>action.call(this,payload))
  }
  //属性访问器  访问state的时候能够进行拦截和操作
  get state() { 
    return this._vm._data.$$state;
  }

}


//插件安装 

// Vue.use=function(plugin){
//   plugin.install.call(this)
// }

//Vue.use会调用插件中的install方法，此方法的参数就是Vue的构造函数
const install = (_Vue) => {
  console.log(_Vue)
  //插件中的_Vue的构造函数传入进来，不用去依赖某个版本
  Vue = _Vue;//暴露Vue 提供给其他的文件使用 

  //需要将根组件注入的Store 分派给每一个组件(子组件) 把方法混入到每个组件中
  applyMixin(_Vue);
}
export default {
  Store,
  install
} 