<template>
<div id="home">
    <nav-bar class="home-nav">
       <div slot="center">购物街</div>
    </nav-bar>

    <Scroll class="content" ref="Scroll" :probe-type="3" @scroll="scrollClick"
     :pull-up-load="true" @pullingUp="loadMore">
         <HomeSwiper :banners="banners" @imageLoad="imageLoad"></HomeSwiper>
         <RecommendView :recommends="recommends"></RecommendView>
         <feature-view/>
         <TabControl :titles="['流行','新款','精选']"  @tabClick="tabClick"
          ref="tabControl"></TabControl>
         <GoodsList :goods ="showGoods" ></GoodsList>
    </Scroll>
    <!-- 组件的点击事件 要 加上 native 才能进行监听 -->
   <BackTop @click.native="BackClick" v-show="isShowBackTop"></BackTop>
    

   
</div>
</template>

<script>
import HomeSwiper from './childcomps/HomeSwiper'
import RecommendView from './childcomps/RecommendView'
import FeatureView from './childcomps/FeatureView'
import GoodsList from 'components/content/goods/GoodsList'

import NavBar  from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import BackTop  from 'components/content/backtop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/until'
export default {
   name : 'Home',
   components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      NavBar,
      TabControl,
      Scroll,
      BackTop

   },
   data(){
       return {
          banners:[],
          recommends:[],
         //  数据的模型
          goods:{
             "pop": { page:0, list:[]},
             "new":{ page:0, list:[]},
             "sell":{ page:0,list:[]},
          },
          currentType:'pop',
          isShowBackTop :false,
          tabOffsetTop: 0,
          saveY:0
       }
   },
   created(){
    
       //1 请求多个数据
      this.getHomeMultidata();
      // 2 获取首页的商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell'); 
      // 3 监听item 图片加载完成 事件总线  放在这边有问题   this.$refs.Scroll 这个对象可能会拿不到
      // this.$bus.$on("itemimageLoad",()=>{
      //    console.log("itemimageLoad");
      //    this.$refs.Scroll.refresh();
      // })
   },
   destroyed() {
   //   console.log("destroyed")
   },
   //  组件活跃的时候
   activated(){
    this.$refs.Scroll.scrollTo(0,this.saveY,0)
    // 这边最后refresh 一下
    this.$refs.Scroll.refresh()
   },
   // 组件离开的时候
   deactivated(){
     this.saveY = this.$refs.Scroll.getScrollY()
   },
   mounted(){
      // 还是解决不了这个 refresh 问题
      // 1 图片的加载完成
      const refresh= debounce( this.$refs.Scroll.refresh,200)
      this.$bus.$on("itemimageLoad",()=>{
           refresh()
      })
      //  必须知道滚动到多少的时候 才开始吸顶 
      // 拿到 offsetTop  这边获取是不正确的 以为这边还没有将图片计算在内
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop );
      
   },
   computed:{
      //  计算属性 避免dom 的表达式过长
      showGoods(){
        return this.goods[this.currentType].list
      }
   },
   methods:{
      // 事件监听相关的 代码
      imageLoad(){
         // 通过 el 来去 组件的元素
         this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
         console.log(this.tabOffsetTop );
      },
     

      tabClick(index){
        switch(index){
           case 0:
             this.currentType='pop'
             break
           case 1:
              this.currentType='new'
              break
            case 2:
               this.currentType='sell'
               break
        }
      },
       BackClick(){
            //   位置 多少毫秒数回到顶部
            this.$refs.Scroll.scrollTo(0,0)
      },
      scrollClick(position){
         this.isShowBackTop = (-position.y) >1000
         //  console.log(position);
          
      },
      loadMore(){
         // console.log("loadMore");
         this.getHomeGoods(this.currentType)
      },

       //  网络请求相关的的接口
       getHomeMultidata(){
         getHomeMultidata().then(res =>{
         this.banners = res.data.data.banner.list;
         this.recommends = res.data.data.recommend.list;
         //  console.log(this.recommends);
      })
      },     
      getHomeGoods(type){
           const page =this.goods[type].page +1;
           getHomeGoods(type,page).then(res=>{
               // console.log(res.data.data);
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page +=1
            //  完成一次上拉加载更多
           this.$refs.Scroll.finishPullUp();
           })
      },
     
   }
}
</script>
<style scoped>
   #home{
      padding-top:  44px;
      height: 100vh;

      position: relative;
   }
   .home-nav{
      background-color: var(--color-tint);
      color: #fff;

      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9;

   }
   /* 粘滞效果 */
   .tab-control{
      
      position: sticky;
      top: 44px;
      z-index: 9;
   } 
   .content{
      overflow: hidden;

      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
   }
    /* .content{
     height: calc(100% - 93px);
     overflow: hidden;
     margin-top: 44px;

   } */
</style>