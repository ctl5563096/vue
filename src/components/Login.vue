<style>
  #login_wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
  }
  #login_form{
    border-radius: 4px;
    padding: 10px;
    /*background: #E9EEF3;*/
    width: 500px;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  #login_wrap button{
    display: inline-block;
    text-align: center;
  }
  #title{
    text-align: center;
  }
  #login_form button{
    width: 100px;
  }
</style>
<template>
    <div id="login_wrap">
      <el-form id="login_form" label-position="right">
        <h2 id="title"> 后台登录系统 </h2>
        <el-form-item label="账号" style="margin-top: 50px">
          <el-input v-model="user.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 50px">
          <el-button @click="doLogin" style="float:left;margin-left: 100px">
            登录
          </el-button>
          <el-button @click="doLogin" style="float:right;margin-right: 100px">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    //单页面中不支持前面的data:{}方式
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        user:{
          username:'zhangsan',
          password:'123',
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
        alert(JSON.stringify(this.user))//可以直接把this.user对象传给后端进行校验用户名和密码
      }
    }
  }
</script>
