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
      label="查看出租情况">
    <template slot-scope="scope">
        <el-button
          size="small"
          type="success"
          @click="goHouseDetail(scope.$index, scope.row)">查看出租情况</el-button>
      </template>
    </el-table-column>
      <el-table-column
      label="编辑">
      <template slot-scope="scope_id">
        <el-button
          size="small"
          type="primary"
          @click="detail(scope_id.$index, scope_id.row)">编辑房屋信息</el-button>
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
          <el-col :span="8">
              <el-input v-model="form.house_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="房屋地址" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form.charger"
          collapse-tags
          @change="changeCharger"
          placeholder="请选择">
        <el-option
            v-for="item in options" 
            :key="item.id"
            :label="item.user_name"
            :value="item.id">
        </el-option>
        </el-select>
        </el-col>
        </el-form-item>
        <el-form-item label="房间数" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.room_num" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="面积数（平方）" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.size" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出租情况" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form.is_all"
          collapse-tags
          placeholder="请选择">
        <el-option
            v-for="item in options_house_cus" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
        </el-select>
        </el-col>
        </el-form-item>
        <el-form-item label="建造时间" label-width="150px">
            <el-date-picker
              v-model="form.create_time"
              type="date"
              placeholder="选择建造时间">
            </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHouse">取 消</el-button>
        <el-button type="primary" @click="submitHouseInfo">确 定</el-button>
      </div>
  </el-dialog>
    <el-dialog :title="from_update" :visible.sync="dialogFormVisible">
      <el-form :model="form_update">
        <el-form-item label="房屋名称" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form_update.house_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="房屋地址" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form_update.address" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form_update.charger"
          collapse-tags
          @change="changeCharger"
          placeholder="请选择">
        <el-option
            v-for="item in options" 
            :key="item.id"
            :label="item.user_name"
            :value="item.id">
        </el-option>
        </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="房间数" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_update.room_num" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="面积数（平方）" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_update.size" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出租情况" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form_update.is_all"
          collapse-tags
          placeholder="请选择">
        <el-option
            v-for="item in options_house_cus" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
        </el-select>
        </el-col>
        </el-form-item>
        <el-form-item label="建造时间" label-width="150px">
          <el-col :span="8">
            <el-date-picker
              v-model="form_update.create_time"
              type="date"
              placeholder="选择建造时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHouse">取 消</el-button>
        <el-button type="primary" @click="updateHouseInfo">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
import {
getHouseList,
addHouse,
getHouseById,
updateHouseInfo
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
            from_update:'修改房屋信息',
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
            options_house_cus:[
              {id:1,name:'未租出'},
              {id:2,name:'出租中'},
              {id:3,name:'已出租'},
            ],
            form: {
              house_name: '',
              address: '',
              charger: '',
              room_num: '',
              size: '',
              is_all: '',
              create_time:''
            },
            form_update:{
              house_name: '',
              address: '',
              charger: '',
              room_num: '',
              size: '',
              is_all: '',
              create_time:'',
              id:0
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
        // 房屋详情
        detail(index,rows){
            let id = rows.id
            console.log(id);
            getHouseById(id).then(res =>{
              if(res.code == 200){
                $this.dialogFormVisible = true
                $this.form_update.id = id
                $this.form_update.house_name = res.data.house_name
                $this.form_update.address = res.data.address
                $this.form_update.charger = res.data.charger
                $this.form_update.room_num = res.data.room_num
                $this.form_update.size = res.data.size
                $this.form_update.is_all = res.data.is_all
                $this.form_update.create_time = res.data.create_time
              }
            })
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
        },
        // 新增房屋信息
        submitHouseInfo(){
          addHouse($this.form).then(res =>{
            if(res.code == 200){
                $this.$message({
                type: 'success',
                message: '新增成功',
                duration: 1500,
                onClose : function(){
                  $this.dialogFormVisible = false
                  $this.getList()
                  this.reload();
                }
              })
            }else{
                $this.$message({
                type: 'error',
                message: res.realMsg,
                duration: 1500
              })
            }
          })
        },
        // 取消键
        cancelHouse(){
          $this.dialogFormVisible = false
          $this.form.house_name = ''
          $this.form.address = ''
          $this.form.charger = ''
          $this.form.room_num = ''
          $this.form.size = ''
          $this.form.is_all = ''
          $this.form.create_time = ''
        },
        // 前往房屋详情
        goHouseDetail(index,row)
        {
           this.$router.push({ path:'/homeDetail'  })
        },
        // 更新房屋详情
        updateHouseInfo()
        {
          updateHouseInfo($this.form_update).then(res => {
            if(res.code == 200){
               $this.$message({
                type: 'success',
                message: '修改成功',
                duration: 1500,
                onClose : function(){
                  $this.dialogFormVisible = false
                  $this.getList()
                  this.reload();
                }
              })
            }
          })
        }
    },
    components: {},
    beforeCreate() {
        $this = this;
    },
}
</script>

