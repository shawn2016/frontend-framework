
<template>
  <!-- 能滚动的盒子 -->
  <div class="viewport" ref="viewport" @scroll="handlScroll">
    <!-- 滚动条 -->
    <div class="scroll-bar" ref="scrollbar"></div>
    <!-- 列表位置 -->
    <div class="scroll-list" :style="{transform:`translate3d(0,${offset}px,0)`}">
      <div v-for="(item) in visibleData" ref="items" :key="item.id" :vid="item.id">
        <!-- 通过插槽传出去 -->
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    size: Number, //当前每一项的高度
    remain: Number, //可见多少个
    items: Array, //当前项目
    varlable: Boolean,
  },
  data() {
    return {
      start: 0,
      end: this.remain, //默认现实
      offset: 0,
    };
  },
  computed: {
    //前面预留几个
    prevCount() {
      return Math.min(this.start, this.remain);
    },
    //后面预留几个
    nextCount() {
      return Math.min(this.remain, this.items.length - this.end);
    },
    //可见数据有哪些
    visibleData() {
      let start = this.start - this.prevCount;
      let end = this.end + this.nextCount;
      return this.items.slice(start, end);
    },
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + "px";
    this.$refs.scrollbar.style.height = this.items.length * this.size + "px";
    //加载完毕，需要缓存每一项目的高度
    this.cacheList(); //先记录好，等重新滚动的时候再次记录高度，更新内容
    //2.在重新计算滚动条高度
  },
  updated() {
    //页面渲染完成后需要根据当前展示的数据，更新缓存区的内容
    this.$nextTick(()=>{
      //根据当前显示的，更新缓存中的height、bottom\top 最终更新滚动体哦的高度
      //获取当前可视化区域的item对应的值
      let nodes = this.$refs.items; 
      if(!(nodes && nodes.length>0)){
        return ;
      }
      //遍历当前所在节点信息，
      nodes.forEach(node=>{
        //获取当前items的真实高度
        let {height} = node.getBoundingClientRect();//真实高度 
        let id =  node.getAttribute('vid')-0; //获取当前的item的位置，id表示index
        let oldHeight = this.positions[id].height; //老的高度 
        let val = oldHeight - height; //高度差值 
        //如果当前元素存在高度差值，则当前高度需要进行增加/减少，这样，当前元素的后面元素的表示位置也需要在原高度上进行更改
        if(val){
          //当前节点的高度进行更新
          this.positions[id].height = height;
          this.positions[id].bottom = this.positions[id].bottom - val ;//底部增加了
          //将后续的所有人都向后移动
          for(let i = id+1;i<this.positions.length;i++){
            this.positions[i].top = this.positions[i-1].bottom; 
            this.positions[i].bottom = this.positions[i].bottom- val;
           } 
        } 
      })
      //动态的计算滚动条的高度 
      this.$refs.scrollbar.style.height = this.positions[this.positions.length-1].bottom +'px'
    })
  },
  methods: {
    //缓存当前的高度，top志等信息，还有bottom
    cacheList() {
      this.positions = this.items.map((item, index) => {
        return {
          height: this.size,
          top: index * this.size,
          bottom: (index + 1) * this.size,
        };
      });
    },
    //查找当前滚动的具体值
    getStartIndex(value){
       let start = 0; //开始
       let end  = this.positions.length -1;//结束位置
       let temp = null; //记录当前的高度临时值
       //当开始位置小于结束的位置的时候，就一直往下找 ----todo
       while(start <= end){
         //找到中金的位置
         let middleIndex = parseInt((start+end)/2);
         //中间位置bottom位置
         let middleValue = this.positions[middleIndex].bottom;
        //如果当前的middleValue与value相等，则可进行
         if(middleValue ==value){
            return middleIndex +1; 
         }else if(middleValue <value){//当前要查找的在右边 
            start = middleIndex+1 
         }else if(middleValue >value){ //当前要查找的在左边 
        //  temp为存储的临时数据 如果不存在middleValue == value的时候 返回这个临时的数据
           if(temp == null || temp > middleIndex){
             temp = middleIndex //找到范围
           }
           end = middleIndex -1; 
         } 
       }
        return temp;  
    },
    updataPosition(){

    },
    handlScroll() {
      //1.先算出当前从第几个开始显示
      let scrollTop = this.$refs.viewport.scrollTop;
      if (this.varlable) {
        //要使用二分查找方法进行查找
        this.start = this.getStartIndex(scrollTop)
        this.end = this.start +this.remain;
        //设置偏移量
        this.offset = this.positions[this.start - this.prevCount] ?
        this.positions[this.start-this.prevCount].top:0
        console.log(this.offset)
        
      } else {
        //2. 当前滚动的标识
        this.start = Math.floor(scrollTop / this.size);
        this.end = this.start + this.remain;
        //定位当前的可视区域
        //让可是区域去调整偏移
        //如果前面有预留渲染，应该把这个位置向上移动
        this.offset = this.start * this.size - this.prevCount * this.size;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.viewport {
  overflow-y: scroll;
  position: relative;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>