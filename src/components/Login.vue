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
      <h2 id="title"> CRM登录系统 </h2>
      <el-form-item label="账号" style="margin-top: 50px">
        <el-input v-model="user.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 50px">
        <el-button @click="doLogin" style="float:left;margin-left: 100px" :loading="button">
          登录
        </el-button>
        <el-button @click="doResgiter" style="float:right;margin-right: 100px">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="手机验证码"
      :visible.sync="dialogVisible"
      width="30%">
    <el-form id="code_form">
      <el-form-item label="">
        <el-input v-model="code_form.code" placeholder="请输入手机验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="sendSms" :loading="button_send">
          点击获取手机验证码
        </el-button>
        <el-button @click="validateCode" :loading="button_send">
          确定
        </el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from 'element-ui';
import {getMenuById,sendSmsCode} from '../../global/api.js';
import {getParameterInitList} from '../../global/api/systemApi.js';
var $this = {};
export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
        code_form: {
          code: '',
        },
        button:false,
        dialogVisible:false,
        button_send:false,
        phone_num:''
      }
    },
    beforeCreate() {
      $this = this;
    },
    methods: {
      doLogin() {
        $this.button = true
        axios.post('http://localhost/login',{
            username:this.user.username,
            password:this.user.password,
        }).then(
          (data) => {
              // 登录成功将token存储到vuex 方便全局调用
              if (data.data.code === 200){
                if(data.data.data.status == 423){
                  this.$message({
                    message  : '请验证验证码再登录',
                    showClose: true,
                    duration : 1000,
                    onClose: function (){
                      $this.dialogVisible = true
                      $this.phone_num = data.data.data.phone_num
                      $this.button_send = false
                    }
                  })
                }else{
                  // 存储token
                  this.$store.commit('setToken',data.data.data.token)
                  // 存储用户信息
                  this.$store.commit('setUserInfo',data.data.data.userInfo)
                  // 顺便把菜单栏的请求到Vuex里面方便调用
                  getMenuById(parseInt(this.$store.state.userId)).then(res => {
                      this.$store.commit('setMenuLists' ,res.data);
                  });
                  // 顺便请求系统参数到Vuex里面方便调用
                  getParameterInitList().then(res => {
                    this.$store.commit('setParameter' ,res.data.list);
                  })
                  this.$message({
                    message  : '登录成功',
                    type     : "success",
                    duration : 1500,
                    onClose: function (){
                    $this.button = false
                    $this.$router.push('index').catch(err => {
                        console.log(err);
                      });
                    }
                  })
                }
              }else {
               this.$message({
                 message  : data.data.msg,
                 type     : "error",
                 duration : 1500,
               })
               $this.button = false
              }
          }
        )
      },
      doResgiter() {
        this.$message.success('暂时不开放注册功能,如果需要浏览功能请联系chentulinys@163.com')
      },
      // 获取验证验证手机
      sendSms() {
        sendSmsCode({'phone_num':this.phone_num}).then(res => {
          this.button_send = true
          if(res.data.smsStatus == 200){
              this.dialogVisible = false
              this.button_send = true
            }else{
              this.button_send = true
            }
          })
      },
      // 验证手机验证码
      validateCode(){

      }
    }
  }
</script>

