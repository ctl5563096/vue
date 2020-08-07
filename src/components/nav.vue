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
          :unique-opened="is_unique"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <div id="iscol"><el-button type="primary" icon="el-icon-menu" @click="show()"></el-button></div>
          <template v-for="(item,index) in menuLists" >
            <!-- 有子菜单 -->
            <el-submenu :index="`${index+1}`" v-if="item.childNode" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.rule_name}}</span>
              </template>
              <template v-for="(item2,index2) in item.childNode">
                <!-- 二级菜单有子菜单 -->
                <el-submenu :index="`${index+1}-${index2+1}`" v-if="item2.childNode"  :key="item2.id">
                  <template slot="title">
                    <i :class="item2.icon"></i>
                    <span slot="title">{{item2.rule_name}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item v-for="(item3,index3) in item2.childNode" :index="`${index+1}-${index2+1}-${index3+1}`" :key="index3.id" @click="goPage(item3.url)">
                    <span slot="title">{{item3.rule_name}}</span>
                  </el-menu-item>
                </el-submenu>
              <!-- 二级菜单无子菜单 -->
                <el-menu-item :index="`${index+1}-${index2+1}`" v-else-if="!item2.childNode" @click="goPage(item2.url)"  :key="item2.id">
                  <i :class="item2.icon"></i>
                  <span slot="title">{{item2.rule_name}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <!-- 无子菜单 -->
            <el-menu-item v-else-if="!item.childNode" :index="`${index+1}`"  @click="goPage(item.url)" :key="item.id">
              <i :class="item.icon"></i>
              <span slot="title">{{item.rule_name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
  </el-aside>
</template>

<script>
import {getHome,getUserInfo,getMenuById} from '../../global/api.js';
var $this = {};
export default {
  data() {
      return {
        isCollapse: true,
        is_unique:  true,
        userInfo:'',
        menuLists:[]
      };
  },
  beforeCreate() {
    $this = this
  },
  created(){
    // 菜单赋值 从vuex里面取
    this.menuLists = this.$store.state.menuLists;
  },
  mounted(){

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
      $this.$router.push(link).catch(error => error);
    },
    // 收起菜单
    show(){
      $this.isCollapse = !$this.isCollapse
    },
  }
};
</script>