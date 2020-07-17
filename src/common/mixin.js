import {debounce} from './until'
//  公共部分的抽取  混入
export const itemListenerMixin = {

 data() {
     return {
        itemImgListener:null,
        //  定义变量保存状态
        newRefresh:null    
     }
 },
 mounted() {
    this.newRefresh = debounce(this.$refs.Scroll.refresh,100)
    this.itemImgListener = ()=>{
      this.newRefresh()
   }
    this.$bus.$on("itemimageLoad",this.itemImgListener)
    console.log("我是混入的内容");
   },   
}