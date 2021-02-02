<style scoped>
  .el-pagination{
    float: right;
  } 
  #footer{
    margin-top: 50px
  }
</style>
<template>
  <div id="parameter">
    <el-form :inline="true" :rules="rules" :model="requestData" ref="requestData" class="demo-form-inline">
  <el-form-item label="关键字" prop="keywords">
    <el-input v-model="requestData.keywords" placeholder="名称/参数名/参数编码"></el-input>
  </el-form-item>
    <el-form-item label="是否启用" prop="is_enabled">
    <el-select
    v-model="requestData.is_enabled"
    collapse-tags
    @change="changeIsEnabled"
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options" 
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getList">查询</el-button>
    <el-button @click="resetForm('requestData')">重置</el-button>
    <!-- <el-button type="success" @click="openDialog('add')">添加房屋记录</el-button> -->
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
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="参数编码">
    </el-table-column>
    <el-table-column
      prop="para_name"
      label="参数名">
    </el-table-column>
    <el-table-column
      prop="para_value"
      label="参数值">
    </el-table-column>
    <el-table-column
      prop="is_enabled"
      label="是否启用">
    </el-table-column>
    <el-table-column
      label="编辑">
    <template slot-scope="edit">
        <el-button
          size="small"
          type="primary"
          @click="detail(edit.$index, edit.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="deleteData(edit.$index, edit.row)">删除</el-button>
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
        <el-form-item label="参数名" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数编码" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数名" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.para_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数值" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.para_value" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排序" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.sort" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出租情况" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form.is_enabled"
          collapse-tags
          placeholder="请选择">
        <el-option
            v-for="item in options" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
        </el-select>
        </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHouse">取 消</el-button>
        <el-button type="primary" @click="submitHouseInfo">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import{
getParameterList,
getParameterDetail
} from '../../../global/api/systemApi.js';
var $this = this;
export default {
  name: 'parameter',
  inject:['reload'],
  data () {
      return {
        form_title:'编辑参数详情',
        dialogFormVisible:false,
        total:0,
        countPage:0,
        requestData:{
            page:1,
            pageSize:10,
            keywords:'',
            is_enabled:''
        },
        tableData:[],
        totalCount:0,
        rules: {
            keywords: [],
            is_enabled: []
        },
        options:[
            {id:1,name:'未启用'},
            {id:2,name:'已启用'}
        ],
        form:{
            name:'',
            code:'',
            para_name:'',
            para_value:'',
            is_enabled:'',
            sort:''
        }
      };
    },
    computed: {},
    created(){
        // 初始化列表
        $this.getList()
    },
    methods:{
        getList(){
            let page = $this.requestData.page
            let pageSize = $this.requestData.pageSize
            let keywords = $this.requestData.keywords
            let is_enabled = $this.requestData.is_enabled
            getParameterList(page,pageSize,keywords,is_enabled).then(res =>{
                if(res.code == 200){
                    $this.total = res.data.count
                    res.data.list.map(function(val,key){
                    // 序号
                    val.sort = key * this.page + 1
                    // 是否被启用
                    if(val.is_enabled == 1){
                        val.is_enabled = '未启用'
                    }else{
                        val.is_enabled = '已启用'
                    }
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
        //下拉框change事件
        changeIsEnabled(){
          $this.getList();
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            $this.getList()
        },
        // 删除
        deleteData(index,row){
            console.log('object :>> ', row);
        },
        // 编辑详情
        detail(index,row){
            $this.dialogFormVisible = true
            getParameterDetail(row.id).then(res => {
                if(res.code == 200){
                    $this.form.name = res.data.name
                    $this.form.code = res.data.code
                    $this.form.para_name = res.data.para_name
                    $this.form.para_value = res.data.para_value
                    $this.form.is_enabled = res.data.is_enabled
                    $this.form.sort = res.data.sort
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