<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html{
    height: 100%;
    background: linear-gradient(45deg,rgba(254,172,94,0.5),rgba(199,121,208,0.5),rgba(75,192,200,0.5));
  }
</style>
