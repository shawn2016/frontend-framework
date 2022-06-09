 
import { forEachValue } from '../utils'
import Module from './module'
// 数据格式化类
class Modulecollection {
  constructor(options) {
    //递归
    this.register([], options) //stack 栈结构 [根对象，a]
  }
   //获取当前的明
 getNamespaced(path){
  let root = this.root; 
  return  path.reduce((str,key)=>{//['a','c']
           root= root.getChild(key)  //通过路径不停的去找当前的模块
           return str+ (root.namespaced ?key+'/':"");
       },'')
  }
  //注册模块
  register(path, rootModule) {
    //构造这个对象
    let newModule = new Module(rootModule)
    if (path.length == 0) { //说明其是根模块
      this.root = newModule; //root就是树的根
    } else {
      //reduce可以
      var parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current);//返回结果将作为下一次结果操作
      }, this.root)

      //找到父亲，将元素放进去
      parent.addChild(path[path.length - 1], newModule)
    }

    //如果存在module
    if (rootModule.modules) {
      //循环模块
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module)
      })
    }

  }
}
export default Modulecollection
/**
 * this.root={
 *  _raw:'根模块',
 * _children:{
 * a:{
 *   _raw: 'a 模块',
 *   _children:{
 *      c:{
 *     }
 *   },
 *   state:'a的状态'
 * }
 *  b:{
 *   _raw: 'b模块',
 *   _children:{},
 *   state:'b的状态'
 * }
 *
 * },
 * state:'根模块自己状态'
 *
 * }
 */