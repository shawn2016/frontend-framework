<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-19 08:38:25
-->
<template>
  <div> 
   <p>{{state.name}}</p>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {ref,toRaw,reactive,markRaw} from 'vue';
 /**
  * markRaw 永远不想被追踪
  * 对不被追踪的对象增加 __v_skip
  */
export default {
  name: 'App',
  setup(props) { 
   let obj = {age:34,name:'mfy'}
   //告诉这个对象 永远不能被监听
   obj = markRaw(obj)
   console.log(obj) 
   let state =reactive(obj);  
   function changeRef(){
     state.name ='mfy';//监听到这个的变化
     console.log(state)
   }
   return{
     state, 
     changeRef
   }
  }

  
}

</script>
