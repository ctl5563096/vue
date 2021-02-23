<style scoped>
  .el-pagination{
    float: right;
  } 
  #footer{
    margin-top: 50px
  }
</style>
<template>
    <div id="homeCustomer">
      <el-form :inline="true" :rules="rules" :model="requestData" ref="requestData" class="demo-form-inline">
        <el-form-item label="关键字" prop="keywords">
            <el-input v-model="requestData.keywords" placeholder="姓名/手机号码/身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="origin">
          <el-select
          v-model="requestData.origin"
          collapse-tags
          @change="changeOrigin"
          style="margin-left: 20px;"
          placeholder="请选择">
          <el-option
          v-for="item in options_params_origin" 
          :key="item.para_value"
          :label="item.para_name"
          :value="item.para_value">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetForm('requestData')">重置</el-button>
          <el-button type="success" @click="openDialog('add')">{{this.form_title}}</el-button>
        </el-form-item>
        </el-form>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="sort"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="真实姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="openid"
          label="微信唯一标识">
        </el-table-column>
        <el-table-column
          prop="add_type"
          label="新增来源">
        </el-table-column>
        <el-table-column
          prop="phone_num"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="id_card"
          label="身份证号码">
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="新增时间">
        </el-table-column>
        <el-table-column
          label="编辑">
        <template slot-scope="edit">
            <el-button
              size="small"
              type="primary"
              @click="openDialog('edit', edit.row.id)">编辑</el-button>
            <!-- <el-button
              size="small"
              type="danger"
              @click="deleteData(edit.$index, edit.row)">删除</el-button> -->
        </template>
        </el-table-column>
        </el-table>
        <div id="footer">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next,total, sizes"
          :hide-on-single-page="false"
          :page-sizes="[2, 10, 15, 20]"
          :page-size="requestData.pageSize"
          :pager-count="5"
          :total="total">
          </el-pagination>                                   
        </div>

      <el-dialog :title="form_title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="真实姓名" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.real_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.phone_num" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号码" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.id_card" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="微信唯一标识" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.openid" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form.sex"
          collapse-tags
          placeholder="请选择">
          <el-option
          v-for="item in sex" 
          :key="item.para_value"
          :label="item.para_name"
          :value="item.para_value">
          </el-option>
        </el-select>
        </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="submitAddInfo">确 定</el-button>
      </div>
      </el-dialog>

      <el-dialog :title="form_title_update" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="真实姓名" label-width="150px">
          <el-col :span="8">
              <el-input v-model="update_form.real_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码" label-width="150px">
          <el-col :span="8">
              <el-input v-model="update_form.phone_num" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户来源" label-width="150px">
          <el-col :span="8">
              <el-input v-model="update_form.add_type" autocomplete="off" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号码" label-width="150px">
          <el-col :span="8">
            <el-input v-model="update_form.id_card" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="微信唯一标识" label-width="150px">
          <el-col :span="8">
            <el-input v-model="update_form.openid" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="update_form.sex"
          collapse-tags
          placeholder="请选择">
          <el-option
          v-for="item in sex" 
          :key="item.para_value"
          :label="item.para_name"
          :value="item.para_value">
          </el-option>
        </el-select>
        </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="submitUpdateInfo">确 定</el-button>
      </div>
      </el-dialog>
    </div>
</template>

