<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name ="center"></slot>
        </div>
        <div class="right">
            <slot name= "right"></slot>
        </div>
    </div>

</template>

<script>
export default {
   name : 'NavBar'
}
</script>

<style>
   .nav-bar{
       display: flex;
       line-height: 44px;
       height: 44px;
       box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.2);
       /* background-color: pink;  不要这这里写背景颜色 去具体用到的地方写 */
   }
   .right, .left{
        /* flex :1; */
       width : 60px;
        /* background-color: red; */
   }
   .center{
       flex: 1;
       /* background-color: blue; */
       text-align: center;
       /* color: wheat; */
   }

</style>