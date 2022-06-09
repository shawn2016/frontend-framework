<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 16:48:14
-->
<template>
  <div>
  
   <p>reactive:{{state}}</p>
   <p>ref:{{msg}}</p>
   <button @click="changeValue">更改年龄</button>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {triggerRef, shallowReactive,shallowRef, reactive,ref,isRef,isReactive} from 'vue';
/**
 * 1.递归监听
 *   无论是ref还是reactive的都是递归监听的过程
 * 2.递归监听存在的问题
 *   如果数据量比较大，是非常消耗性能的
 * 3.非递归监听
 *   就是不需要进行非递归监听的内容直接shallowReactive进行
 *   - 只有第一层被包装，第二层未被包装；
 *   - 第一层的数据发生改变，第一层的ui也会变化
 *   - 第二层的数据修改，但是不会更新ui
 *   - shallowRef Vue监听的是.value的变化，并不是第一层的变化
 */
export default {
  name: 'App',
  setup(props) {
    // let state = reactive({
    //   a:'2',
    //   gf:{
    //     b:'b',
    //     f:'c',
    //     c:{
    //       a:3
    //     }
    //   }
    // })
    //只有当value进行变化时候才能获取
     let state = shallowReactive({
      a:'2',
      gf:{
        b:'b',
        f:'c',
        c:{
          a:3
        }
      }
    })
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
    // 多个层级 每个层级内容改变的时候，都会改变；
    function changeValue(){
      console.log(state)
      console.log(state.gf)
    }
    function changeRef(){
      //直接更改ref
      // msg.value= {
      //    a:'mfy',
      //     gf:{
      //       b:'hhaha',
      //       f:'c333',
      //         c:{
      //         a:3
      //       }
      //     }
      //  }
        console.log(msg)
      console.log(msg.value)
      console.log(msg.value.gf)
      // 只想更改ref中某一层的变化
      msg.value.a = 'myy'
      //增加triggerRef 引起视图的更新 
      // Vue3 只提供了triggerRef 没有提供reactRef相关的
      triggerRef(msg)
    }
     return {
       msg,
      state,
      changeValue,
      changeRef
    }
  }

  
}

</script>
