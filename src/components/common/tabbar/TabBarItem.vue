<template>
     <div class="tar-bat-item" @click="itemClick">
         <div v-if ="!isActive"><slot name="item-icon"></slot></div>
         <div v-else><slot name="item-icon-active"></slot></div>
         <!-- <div :class="{active:isActive}">
             <slot name="item-text"></slot>
         </div> -->
         <!--动态绑定样式 -->
          <div :style="activeStyle">
             <slot name="item-text"></slot>
         </div>
     </div>
</template>

<script>
export default {
    name : 'TabBarItem',
    props:{
        path :String,
        activeColor:{
            type: String,
            default: 'red'
        }
    },
    data() {
        return {
           //  isActive: true
        }
    },
    computed: {
        isActive(){
            // 判断当前的活跃路由和传入的path 是不是一样的 
            return  this.$route.path.indexOf(this.path) !==-1
        },
        activeStyle(){
            return  this.isActive ? {color :this.activeColor} : {}
        }
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    },
}
</script>

<style>

 .tar-bat-item{
       flex: 1;
       text-align: center;
       height: 49px;
       font-size: 14px;
  }
  .tar-bat-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;

  }
  /* .active{
      color: red;
  } */

</style>