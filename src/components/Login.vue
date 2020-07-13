<style>
  #login_wrap{
    height: 100%;
    background: linear-gradient(45deg,rgba(254,172,94,0.5),rgba(199,121,208,0.5),rgba(75,192,200,0.5));
  }
  #login_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #login_form {
    border-radius: 4px;
    padding: 10px;
    /*background: #E9EEF3;*/
    width: 500px;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  #login_wrap button {
    display: inline-block;
    text-align: center;
  }

  #title {
    text-align: center;
  }

  #login_form button {
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
      <el-form-item label="密码">
        <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 50px">
        <el-button @click="doLogin" style="float:left;margin-left: 100px">
          登录
        </el-button>
        <el-button @click="doResgiter" style="float:right;margin-right: 100px">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from 'element-ui'
export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      doLogin() {
        axios.post('http://localhost:80/login',{
            username:this.user.username,
            password:this.user.password
        }).then(

          (data) => {
              // 登录成功将token存储到vuex 方便全局调用
              if (data.data.status === 200){
                this.$store.state.token = data.data.data.token
                this.$message({
                message  : '登录成功',
                type     : "success",
                duration : 1500,
               })
                this.$router.push('/home');
              }else {
               this.$message({
                 message  : data.data.messages.error,
                 type     : "error",
                 duration : 1500,
               })
              }
          }
        )
      },
      doResgiter() {
        this.$message.success('注册')
      }
    }
  }
</script>

