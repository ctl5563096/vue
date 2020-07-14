<style>
  .el-menu-vertical-demo{
        height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    transition: 1s;
  }
  #iscol{
    display:flex;
    flex-direction:column-reverse;
  }
</style>

<template>
  <el-aside width="initial">
    <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <div id="iscol"><el-button type="primary" icon="el-icon-menu" @click="show()"></el-button></div>
          <el-menu-item index="1" @click="goPage('home')">
            <i class="el-icon-menu"></i>
            <span slot="title">后台中心</span>
          </el-menu-item>

          <el-menu-item index="2" @click="goPage('order')">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试3</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">测试3-1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
  </el-aside>
</template>

<script>
import {getHome} from '../../global/api.js';
var $this = {};
export default {
  data() {
      return {
        isCollapse: false
      };
  },
  beforeCreate() {
    $this = this;
    getHome();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //跳转到某个导航页
    goPage(link) {
      if (link === "home") {
        $this.$router.push("index").catch(error => error);
      } else if ((link = "order")) {
        $this.$router.push("order").catch(error => error);
      }
    },
    // 收起菜单
    show(){
      $this.isCollapse = !$this.isCollapse
    }
  }
};
</script>