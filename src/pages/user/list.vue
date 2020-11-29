<style scoped>
.el-pagination{
    float: right;
}
.cell{
    text-align: center
}
#footer{
    margin-top: 50px
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
:focus{
    outline:0;
  }
.demo-drawer .title{
    text-indent: 16px;
}
.demo-drawer .user_info{
  margin: 16px;
}
.avatar{
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.avatar-uploader{
  text-align: center;
}
</style>
<template>
  <div id="user">
  <el-form :inline="true" :rules="rules" :model="requestData" ref="requestData" class="demo-form-inline">
  <el-form-item label="关键字" prop="keywords">
    <el-input v-model="requestData.keywords" placeholder="姓名/账号/邮箱"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="role">
    <el-select v-model="requestData.role" placeholder="角色" @change="changeSelect">
        <el-option v-for="item in options" :key="item.id" :label="item.role" :value="item.id">
        </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="创建时间" prop="start_time">
<el-date-picker
       v-model="requestData.start_time"
       value-format="yyyy-MM-dd hh:mm:ss"
       type="date"
       placeholder="开始日期"
       :picker-options="pickerOptions0">
</el-date-picker>
-
  </el-form-item>
  <el-form-item  prop="end_time">
<el-date-picker
       v-model="requestData.end_time"
       value-format="yyyy-MM-dd hh:mm:ss"
       type="date"
       placeholder="结束日期"
       :picker-options="pickerOptions1">
</el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button @click="resetForm('requestData')">重置</el-button>
  </el-form-item>
</el-form>
    <el-table
    :data="userTabelData"
    style="width: 100%"
    :border="false"
    @selection-change="handleSelectionChange"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="性别">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.password }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="序号"
      width="100"
      prop="sort">
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180"
      prop="user_name">
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="200"
      prop="email">
    </el-table-column>
    <el-table-column
      label="角色"
      width="200"
      prop="role_name">
    </el-table-column>
    <el-table-column
      label="是否启用"
      width="180">
      <template slot-scope="scope">
        <el-switch
        v-model="scope.row.is_use"  @change="chageStatus('is_use',scope.row.id,scope.row.is_use)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="是否为黑名单"
      width="200">
      <template slot-scope="scope">
        <el-switch
        v-model="scope.row.is_black" @change="chageStatus('is_black',scope.row.id,scope.row.is_black)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="验证token"
      width="350"
      prop="token">
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div id="footer">
  <el-pagination
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  layout="prev, pager,next,total,sizes"
  :hide-on-single-page="false"
  :page-sizes="[1, 10, 15, 20]"
  :pager-count="5"
  :page-size="requestData.pageSize"
  :total="totalCount">
    </el-pagination>                                   
  </div>
  <el-drawer
  :title="title"
  :before-close="handleClose"
  :visible.sync="dialog"
  :direction="direction"
  custom-class="demo-drawer"
  :withHeader="false"
  ref="drawer"
  >
  <h2 class="title">
      {{title}}
  </h2>
  <div class="avatar_div">
        <el-upload
            class="avatar-uploader"
            action="http://localhost/upload"
            :headers="token"
            :data='dataList'
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="userInfo.circleUrl" :src="userInfo.circleUrl" class="avatar">
            <!-- <span v-if="circleUrl" class="el-upload-action" @click.stop="handleRemove()">
                <i class="el-icon-delete"></i>
            </span> -->
            <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
        </el-upload>
  </div>
  <el-form ref="user_form" :model="userInfo" label-width="80px" label-position='left' class='user_info'>
  <!-- <el-form-item id="avatar" label="头像">
    <el-button circle>
            <el-avatar size="large" :src="userInfo.circleUrl"></el-avatar>
    </el-button>
  </el-form-item> -->
  <el-form-item label="用户名">
    <el-input v-model="userInfo.user_name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="userInfo.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="userInfo.email"></el-input>
  </el-form-item>
    <el-form-item label="角色" prop="role">
    <el-select v-model="userInfo.role" placeholder="角色">
        <el-option v-for="item in options" :key="item.id" :label="item.role" :value="item.id">
        </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="userInfo.sex">
      <el-radio :label="1">男</el-radio>
      <el-radio :label="2">女</el-radio>
      <el-radio :label="3">保密</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否为黑名单">
    <el-switch v-model="userInfo.is_black" disabled></el-switch>
  </el-form-item>
  <el-form-item label="是否启用">
    <el-switch v-model="userInfo.is_use" disabled></el-switch>
  </el-form-item>
  <el-form-item label="验证token">
      <el-input v-model="userInfo.token" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click='submitUserInfo'>修改</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
</el-drawer>

  </div>
</template>

