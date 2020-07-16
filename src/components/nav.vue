<style>
  .el-menu-vertical-demo{
        height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
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
          background-color="#3C3C3C"
          text-color='white'
          class="el-menu-vertical-demo"
          unique-opened='true'
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <div id="iscol"><el-button type="primary" icon="el-icon-menu" @click="show()"></el-button></div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
            <span slot="title">用户中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goPage('order')">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-2" @click="goPage('order')">用户注册</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-coordinate"></i>
            <span slot="title">权限中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goPage('order')">角色列表</el-menu-item>
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