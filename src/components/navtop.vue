<style scoped>
.el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
}

section{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>

<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap" >
      <h1 class="logo" style="width:200px;font-size: 2em;color:white;text-align:center">后台系统</h1>
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
      <template slot="title">控制台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
</el-menu>
    </el-aside>
    <el-aside width="auto" class="header-logo tap" >
      <el-avatar :src="logo" fit="contain"></el-avatar>
    </el-aside>
  </el-container>
</template>

<script>
var $this = {};
export default {
  data() {
    return {
      logo: require('../assets/blog.jpg'),
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
    goTo(goal){
      if (goal === "personalCenter") {
        $this.$router.push("personal").catch(error => error);
      } else if ((goal = "order")) {
        $this.$router.push("order").catch(error => error);
      }
    }
  }
};
</script>