<script>
import {
getUserList,
changeStatus,
getRole,
updateAdminInfo
} from '../../../global/api/userApi.js';
var $this = {};
export default {
  name: 'user',
  inject:['reload'],
      data() {
      return {
        countPage:0,
        token:{'Authorization':"Bearer " + $this.$store.state.token},
        title:'用户信息修改',
        dialog:false,
        drawer: false,
        direction: 'rtl',
        userTabelData:[],
        requestData:{
            page : 1,
            pageSize : 15,
            start_time: '',
            end_time:'',
            keywords:'',
            role:''
        },
        totalCount:1,
        multipleSelection: [],
        options: [],
        rules: {
          keywords: [],
          role: [],
          start_time: [],
          end_time: [],
        },
        pickerOptions0:{},
        pickerOptions1:{},
        userInfo:{
          created_at:'',
          email:'',
          id:'',
          is_black:'',
          is_use:'',
          password:'',
          role_name:'',
          sex:'',
          token:'',
          user_name:'',
          circleUrl:'',
          role:0,
          sex:0
        },
        dataList:{
          name:'file',
          type:'avatar',
          other:''
        }
      }
    },
    methods: {
      // 编辑触发抽屉
      handleEdit(index, row) {
        $this.dialog = true
        $this.userInfo = row
        if(row.avatar !== ''){
            this.userInfo.circleUrl =  $this.globalBaseUrl + '/' + row.avatar
        }else{
            this.userInfo.circleUrl = require('../../assets/blog.jpg')
        }
        $this.userInfo.sex = parseInt(row.sex)
      },
      // 选中选项触发事件
      handleSelectionChange(val){
        let arr = [];
        val.map(function(val,key){
            arr.push(val.id)
        },{
            arr:arr
        })
        $this.multipleSelection = arr
      },
      chageStatus(type,id,status){
        if(status){
          status = 1
        }else{
          status = 0
        }
        changeStatus(type,parseInt(id),status).then(res => {
          this.$message({
              type: 'success',
              message: '更改成功',
              duration: 1500
          })
        })
      },
      // 搜索接口
      onSubmit() {
        // 获取所有用户列表
        getUserList($this.requestData).then(res => {
            $this.totalCount = res.data.count
            res.data.list.map(function(val,key){
                // 序号
                val.sort = key * this.page + 1
                // 是否启用
                if(parseInt(val.is_use) === 1){
                    val.is_use = true
                }else{
                    val.is_user = false
                }
                // 黑名单
                if(parseInt(val.is_black) === 1){
                    val.is_black = true
                }else{
                    val.is_black = false
                }
            },{
                page:this.requestData.page
            })
            $this.userTabelData = res.data.list
            $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
        })
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        $this.onSubmit()
      },
      // 角色下拉改变事件
      changeSelect(){
        $this.onSubmit()
      },
      // 弹出层关闭回调
      handleClose(done){
        $this.$confirm('确认关闭编辑？编辑信息将不会被保存！')
          .then(_ => {
            this.reload();
            done();
          })
          .catch(_ => {});
      },
      // 提交修改的客户信息
      submitUserInfo(){
        updateAdminInfo($this.userInfo).then(res => {
            if(res.code == 200){
              $this.$message({
                type: 'success',
                message: '更改成功',
                duration: 1500,
                onClose : function(){
                  $this.dialog = false
                  $this.getAdminList()
                  this.reload();
                }
              })
            }
        })
      },
      //取消
      cancel(){
        $this.dialog = false
        this.reload();
      },
      // 获取当前列表
      getAdminList(){
         getUserList($this.requestData).then(res => {
            $this.totalCount = res.data.count
            res.data.list.map(function(val,key){
                // 序号
                val.sort = key * this.page + 1
                // 是否启用
                if(parseInt(val.is_use) === 1){
                    val.is_use = true
                }else{
                    val.is_user = false
                }
                // 黑名单
                if(parseInt(val.is_black) === 1){
                    val.is_black = true
                }else{
                    val.is_black = false
                }
            },{
                page:this.requestData.page
            })
            $this.userTabelData = res.data.list
            $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
        })
    },
    // 移除图片
    handleRemove() {
      this.circleUrl = ''
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      $this.userInfo = {
        ...$this.userInfo,
        circleUrl: $this.globalBaseUrl + '/' + res.data.url
      }
      // 判断该用户是不是现在登陆的用户 是的话刷新缓存
      if(parseInt(this.$store.state.userId) === parseInt($this.userInfo.id)){
        // 刷新缓存里面的头像
        let str = JSON.parse(this.$store.state.userInfo)
        str.avatar = res.data.url
        this.$store.commit('setUserInfo',JSON.stringify(str))
      }
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      $this.dataList.other = JSON.stringify({id:$this.userInfo.id})
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return type && isLt5M
    },
    // 每页条数改变事件
    handleSizeChange(val){
      $this.requestData.pageSize = val
      $this.getAdminList()
    },
    // 当前页改变事件
    handleCurrentChange(val){
      $this.requestData.page = val
      $this.getAdminList()
    }
    },
    beforeCreate() {
        $this = this;
    },
    created(){
        // 获取所有用户列表
        getUserList($this.requestData).then(res => {
            $this.totalCount = res.data.count
            res.data.list.map(function(val,key){
                // 序号
                val.sort = key * this.page + 1
                // 是否启用
                if(parseInt(val.is_use) === 1){
                    val.is_use = true
                }else{
                    val.is_user = false
                }
                // 黑名单
                if(parseInt(val.is_black) === 1){
                    val.is_black = true
                }else{
                    val.is_black = false
                }
            },{
                page:this.requestData.page
            })
            $this.userTabelData = res.data.list
            $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
        }),
        // 获取所有的角色
        getRole().then(res => {
            $this.options = res.data
        })
    }
}
</script>