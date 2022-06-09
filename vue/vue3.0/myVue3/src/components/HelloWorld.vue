<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 19:23:23
-->
<template>
 <div>
   HelloWorld
   <button @click="getName">获取名字</button>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  emits:{
   // 没有验证函数
    click: null,
    getName(){
      console.log(2)
      //必须返回true或者false才能判断是正确还是错误
      return true;
    }
  },
  props:{
    name:'',
    age:{
      required: true,
      validator: value => {
        return value < 0
      }
    }
  },
  methods: {
    getName(){
      this.$emit('getName')
    }
  },
  setup(props,context) {
   console.log("子组件的 setup")
   console.log(props)  
    // Attribute (非响应式对象)
    console.log(context.attrs) 
    // 插槽 (非响应式对象)
    console.log(context.slots) 
    // 触发事件 (方法)
    console.log(context.emit) 
  }
}
</script>
