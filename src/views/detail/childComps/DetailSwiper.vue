<template>
    <Swiper class="swiper-detail">
        <SwiperItem v-for="item in topImages" :key="item">
            <img :src="item" alt="">
        </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name : 'DetailSwiper',
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            },
        }
    },
    components:{      
    Swiper,
    SwiperItem
   },

}
</script>

<style>
.swiper-detail{
    height:300px ;
    overflow: hidden;
}
</style>