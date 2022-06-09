<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 16:59:56
-->
<template>
  <div> 
    <p ref="box">我是Vue3.0元素</p>
   
    <button @click="getDom">获取vue3.0元素</button>
    <p ref="box2">我是Vue2.0元素</p>
    <button @click="getDomVu2">获取vue2.0元素</button>
    <ul>
     <li v-for="(item,index) in state" :key=index>{{item.name}}</li> 
    </ul>
  </div>
</template>

<script> 
import {ref,toRef,customRef, toRefs,reactive,markRaw, onMounted} from 'vue';
 /**
  * 1.customRef 
  *  返回ref对象，可以显示的控制依赖追踪和触发响应
  */
 
export default {
  name: 'App',
  methods: {
    getDomVu2(){
      console.log(this.$refs.box2)
    }
  },
  //setup是一个同步的函数 不能是异步的函数
  setup(props) { 
    let state = ref([])
    let box = ref(null);// 不会立即执行 所以要在后面进行执行
    //里面进行获取生命周期
    onMounted(()=>{
      console.log('onMounted',box)
    })
    function getDom(){
      console.log(box)
      console.log(box.value)
    }
   
    return{ 
      box,
      state,
      getDom
    }
  }

  
}

</script>
