<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 19:12:42
-->
<template>
  <div> 
    <p>姓名：{{name}}</p>
    <p>年龄：{{age}}</p>
    <p>大年龄{{bigname}}</p>
    <button @click="changeName">更改name</button>
    <button @click="changeAge">更改age</button>
    <HelloWorld :name='name' :age='age' v-if="age || name">
      <div>哈哈哈</div>
    </HelloWorld>
  </div>
</template>

<script> 
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, reactive,ref, watch,computed,resolveComponent} from 'vue';
export default {
  components:{
    HelloWorld
  },
  name: 'App',
  data() {
    return {
      name:22, 
    }
  },
  methods: {
    changeName(){
      this.name =  '33'
    }
  },
  beforeCreate() {
    console.log("beforeCreate")
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log("mounted")
  },

  /**
   * 1.setup 的执行时机
   *    setup 执行->beforeCreate -> create
   * 2.setup 的注意点
   *   setup的执行中不能使用data和msg 
   *   只能是同步的 不能是异步的 
   */
  setup(props) {
    console.log("父组件setup 执行")
    let age = ref(33)
    // console.log(this)  // 此时的this 还没有构建完成 是undefined
    function changeAge(){
      age.value += 1
    }
    onMounted(()=>{
      console.log("setup----mounted")
    })
    let bigname = computed(() => age.value * 2)
    watch(age,(newValue,oldValue)=>{
      console.log('age的值发生改变了')
    })
    console.log(resolveComponent('HelloWorld'))
   
    return{
      bigname,
      age,
      changeAge
    } 
  }
}

</script>
