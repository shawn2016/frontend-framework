<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 17:36:24
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
  */
export default {
  name: 'App',
  setup(props) { 
   let obj = {age:34,name:'mfy'}
   /**
    * 1.ref 本质还是reactive 增加value的对象
    */
   let state =ref(obj);
   // 如果通过toRaw 获取ref的数据，必须明确告诉toRaw是.value的值
   // 经过Vue处理之后，.value中保存的是当初创建时传入的那个原始数据
   let obj2 = toRaw(state.value)
   let obj3 = markRaw(state) 
   function changeRef(){
     console.log('toRaw',obj2)
     console.log(state)
     console.log('markRaw',obj3) 
   }
   return{
     state, 
     changeRef
   }
  }

  
}

</script>
