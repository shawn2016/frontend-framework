<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-19 09:20:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-19 09:58:52
-->
<template>
  <div>
    <p>{{fullName}}</p>
    <p>{{ageCom}}</p>
    <button @click="changeName">更改名字</button>
  </div>
</template>
<script>
import {computed, ref,watchEffect} from 'vue'
export default {
  setup(props) {
    
     let firstName = ref("马");
     let lastName = ref("fyy") 
     let fullName = computed(()=> firstName.value + lastName.value) 
     watchEffect(() => { 
       console.log('%c 内容发生改变了','color:yellow',fullName.value)
     })
     
     let age = ref(12)
     let ageCom = computed({
          get: () => age.value + 1,
          set: val => {
            age.value = val - 1
          }
     })
     
     function changeName(){
       firstName.value = 'Ming'+Math.random()   
     }
     return {
       fullName,
       changeName,
       ageCom,
     }
  }
}
</script>