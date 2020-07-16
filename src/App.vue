<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import router from 'router'
import MainTabBar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'App',
  router,
  components: {
   MainTabBar
  }
}
</script>

<style>
  @import url('assets/css/base.css');
</style>
