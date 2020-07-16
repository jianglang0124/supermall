import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

Vue.config.productionTip = false
// 使用事件总线的方式  设计非 子父组件的通信 选择 时间总线
//  1 Vue.prototype.$bus = new Vue()
//  2 this.$bus.$emit("事件名称",参数)
//  3 this.$bus.$on("事件名称",回调函数(参数))
Vue.prototype.$bus = new Vue();

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  render: h => h(App),
}).$mount('#app')