<script>
import{
    getHomeCustomer,
    addHomeCustomer,
    getDetailById,
    updateInfo
} from '../../../global/api/customerApi.js';
var $this = this;
export default {
    name: 'homeCustomer',
    inject:['reload'],
    data () {
        return {
            total:0,
            countPage:0,
            dialogFormVisible:false,
            dialogFormVisible2:false,
            form_title:'新增租客用户',
            form_title_update:'修改租客用户信息',
            requestData:{
                page:1,
                pageSize:10,
                keywords:'',
                origin:''
            },
            rules: {
              keywords: [],
              origin: []
            },
            tableData:[],
            totalCount:0,
            options_params_origin:[],
            sex:[],
            form:{
              id:0,
              real_name:'',
              sex:'',
              phone_num:'',
              id_card:'',
              openid:'',
              add_type:4
            },
            update_form:{
              id:0,
              real_name:'',
              sex:'',
              phone_num:'',
              id_card:'',
              openid:'',
              add_type:''
            },
        };
    },
    computed: {},
    created(){
        // 初始化列表
        $this.getList(),
        $this.options_params_origin = this.$store.state.parameter.customerOrigin
        $this.sex = this.$store.state.parameter.sex
    },
    methods:{
        // 客户详情
        detail(){
            console.log('客户详情');
        },
        // 获取列表详情
        getList(){
            let page = $this.requestData.page
            let pageSize = $this.requestData.pageSize
            let keywords = $this.requestData.keywords
            let origin = $this.requestData.origin
            getHomeCustomer(page,pageSize,keywords,origin).then(res => {
                if(res.code == 200){
                    $this.total = res.data.count
                    res.data.list.map(function(val,key){
                    // 序号
                    val.sort = key * this.page + 1
                    },{
                      page:this.requestData.page
                    })
                    $this.tableData = res.data.list
                    $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
                }
            })
        },
        // 改变每页条数
        handleSizeChange(val) {
          $this.requestData.pageSize = val
          $this.getList()
        },
        // 改变当前页触发事件
        handleCurrentChange(val){
          $this.requestData.page = val
          $this.getList()
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            $this.getList()
        },
        //下拉框change事件
        changeOrigin(){
          $this.getList();
        },
        // 新增租客客户信息
        submitAddInfo(){
          addHomeCustomer($this.form).then(res => {
              if(res.code == 200){
                    $this.$message({
                        type: 'success',
                        message: '新增成功',
                        duration: 1500,
                        onClose : function(){
                        $this.dialogFormVisible = false
                        $this.getList()
                        this.reload()
                        $this.form.real_name = ''
                        $this.form.sex = ''
                        $this.form.phone_num = ''
                        $this.form.id_card = ''
                        $this.form.openid = ''
                        }
                    })
              }
          })
        },
        // 取消新增租客客户信息
        cancelAdd(){
          $this.dialogFormVisible = false
          $this.form.real_name = ''
          $this.form.sex = ''
          $this.form.phone_num = ''
          $this.form.id_card = ''
          $this.form.openid = ''
        },
        // 取消更新租客客户信息
        cancelUpdate(){
          $this.dialogFormVisible2 = false
          $this.update_form.id = 0
          $this.update_form.real_name = ''
          $this.update_form.sex = ''
          $this.update_form.phone_num = ''
          $this.update_form.id_card = ''
          $this.update_form.openid = ''
        },
        // 更新租户信息
        submitUpdateInfo(){
            let json_obj = JSON.parse(this.$store.state.userInfo)
            $this.update_form.update_by = json_obj.user_name
            updateInfo($this.update_form).then(res=>{
              if(res.code == 200){
                  $this.$message({
                    type: 'success',
                    message: '修改成功',
                    duration: 1500,
                    onClose : function(){
                    $this.dialogFormVisible2 = false
                    $this.getList()
                    this.reload()}
                  })
              }
            })
        },
        // 打开对话框
        openDialog(type,id){
            if(type === 'add'){
              $this.dialogFormVisible = true
            }else{
              $this.dialogFormVisible2 = true
              console.log(id);
              getDetailById(id).then(res => {
                if(res.code == 200){
                    $this.update_form.id = id
                    $this.update_form.real_name = res.data.real_name
                    $this.update_form.sex = res.data.sex
                    $this.update_form.phone_num = res.data.phone_num
                    $this.update_form.id_card = res.data.id_card
                    $this.update_form.add_type = res.data.add_type
                }
              })
            }
        }
    },
    components: {},
    beforeCreate() {
        $this = this;
    },
}
</script>