<style scoped>
/deep/
    .el-avatar{
      vertical-align: middle;
    }
    #avatar>label{
      line-height: 43px;
    }

    #personal{
      padding-right: 10px;
      border-right: 1px solid #3C3C3C;
    }
    #personal_sub{
      margin-top: 150px;
    }
</style>
<template>
<el-row>
  <el-col :span="12" id="personal">
  <h2 style="text-align:center">个人资料</h2>
  <el-form ref="form" :model="form" :rules="addRules" label-width="80px" size="mini" v-loading="loading">
  <el-form-item id="avatar" label="头像">
      <el-avatar size="large" :src="circleUrl"></el-avatar>
  </el-form-item>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="是否为黑名单">
    <el-switch v-model="form.is_black" disabled></el-switch>
  </el-form-item>
  <el-form-item label="是否启用">
    <el-switch v-model="form.is_enable" disabled></el-switch>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio :label="1">男</el-radio>
      <el-radio :label="2">女</el-radio>
      <el-radio :label="3">保密</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item id="personal_sub">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </el-col>
</el-row>
</template>

<script>
import {getHome,getUserInfo,updateUserInfo} from '../../global/api.js';
var $this = {};
export default {
  data() {
    return {
      circleUrl:require('../assets/blog.jpg'),
      count:0,
      loading:false,
      form: {
          username: '',
          password: '',
          email:'',
          is_enable: false,
          sex:1,
          is_black: false
      },
      // 校验规则
      addRules: {
        username : [
          {
            required: true,
            message: '用户名不能为空', 
            trigger: 'blur'
          },
        ],
        password : [
          {
            required: true,
            message: '密码不能为空', 
            trigger: 'blur'
          },
        ],
        email : [
          {
            required: true,
            message: '邮箱不能为空', 
            trigger: 'blur'
          },
          {
            type: 'email', 
            message: '请输入正确的邮箱地址', 
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  beforeCreate() {
    $this = this;
  },
  created(){
    getUserInfo(this.$store.state.userId).then(res => {
      $this.id = res.data.id
      $this.form.username = res.data.user_name
      $this.form.password = res.data.password
      if(res.data.is_use == 1){
          $this.form.is_enable = true
      }else{
          $this.form.is_enable = false
      }
      if(res.data.is_black == 1){
          $this.form.is_black = true
      }else{
          $this.form.is_black = false
      }
      $this.form.email = res.data.email
      $this.form.sex = parseInt(res.data.sex)
   });
  },
  watch : {
      // 监听表单
      form:{
        handler(){
          this.count++
          console.log(this.count);
        },
        deep: true,
        immediate: false
      },
  },
  methods: {
    onSubmit() {
        if(this.count === 1){
          this.$message({
            message  : '请修改数据之后再点击提交',
            type     : "error",
            duration : 1500,
          })
          return
        }
      this.form.id = $this.id
      updateUserInfo(this.form).then(res => {
          this.$message({
            message  : '修改成功',
            type     : "success",
            duration : 1500,
          })
          this.$forceUpdate()
      })
    }
  }
}
</script>