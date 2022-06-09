 
 
<template>
  <div id="app">
    <div>哈哈哈哈哈
     {{$store.state.name}}
    计算属性： {{$store.state.age}}
     getters {{$store.getters.name}} 
     getters {{$store.getters.name}}
     <div>   a 模块的年龄{{$store.state.b.age}}   </div>
     <div>   b 模块的年龄{{$store.state.a.age}}   </div>
     <button @click="changeData">更改名字</button>
     <button @click="$store.commit('changename',333)">更改2222</button>
     <button @click="$store.dispatch('increment1',333)">异步actions</button>
    </div>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import { getters } from '../../../vueComponent/vue-styleguidist/examples/nuxtjs-ts-property-decorator/src/store/mutations';
import { mapGetters,mapState} from './vuex/index';
// import {mapState} from 'vuex'
//获取数值


export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    console.log('App',this.$store)
  },
  computed: {
    ...mapState(['name']),
    ...mapGetters(['myage']),
    age(){
      return  this.$store.state.age;
    }
  },
  methods: {
    changeData(){
      this.$store.state.name ='jjjj'
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
