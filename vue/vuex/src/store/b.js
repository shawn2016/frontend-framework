 

 
export default{ 
  namespaced: true,
  state: {
    age: 0,
    name:'子模块', 
  },
  // mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化
  mutations: {
    changeAge (state,preload) { 
      console.log(preload)
      state.age="yyy"
    }, 
  },
  getters:{ 
    age:state=>{
      return state.age
    },
  },
  actions:{ 
    increment1 ({commit}) { 
      commit('changename',900)
    },
  }
}  