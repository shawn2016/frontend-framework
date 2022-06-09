
<template>
  <div class="heeko">
    <!-- varlable表示这个高噢度不一定多高噢 -->
    <virtalList :size=40 :remain=8 :items="items" :varlable=true>
      <!-- 获得scope的数据 -->
      <itemL slot-scope="{item}" :item="item"></itemL> 
    </virtalList>
  </div>
</template>
<script>
import virtalList from '../components/virtual-list.vue'
import itemL from '../components/item.vue'
import Mock from 'mockjs'
let  items  =[];
for(var i=0;i<500;i++){
  items.push({id:i,value:Mock.Random.sentence(5,50)})
}
export default {
  components:{
    virtalList,
    itemL
  },
  data(){
    return{
      items:items
    }
  }
}
</script>
<style lang="less" scoped>

</style>