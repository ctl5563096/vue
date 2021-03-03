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
    .avatar{
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
    .avatar_div{
      margin-bottom: 15px
    }
    .avatar-uploader{
      text-align: center;
    }
</style>
<template>
<el-row>
  <el-col :span="12" id="personal">
  <h2 style="text-align:center">个人资料</h2>
  <div class="avatar_div">
        <el-upload
            class="avatar-uploader"
            :action="action"
            :headers="token"
            :data='dataList'
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="circleUrl" :src="circleUrl" class="avatar">
            <!-- <span v-if="circleUrl" class="el-upload-action" @click.stop="handleRemove()">
                <i class="el-icon-delete"></i>
            </span> -->
            <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
        </el-upload>
  </div>
  <el-form ref="form" :model="form" :rules="addRules" label-width="80px" size="mini" v-loading="loading">
  <!-- <el-form-item id="avatar" label="头像">
      <el-avatar size="large" :src="circleUrl"></el-avatar>
      <el-button @click="editAvatar">更换头像</el-button>
  </el-form-item> -->
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="role">
    <el-input v-model="form.role" disabled></el-input>
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
  inject:['reload'],
  data() {
    return {
      token:{'Authorization':"Bearer " + $this.$store.state.token},
      circleUrl: $this.globalBaseUrl + '/' + JSON.parse(this.$store.state.userInfo) .avatar,
      count:0,
      loading:false,
      action:'',
      form: {
          username: '',
          password: '',
          email:'',
          is_enable: false,
          sex:1,
          is_black: false,
          role:''
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
      },
      dataList:{
        name:'file',
        type:'avatar',
        other:JSON.stringify({id:this.$store.state.userId})
      }
    }
  },
  beforeCreate() {
    $this = this;
  },
  created(){
    $this.action = $this.globalBaseUrl + '/' + 'upload'
    getUserInfo(this.$store.state.userId).then(res => {
      $this.id = res.data.id
      $this.form.username = res.data.user_name
      $this.form.password = res.data.password
      $this.form.role = res.data.role_name
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
      let editForm = this.form
      updateUserInfo(editForm).then(res => {
          this.$message({
            message  : '修改成功',
            type     : "success",
            duration : 1500,
          })
          this.$forceUpdate()
      })
    },
    // 移除图片
    handleRemove() {
      this.circleUrl = ''
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      // 更换头像地址
      this.circleUrl = $this.globalBaseUrl + '/' + res.data.url
      // 刷新缓存里面的头像
      let str = JSON.parse(this.$store.state.userInfo)
      str.avatar = res.data.url
      this.$store.commit('setUserInfo',JSON.stringify(str))
      this.reload();
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return type && isLt5M
    }
  }
}
</script>