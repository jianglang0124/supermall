<template>
     <div id="detail">
         <DetailNavBar class="detail-nav"/>
         <Scroll class="content">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goodsInfo="goods" />
            <DetailShopInfo :shop="shop" />
         </Scroll>
     </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop}  from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
export default {
   name : 'Detail',
   data() {
       return {
           iid: null,
           topImages:[],
           goods:{},
           shop:{},
       }
   },
   components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll
   },
   created(){
       console.log(this.$route.params.iid);
       this.iid = this.$route.params.iid

       getDetail(this.iid).then(res =>{
           console.log(res);
           const data = res.data.result
           this.topImages= data.itemInfo.topImages

           // 获取商品的信息
          this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          // 获取商家的信息
          this.shop = new Shop(data.shopInfo)
       })

   }
}
</script>

<style scoped>
  #detail{
      position: relative;
      
      z-index: 9;
      background-color: #fff;
      /* 这是这个 视窗高度 */
      height: 100vh;
  }
  /* 这边的东西是为看不让导航栏往上走 */
  .detail-nav{
      /*  这个直接相对定位不是很懂 */
      position: relative;
      z-index: 9;
      background-color: #fff;
  }
  .content{
      /*  父亲没有固定高度 是内容撑起来的 */
      height: calc(100% - 44px);
  }
</style>