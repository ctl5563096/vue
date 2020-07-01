<template>
    <div style="width:500px;text-align:center;">
        <el-form>
            <el-form-item label="账号">
                <el-input v-model="user.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
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