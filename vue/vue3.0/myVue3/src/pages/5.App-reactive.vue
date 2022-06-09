<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 16:22:59
-->
<template>
  <div>
    <p>
      姓名：{{state.msg.name}}
      名字：{{state.msg.age}}
      时间：{{state.time}}
    </p> 
    <button @click="changeName">更改名字</button>
    <ul>
      <li v-for="(item,index) in state.list" :key="index">{{item.name}}</li>
    </ul>
 </div>
</template>

<script> 
import { reactive,ref} from 'vue';
/**
 * 1.什么是reactive
 *   - reactive 是vue3中提供实现响应式数据的方法
 *   - vue2中响应式数据是通过defineProperty来实现的，而在vue3中响应式数据是通过es6的Proxy来实现的
 * 2.reactive注意点
 *   - reactive的参数必须是对象（json/arr)
 *   - 如果给rective 传递了其他的对象
 *    +   默认情况下修改对象不会自动更改
 *    + 如果想更新，可以通过重新赋值的方式
 */
export default {
  name: 'App',
  setup(props) {
     let state =reactive({
        msg:{
          name:'mafe',
          age:24, 
        },
        time: new Date(),
        list:[
          {name:'mfy'},
          {name:'mfy1'},
          {name:'mfy2'},
        ]
     })
     function changeName(){
       console.log(state)
       state.msg.name = '333'
        //无法更改state中time的赋值对象 
        // state.time.setDate(state.time.getDate()+1)
       let newDate =new Date(state.time.getTime())
       newDate.setDate(state.time.getDate()+1) 
       state.time = newDate 
     }
     return  {
       state,
       changeName
     }
  }
  
}

</script>
