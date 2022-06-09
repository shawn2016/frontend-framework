<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 17:17:27
-->
<template>
  <div> 
   <p>{{state}}</p>
   <p>{{state2}}</p>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {ref,toRef,toRefs,reactive,markRaw} from 'vue';
 /**
  * 1.toRef 永远不想被追踪 
  *  出现的原因
  */
export default {
  name: 'App',
  setup(props) { 
   //只将对象中的name变成响应式数据
   let obj = {age:34,name:'mfy'} 
   /**
    * 赋值关系 无其他的引用关系
    * ref(obj.name) ->ref('mfy) ->reactive({value:'mfy})
    */
   let state =ref(obj.name);

   /** tips:
    * ref 是复制 修改响应式的数据不会影响到以前的数据
    * toRef 是引用  修改响应式是会影响以前的数据
    * ref 数据发生改变 ui自动更新
    * toRef 数据发生改变，界面不会自动更新
    * 
    * toRef的应用场景
    * 如果想让响应式数据和以前的数据关联起来，并且更新响应式但是不想更新ui
    */


   
   //把obj中的name来进行响应式的
    
   let obj1 = {age:34,name:'mfy'} 
   let state2 = toRef(obj1,'name')
   //定义多个属性为响应式   
   let state3 = toRefs(obj1,'name','age')   
  
   function changeRef(){
     
     //更改值 此时值的修改是不会改变的
     state.value ='myy';
     
     /**
      * 利用ref将对象中的某个属性变成响应式的数据，
      * 我们修改响应式的数据是不会影响到原始数据的
      */
     console.log('obj',obj) 
     console.log('state',state)


     //---toRef
     /**
      * 结论 利用toRef将某一个对象的属性变成响应式的，此时修改是会影响到原响应式的
      *     如果响应数据是通过toRef变化的，是不会触发页面更新的
      */
     state2.value = 333
     console.log('obj1',obj1)
     console.log('state2',state2)


     // torefs ---
     state3.age.value = '333'
     state3.age.name = '333' 

   }

   return{
     state2,
     state, 
     changeRef
   }
  }

  
}

</script>
