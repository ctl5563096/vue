<template>
  <div id="app">
    <h1 v-if="awesome" @click="test">Vue is awesome!</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      awesome :true,
      flag : false
    }
  },
  methods : {
  test()
  {
    let self = this
    if(this.flag === false){
      self.$message.success("成功！");
      self.flag = true
    }
  }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
