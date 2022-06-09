<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 13:28:06
-->
<template>
  <div>
  
  <p>ref:{{msg}}</p>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {triggerRef, shallowReactive,shallowRef, reactive,ref,isRef,isReactive} from 'vue';
 
export default {
  name: 'App',
  setup(props) {
    // ref -> reactive 
    // shallowRef -> shallowReactive 
    /**
     * shallowRef 调用了shallowReactive
     */
    let msg = shallowRef({
       a:'2',
        gf:{
          b:'b',
          f:'c',
            c:{
            a:3
          }
        }
    }) 
    function changeRef(){
      console.log("更改内容")
    }
     return {
      msg, 
      changeRef
    }
  }

  
}

</script>
