<template>
    <Swiper class="swiper-detail">
        <SwiperItem v-for="item in topImages" :key="item">
            <img :src="item" alt="" @load="imgLoad">
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
    methods:{
        imgLoad(){
             this.$emit('imgLoad');
        }
    },
    components:{      
    Swiper,
    SwiperItem
   },

}
</script>

<style scoped>
.swiper-detail{
    height:300px ;
    overflow: hidden;
}
</style>