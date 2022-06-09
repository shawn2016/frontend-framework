
<template>
  <div class="item">
    {{item.value}}
  </div>
</template>
<script>
export default {
  props:{
    item:Object,
  }
}
</script>
<style lang="less" scoped>
.item{
  border: 1px solid red; 
  margin: 5px 2px;
}
</style>