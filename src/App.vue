<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-wechat-title='$route.meta.title' v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      webSocket:null
    }
  },
  created(){

  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    initWebSocket(){
      const wsuri = "ws://127.0.0.1:8384";
      this.webSocket = new WebSocket(wsuri);
      this.webSocket.onmessage = this.websocketonmessage;
      this.webSocket.onopen = this.websocketonopen;
      this.webSocket.onerror = this.websocketonerror;
      this.webSocket.onclose = this.websocketclose;
    },
    websocketonopen(e){ //连接建立之后执行send方法发送数据
        console.log(e);
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
        // 连接上之后
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        console.log(e.data);
      },
      websocketsend(Data){//数据发送
        this.webSocket.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
  },
  // 监听,当路由发生变化的时候执行
  watch:{
    // 当路由是从登陆页面或者是自体刷新页面时从新登陆
    $route(to,from){
      let goUrl = to.path;
      let formUrl = from.path;
      console.log(goUrl);
      console.log(formUrl);
      if((goUrl === '/index' && formUrl === '/login') ||  formUrl === '/'){
        this.initWebSocket();
      }
      if(this.webSocket && goUrl === '/login'){
        // 退出登录主动关闭websocket连接
        this.webSocket.close()
      }
    } 
  }
}
</script>

<style>
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
    width:100%;
  }
</style>
