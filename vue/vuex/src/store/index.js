 

import Vue from 'vue'
import Vuex from '../vuex/index'
// import Vuex from 'vuex' 
// import createLogger from 'vuex/dist/logger'
import a from './a.js'
import b from './b.js'

console.log(Vuex)
Vue.use(Vuex)

//1. plugins subscribe replaceState
function presists(){
  return function(store){//store 当前默认传递
    store.subscribe((mutations,state)=>{
      //插件加载在回来
      let data = sessionStorage.getItem('VUEX:STATE');
      if(data){
        store.replaceState(JSON.parse(data))
      }
      //方法执行的时候就会触发
      console.log("---------")
      console.log(state)
      sessionStorage.setItem('VUEX:STATE',JSON.stringify(state))
    })
  }
}

const store = new Vuex.Store({  
  plugins:[ 
    presists(), //高阶函数 vue-persists
  ],
  state: {
    age: 0,
    name:'djsjdsdj', 
  },
  // mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化
  mutations: {
    changename (state,preload) { 
      console.log(preload)
      state.age=8
    }, 
  },
  getters:{ 
    name:state=>{
      return state.name
    },
  },
  actions:{ 
    increment1 ({commit}) { 
      commit('changename',900)
    },
  },
  modules:{
    a,
    b,
  }
})

console.log('store',store)
 
export default store;