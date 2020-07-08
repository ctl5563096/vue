<template>
  <el-container class="home_box">
    <el-aside width="150px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-aside{
    background: #333333;
  }
  .el-header{
    background: #B3C0D1;
  }
  .el-footer{
    background: aliceblue;
  }
</style>
