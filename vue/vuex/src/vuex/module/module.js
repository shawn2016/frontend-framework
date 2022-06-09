import { forEachValue } from "../utils";

 
export default class Module{
  get namespaced(){
    return !!this._raw.namespaced
  }
 constructor(newModule){
   this._raw = newModule;
   this._children = {};
   this.state = newModule.state 
 }
 getChild(key){
  return this._children[key]
 }
 addChild(key,module){
  this._children[key] = module; 
 } 

 //遍历moutions
  forEachMution(fn){
    if(this._raw.mutations){
      forEachValue(this._raw.mutations,fn)
    }
  }
  //遍历actions
  forEachAction(fn){
    if(this._raw.actions){
      forEachValue(this._raw.actions,fn)
    }
  }
  //遍历getters
  forEachGetters(fn){
    if(this._raw.getters){
      console.log(this._raw.getters)
      forEachValue(this._raw.getters,fn)
    }
  }
  //模块遍历子节点
  forEachChild(fn){  
      forEachValue(this._children,fn)
  }

}