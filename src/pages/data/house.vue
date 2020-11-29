<style scoped>
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
  .el-pagination{
    float: right;
  } 
  #footer{
    margin-top: 50px
  }
</style>
<template>
<div class='house'>
      <el-form :inline="true" :rules="rules" :model="requestData" ref="requestData" class="demo-form-inline">
  <el-form-item label="关键字" prop="keywords">
    <el-input v-model="requestData.keywords" placeholder="房间名称/所在位置/房主"></el-input>
  </el-form-item>
    <el-form-item label="负责人" prop="charger">
      <el-select
    v-model="requestData.charger"
    multiple
    collapse-tags
    @change="changeCharger"
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options" 
      :key="item.id"
      :label="item.user_name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="时间类型" prop="date_type">
      <el-select
    v-model="requestData.date_type"
    collapse-tags
    style="margin-left: 20px;width:100px"
    placeholder="请选择">
    <el-option
      v-for="item in options_date_type" 
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="创建时间" prop="start_time">
<el-date-picker
       v-model="requestData.start_time"
       value-format="yyyy-MM-dd hh:mm:ss"
       type="date"
       style="width:200px"
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
       style="width:200px"
       placeholder="结束日期"
       :picker-options="pickerOptions1">
</el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getList">查询</el-button>
    <el-button @click="resetForm('requestData')">重置</el-button>
    <el-button type="success" @click="openDialog('add')">添加房屋记录</el-button>
  </el-form-item>
</el-form>
    <el-table
    :data="tableData"
    :stripe="true"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="房主">
            <span>{{ props.row.master }}</span>
          </el-form-item>
          <el-form-item label="面积">
            <span>{{ props.row.size }}平方数</span>
          </el-form-item>
          <el-form-item label="添加时间">
            <span>{{ props.row.add_time }}</span>
          </el-form-item>
          <el-form-item label="建造时间">
            <span>{{ props.row.create_time }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="序号"
      prop="sort">
    </el-table-column>
    <el-table-column
      label="房间名称"
      prop="house_name">
    </el-table-column>
    <el-table-column
      label="房屋负责人"
      prop="name">
    </el-table-column>
    <el-table-column
      label="房屋所在地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="房间数"
      prop="room_num">
    </el-table-column>
    <el-table-column
      label="是否满租"
      prop="is_all">
    </el-table-column>
    <el-table-column
      label="添加时间"
      prop="add_time">
    </el-table-column>
    <el-table-column
      label="查看">
    <template slot-scope="scope">
        <el-button
          size="medium"
          type="success"
          @click="detail(scope.$index, scope.row)">查看出租情况</el-button>
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
        <el-form-item label="房屋名称" label-width="150px">
          <el-input v-model="form.house_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋地址" label-width="150px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
import {
getHouseList
} from '../../../global/api/houseApi.js';
import {
getUserList,
getChager
} from '../../../global/api/userApi.js';
var $this = this;
export default {
  name: 'user',
  inject:['reload'],
    data() {
        return {
            form_title:'新增房屋记录',
            dialogFormVisible:false,
            total:0,
            countPage:0,
            totalCount:0,
            tableData:[],
            requestData:{
                page:1,
                pageSize:10,
                keywords:'',
                start_time:'',
                end_time:'',
                charger:'',
                date_type:''
            },
            pickerOptions0:{},
            pickerOptions1:{},
            rules: {
                keywords: [],
                start_time: [],
                end_time: [],
                charger:[],
                date_type:[]
            },
            options:[],
            options_date_type:[
              {id:1,name:'添加时间'},
              {id:2,name:'建造时间'}
            ],
            form: {
              house_name: '',
              address: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '120px'
        };
    },
    computed: {},
    created(){
        // 初始化列表
        $this.getList(),
        // 初始化负责人下拉框选项
        getChager().then(       
          res => {
            if(res.code == 200){
              $this.options = res.data.list
            }
          }
        )
    },
    methods: {
        // 获取列表
        getList(){
            getHouseList($this.requestData).then(res => {
                $this.total = res.data.count
                res.data.list.map(function(val,key){
                // 序号
                val.sort = key * this.page + 1
                // 是否已租满
                if(parseInt(val.is_all) === 1){
                    val.is_all = '未租出'
                }else if(parseInt(val.is_all) === 2){
                    val.is_all = '出租中'
                }else{
                    val.is_all = '已租满'
                }
            },{
                page:this.requestData.page
            })
            $this.tableData = res.data.list
            $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
            })
        },
        // 跳转出租详情
        detail(index,rows){
            console.log(rows);
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            $this.getList()
        },
        //下拉框change事件
        changeCharger(){
          $this.getList();
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
        // 打开modal层
        openDialog(type){
          if(type === 'edit'){
              $this.form_title = '修改记录'
          }
          $this.dialogFormVisible = true
        }
    },
    components: {},
    beforeCreate() {
        $this = this;
    },
}
</script>

