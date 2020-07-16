<template>
   <Swiper>
       <SwiperItem v-for="item in banners" :key="item.link">
          <a :href="item.link">
             <img :src="item.image" alt="" @load="imageLoad">
          </a>
       </SwiperItem>
    </Swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
   name : "HomeSwiper",
   data() {
      return {
         isLoad: false
      }
   },
   props:{
      // 传递的参数
      banners:{
         type : Array,
         default(){
            return [];
         }
      }
   },
   components:{
       Swiper,
       SwiperItem
   },
   methods:{
      imageLoad(){
         // 防止多次调用 这边和debounce 不一样的
         if(!this.isLoad){ 
           this.$emit("imageLoad")
           this.isLoad=true
         }
      }
   }
}
</script>

<style>

</style>