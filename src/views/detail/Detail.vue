<template>
     <div id="detail">
         <DetailNavBar class="detail-nav"/>
         <scroll class="content" ref="Scroll">
            <DetailSwiper :topImages="topImages"/>
            <DetailBaseInfo :goodsInfo="goods" />
            <DetailShopInfo :shop="shop" />
            <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo :paramInfo="paramInfo"/>
            <DetailCommentInfo :commentInfo ="commentInfo"/>
            <GoodsList :goods="recommendList"/>
         </scroll>
     </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import {debounce} from 'common/until'
import {itemListenerMixin} from 'common/mixin'

import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend}  from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'

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
           commentInfo:{},
           recommendList:[],
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
       GoodsList,
       Scroll,
   },
   created(){
          //1、保存传入的iid
         this.iid = this.$route.params.iid;
          // 2 获取商品的详情
          getDetail(this.iid).then(res =>{
           console.log(res);
           const data = res.data.result
          this.topImages= data.itemInfo.topImages
           // 获取商品的信息
          this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //  获取商家的信息
          this.shop = new Shop(data.shopInfo)
           // 获取商品详情的信息
          this.detailInfo = data.detailInfo
          // 获取参数
          this.paramInfo =  new GoodsParam(data.itemParams.info,data.itemParams.rule)
          // 获取评论
          if(data.rate.list){
             this.commentInfo = data.rate.list[0]
          }
      }),
      // 3 获取推荐的商品
      getRecommend().then(res =>{
        console.log(res);
        const data = res.data.data
        this.recommendList = data.list
      }) 
   },
  // 公共部分的使用    
   mixins: [itemListenerMixin],
   mounted(){
      console.log("我是mounted");
   },
   methods:{
        // 监听详情数据的加载完成
        imageLoad(){
          // 这边可以使用防抖的函数
           // this.$refs.Scroll.refresh()
           this.newRefresh();
        },
   },
   destroyed(){
     // 不是keeplive的 离开组件的时候调用 destory
     this.$bus.$off("itemimageLoad",this.itemImgListener)
   }
}
</script>

<style scoped>
   /* 这边style 这边要加上scoped  vs的快捷键没有 我没加这个样式乱了 调了一天  */
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
    /* position: absolute;
    top: 44px;
    bottom: 60px; */
    /* position: relative;
    height: calc(100vh - 93px);
    overflow: hidden;   */
 }
</style>