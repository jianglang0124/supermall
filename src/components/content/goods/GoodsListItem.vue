<template>
    <div class="goods-item">
         <img :src="showImage" alt="" @load="imageLoad" @click="imageClick(goodsItem.iid)">
         <div class="goods-info">
             <p>{{goodsItem.titles}}</p>
             <span  class="price">{{goodsItem.price}}</span>
             <span class="collect">{{goodsItem.cfav}}</span>
         </div>
    </div>
</template>

<script>
export default {
    name : 'GoodsListItem',
    props:{
        goodsItem:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    computed:{
      //  图片的取值会不同 这边搞一个计算的属性
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
           //图片加载完 采用 时间总线的方法 发出事件
           this.$bus.$emit("itemimageLoad")
      },
      imageClick(iid){
        // 进行跳转
        this.$router.push('/detail/'+iid)
      }
     
      
    }
}
</script>

<style scoped>
/* .goods-item{
    padding-bottom: 40px;
} */

  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>