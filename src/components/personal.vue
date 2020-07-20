<style scoped>
/deep/
    input[type="text"]{
        width: 200px;
    }
    .el-avatar{
      vertical-align: middle;
    }
    #avatar>label{
      line-height: 43px;
    }

    #personal{
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
  <el-form ref="form" :model="form" label-width="80px" size="mini">
  <el-form-item id="avatar" label="头像">
      <el-avatar size="large" :src="circleUrl"></el-avatar>
  </el-form-item>
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="是否启用">
    <el-switch v-model="form.is_enable"></el-switch>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item id="personal_sub">
    <el-button type="primary" @click="onSubmit">修改</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </el-col>
</el-row>

</template>

<script>
export default {
    data() {
      return {
        circleUrl:require('../assets/blog.jpg'),
        form: {
          username: '',
          password: '',
          email:'',
          is_enable: false,
          sex:false
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>