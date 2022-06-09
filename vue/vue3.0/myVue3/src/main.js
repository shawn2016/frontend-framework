/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-24 09:40:04
 */
import { createApp } from 'vue'
// import App from './4.App-ref.vue'
import App from  './11.App-toRaw.vue'

import './index.css'

const app = createApp(App)
// console.log(app.config)

app.mount('#app')

// const appDemp = createApp({
//   data(){
//     return {
//       name:'mfy'
//     }
//   },
//   methods:{
//     changeName(){
//       console.log(this)
//     }
//   }, 
// },{name:'444'})
// console.log(appDemp)

// import './index.demo.js'
