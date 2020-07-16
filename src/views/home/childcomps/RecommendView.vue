<template>
  <div class="recommond">
      <!-- 包一个div  来循环-->
        <div v-for="item in recommends" :key="item.link" class="recommond-item">
           <a :href="item.link">
          <img :src="item.image" alt="">
         </a>
         <div>{{item.title}}</div>
        </div>
  </div>
</template>

<script>
export default {
   name : "RecommendView",
   props:{
       recommends:{
           type : Array,
           default(){
               return [];
           }
       }
   }
}
</script>
  
<style>
.recommond{
    
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 18px;
    border-bottom: 10px solid #eee;

}
.recommond-item{
    flex:1;
}
.recommond-item img{
    width: 70px; 
    height: 70px;
    margin-bottom: 10px;
}
</style>