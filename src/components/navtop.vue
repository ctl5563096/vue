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
</style>

<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap" >
      <h1 class="logo" style="width:200px;font-size: 2em;color:white;text-align:center">后台系统</h1>
    </el-aside>
    <el-aside width="auto" class="header-logo tap" >
      <el-avatar icon="el-icon-user-solid" class="headerLogo"></el-avatar>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>