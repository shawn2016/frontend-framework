/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-18 19:04:45
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 19:07:51
 */
import { defineComponent,ref,defineAsyncComponent } from 'vue'
const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
console.log(MyComponent)

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
console.log(HelloWorld)
