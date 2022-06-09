<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-19 09:20:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-19 09:52:49
-->
<template>
  <div>
    <p>{{state.count}}</p> 
    <button @click="changeCount">增加</button>
  </div>
</template>
<script>
import {computed, ref,reactive,watchEffect,watch} from 'vue'
export default {
  setup(props) {
     
     const state = reactive({ count: 0 }) 
     watch(
       ()=>state.count,
       (count,preCount)=>{
        //  console.log('%c count的值发生修改了','csolor:yellow','count='+count,' preCount='+preCount)
       }
     ) 
     let name = ref('myy')
     let age = ref(22)
     watch([name,age],([name,age],[prevName,prevAge])=>{
       console.log("%c --姓名和年龄更改--",'color:yellow')
       console.log("%c 姓名更改",'color:green','prevName='+prevName,' name='+name )
       console.log("%c 年龄更改",'color:green','prevAge='+prevAge,' age='+age )
     })
     function changeCount(){
       name.value = 'myyyyy'
       age.value +=1  
     }
     return {
       state,
       changeCount
     }
  }
}
</script>