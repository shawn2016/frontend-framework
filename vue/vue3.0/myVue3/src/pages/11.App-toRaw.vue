<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-25 11:49:29
-->
<template>
  <div> 
   <p>{{state.name}}</p>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {ref,toRaw,reactive} from 'vue';
/**
 *  1.toRaw 
 *   从reactive或者ref中得到原始数据
 *  2.toRaw的作用
 *   做一些不想被监听的事情（提升性能）
 */
export default {
  name: 'App',
  setup(props) {

   /*
    *  ref/reactive数据类型的特点：
    *  每次修改都会被追踪，都会被更新UI界面，但是是非常消耗性能的，所以有一些操作我们不需要追踪，不需要更新ui洁面
    *  此时可以通过 toRaw方法拿到原始数据，对原始数据进行修改，这样不会被追踪，不会更新ui界面
    *
    */

   //使用reactive的特性进行定义响应式
    //默认情况下不是一个响应式数据
   let obj = {age:34,name:'mfy'} 
   let state  =ref(obj); 
   //把创建时候的参数分解出来
   let obj2 = toRaw(state.value); // 和obj是一个样子
   function changeRef(){ 
      obj2.name = 'myy'   
      console.log('state',state)
      console.log('obj',obj) 
      console.log('obj2',obj2) 
   } 
   return{
     state, 
     changeRef
   }
  }
}
</script>
