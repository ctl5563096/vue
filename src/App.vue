<template>
  <div id="app">
    <!-- <h1 v-if="awesome" @click="test">Vue is awesome!</h1> -->
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

