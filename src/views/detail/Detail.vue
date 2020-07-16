<template>
     <div id="detail">
         <DetailNavBar class="detail-nav"/>
         <Scroll class="content" ref="Scroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goodsInfo="goods" />
            <DetailShopInfo :shop="shop" />
            <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo :paramInfo="paramInfo"/>
            <DetailCommentInfo :commentInfo ="commentInfo"/>
         </Scroll>
     </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam}  from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

export default {
   name : 'Detail',
   data() {
       return {
           iid: null,
           topImages:[],
           goods:{},
           shop:{},
           detailInfo:{},
           paramInfo:{},
           commentInfo:{}
       }
   },
   components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       Scroll,
       
   },
   created(){
       this.getDetailData();
   },
   methods:{
        imageLoad(){
           // 图片加载完成 执行一次刷新
          // this.$refs.Scroll.refresh()
          console.log("刷新了。。。。");
         this.$refs.Scroll.refresh()
        },
       getDetailData(){
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
        //   // 获取商品详情的信息
          this.detailInfo = data.detailInfo
          // 获取参数
          this.paramInfo =  new GoodsParam(data.itemParams.info,data.itemParams.rule)
          // 获取评论
          if(data.rate.list){
             this.commentInfo = data.rate.list[0]
          }

        }
      )
    },
     
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
     /*  这个直接相对定位不是很懂 */
  .detail-nav{
      position: relative;
      z-index: 9;
      background-color: #fff;
  }
  .content{
      /*  父亲没有固定高度 是内容撑起来的 */
      height: calc(100% - 44px);
  }
</style>