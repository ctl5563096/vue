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
            <el-submenu :index="`${index+1}`" v-if="item.childNode && item.childNode.length > 0" :key="item.id">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">{{item.menuName}}</span>
              </template>
              <template v-for="(item2,index2) in item.childNode">
                <!-- 二级菜单有子菜单 -->
                <el-submenu :index="`${index+1}-${index2+1}`" v-if="item2.childNode && item2.childNode.length > 0"  :key="item2.id">
                  <template slot="title">
                    <span slot="title">{{item2.menuName}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item v-for="(item3,index3) in item2.childNode" :index="`${index+1}-${index2+1}-${index3+1}`" :key="index3.id" @click="goPage(item3.url)">
                    <span slot="title">{{item3.menuName}}</span>
                  </el-menu-item>
                </el-submenu>
              <!-- 二级菜单无子菜单 -->
                <el-menu-item :index="`${index+1}-${index2+1}`" v-else-if="item2.childNode || item2.childNode.length === 0" @click="goPage(item2.url)"  :key="item2.id">
                  <span slot="title">{{item2.menuName}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <!-- 无子菜单 -->
            <el-menu-item v-else-if="item.childNode || item.childNode.length === 0" :index="`${index+1}`"  @click="goPage(item.url)" :key="item.id">
              <i class="el-icon-user"></i>
              <span slot="title">{{item.menuName}}</span>
            </el-menu-item>
          </template>
          <!-- <el-submenu index="1">
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
              <el-menu-item index="2-1" @click="goPage('order')">角色列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
  </el-aside>
</template>

<script>
import {getHome,getUserInfo,getMenuById} from '../../global/api.js';
var $this = {};
export default {
  data() {
      return {
        isCollapse: false,
        is_unique:  true,
        userInfo:'',
        menuLists:[],
        // menuLists: [
        //     {
        //       id:1,
        //       menuName:'1',
        //       url: 'order',
        //       childNode:[

        //       ]
        //     },
        //     {
        //       id:2,
        //       menuName:'233',
        //       childNode:[
        //         {
        //           id:3,
        //           menuName:'3-1',
        //           url: 'index',
        //           childNode:[
                
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       id:4,
        //       menuName:'4444',
        //       childNode:[
        //         {
        //           id:5,
        //           menuName:'5-1',
        //           childNode:[
        //               {
        //                 id:6,
        //                 menuName:'6-1',
        //                 url: 'personal',
        //                 childNode:[

        //                 ]
        //               }
        //           ]
        //         }
        //       ]
        //     }
        // ]
      };
  },
  beforeCreate() {
    $this = this;

  },
  created(){
  },
  mounted(){
      getMenuById().then(res => {
        this.menuLists = res.data
    });
    console.log(this.menuLists);
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
      alert(link);
      $this.$router.push(link).catch(error => error);
    },
    // 收起菜单
    show(){
      $this.isCollapse = !$this.isCollapse
    }
  }
};
</script>