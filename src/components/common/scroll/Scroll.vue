<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
   name: 'Scroll',
   props:{
       probeType:{
           type : Number,
           default:0
       },
       pullUpLoad:{
           type:Boolean,
           default: false
       }
   },
   data(){
       return{
           scroll : null
       }
   },
  // 渲染结束
   mounted(){
       // 1 创建对象
       this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
       })
       // 2 监听滚动  判断一下
       if (this.probeType===2 || this.probeType===3){
            this.scroll.on('scroll',(position) =>{
           // 实时监听滚动的位置 将这个当做事件发出
           this.$emit("scroll",position)
         })
       }
      
       // 3监听scroll 滚动到底部 判断一下
       if(this.pullUpLoad){
           this.scroll.on("pullingUp",()=>{
           this.$emit("pullingUp")
        })
       }
   },
   methods:{
       scrollTo(x,y,time=300){
          // this.scroll  这个有值的情况下才进行下面操作  不然会null 或者 undefined调用 refresh 
           this.scroll && this.scroll.scrollTo(x,y,time)
       },
       refresh(){
           this.scroll && this.scroll.refresh()
       },
       finishPullUp(){
           this.scroll && this.scroll.finishPullUp()
       },
       getScrollY(){
           return  this.scroll ? this.scroll.y : 0
       }
   }
}
</script>

<style>

</style>