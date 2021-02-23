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
    <el-button type="success" @click="openDialog()">添加参数</el-button>
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
        <el-form-item label="名称" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数编码" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.para_code" autocomplete="off"></el-input>
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
            <el-input v-model="form.weight" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="启用情况" label-width="150px">
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
        <el-button @click="cancelParameter">取 消</el-button>
        <el-button type="primary" @click="submitParameterInfo">确 定</el-button>
      </div>
  </el-dialog>

  <el-dialog :title="form_insert" :visible.sync="dialogFormVisible2">
      <el-form :model="form_add">
        <el-form-item label="名称" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form_add.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数编码" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form_add.para_code" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数名" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_add.para_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数值" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_add.para_value" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排序" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_add.weight" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="启用情况" label-width="150px">
          <el-col :span="8">
        <el-select
          v-model="form_add.is_enabled"
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
        <el-button @click="cancelParameterInsert">取 消</el-button>
        <el-button type="primary" @click="addParameter">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import{
getParameterList,
getParameterDetail,
editParameter,
addParameter,
deleteParameter
} from '../../../global/api/systemApi.js';
var $this = this;
export default {
  name: 'parameter',
  inject:['reload'],
  data () {
      return {
        form_title:'编辑参数详情',
        form_insert:'新增参数',
        dialogFormVisible:false,
        dialogFormVisible2:false,
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
            id:0,
            name:'',
            para_code:'',
            para_name:'',
            para_value:'',
            is_enabled:'',
            weight:0
        },
        form_add:{
            name:'',
            para_code:'',
            para_name:'',
            para_value:'',
            is_enabled:'',
            weight:0
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
            deleteParameter(row.id).then(res => {
              if(res.code == 200){
                $this.$message({
                        type: 'success',
                        message: '删除成功',
                        duration: 1500,
                        onClose : function(){
                        $this.getList()
                        this.reload()}
                })
              }
            })
        },
        // 编辑详情
        detail(index,row){
            $this.dialogFormVisible = true
            getParameterDetail(row.id).then(res => {
                if(res.code == 200){
                    $this.form.id = res.data.id
                    $this.form.name = res.data.name
                    $this.form.para_code = res.data.para_code
                    $this.form.para_name = res.data.para_name
                    $this.form.para_value = res.data.para_value
                    $this.form.is_enabled = parseInt(res.data.is_enabled)
                    $this.form.weight = res.data.weight
                }
            })
        },
        // 取消
        cancelParameter(){
            $this.dialogFormVisible = false
            $this.form.id = 0
            $this.form.name = ''
            $this.form.para_code = ''
            $this.form.para_name = ''
            $this.form.para_value = ''
            $this.form.is_enabled = ''
            $this.form.weight = ''
        },
        // 修改提交
        submitParameterInfo(){
            $this.form.update_by = this.$store.state.userId
            editParameter($this.form).then(res => {
                if(res.code == 200){
                    $this.$message({
                        type: 'success',
                        message: '修改成功',
                        duration: 1500,
                        onClose : function(){
                        $this.dialogFormVisible = false
                        $this.getList()
                        this.reload()}
                    })
                }
            })
        },
        // 新增提交
        addParameter(){
            $this.form_add.add_by = this.$store.state.userId
            addParameter($this.form_add).then(res => {
                if(res.code == 200){
                    $this.$message({
                        type: 'success',
                        message: '新增成功',
                        duration: 1500,
                        onClose : function(){
                        $this.dialogFormVisible2 = false
                        $this.getList()
                        this.reload()
                        $this.form_add.name = ''
                        $this.form_add.para_code = ''
                        $this.form_add.para_name = ''
                        $this.form_add.para_value = ''
                        $this.form_add.is_enabled = ''
                        $this.form_add.weight = 0
                        }
                    })
                }
            })
        },
        // 新增取消
        cancelParameterInsert()
        {
            $this.dialogFormVisible2 = false
            $this.form_add.name = ''
            $this.form_add.para_code = ''
            $this.form_add.para_name = ''
            $this.form_add.para_value = ''
            $this.form_add.is_enabled = ''
            $this.form_add.weight = ''
        },
        // 打开新增页面
        openDialog()
        {
            $this.dialogFormVisible2 = true
        }
    },
    components: {},
    beforeCreate() {
        $this = this;
    },
}
</script>