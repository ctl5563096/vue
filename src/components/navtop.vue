<style scoped>
.el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
}

section{
  padding: 0px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header{
  padding: 0px;
}

.headerLogo,.logo{
  cursor: pointer;
}

.el-container{
    background-color:#3C3C3C;
}

.el-menu-header{
  float: left;
}
.header-logo{
  margin-right: 50px;
}
</style>

<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap" >
      <h1 class="logo" style="width:200px;font-size: 2em;color:white;text-align:center">CRM系统</h1>
        <el-menu 
    :default-active="activeIndex" 
    class="el-menu-header" 
    mode="horizontal" 
    @select="handleSelect" 
    background-color="#3C3C3C"
    text-color="#ffffff"  
    active-text-color="#ffffff"
  >
  <el-menu-item index="1" @click="goTo('personalCenter')">个人中心</el-menu-item>
  <el-submenu index="2">
      <template slot="title">其他选项</template>
      <el-menu-item index="2-1" @click="goTo('index')">返回首页</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
</el-menu>
    </el-aside>
    <el-aside width="auto" class="header-logo tap" >
      <el-dropdown  @command="handleCommand">
      <el-avatar :src="logo" fit="contain"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </el-aside>
  </el-container>
</template>

<script>
import {logout} from '../../global/api.js';
var $this = {};
export default {
  data() {
    return {
      logo: $this.globalBaseUrl + '/' + JSON.parse(this.$store.state.userInfo) .avatar,
      activeIndex: "1",
    };
  },
  beforeCreate() {
    $this = this;
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 前往个人资料中心
    goTo(goal){
      if (goal === "personalCenter") {
        $this.$router.push("personal").catch(error => error);
      } else if ((goal === "order")) {
        $this.$router.push("order").catch(error => error);
      } else if (goal === "index"){
        $this.$router.push("index").catch(error => error);
      }
    },
    // 登出系统
    logout(){
      // 调取后端接口 删除缓存里面的权限和token过期时间
      logout().then(res => {
        // 调取接口成功之后才删除vuex
        if(res.code == 200){
          $this.delStore()
        }
      })
    },
    delStore(){
      this.$store.commit('reset');
    },
    handleCommand(command){
      if(command === 'logout'){
        this.$confirm('确定退出系统？' , '提示' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.logout();
          this.$message({
            type: 'success',
            message: '退出成功',
            duration: 1500,
            onClose: function (){
                $this.$router.push("/login").catch(error => error);
            }
          })  
        }).catch(() => {
          
        });

      }
    }
  }
};
</script>