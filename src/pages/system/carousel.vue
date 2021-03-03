<style scoped>
  .el-pagination{
    float: right;
  } 
  #footer{
    margin-top: 50px
  }
 .avatar-uploader .el-upload {
    border: 1px dashed #000000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 382.5px;
    height: 150px;
    display: block;
  }
</style>
<template>
  <div id="carousel">
    <el-form class="demo-form-inline">
  <el-form-item>
    <el-button type="primary" @click="openDialog()">添加轮播图</el-button>
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
      prop="name"
      label="图片"
      width="180">
    <template slot-scope="edit">
        <el-image 
            style="width: 100px; height: 100px"
            :src="edit.row.url" 
            :preview-src-list="[edit.row.url]">
        </el-image>
    </template>
    </el-table-column>
    <el-table-column
      prop="cn_enabled"
      label="是否启用">
    </el-table-column>
    <el-table-column
      prop="content"
      label="轮播图说明">
    </el-table-column>
    <el-table-column
      prop="add_by"
      label="添加人">
    </el-table-column>
    <el-table-column
      prop="add_time"
      label="添加时间">
    </el-table-column>
    <el-table-column
      label="编辑详情">
      <template slot-scope="scope_id">
        <el-button
          size="small"
          type="success"
          @click="detail(scope_id.$index, scope_id.row.id)">编辑详情</el-button>
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
    <el-dialog :title="form_title" :visible.sync="dialogFormVisible" @close="cancelCarousel">
      <el-form :model="form">
        <el-form-item label="名称" label-width="150px">
          <el-col :span="8">
              <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="轮播图内容" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="添加人" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form.add_by" autocomplete="off" :disabled='true'></el-input>
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
        <el-form-item label="上传轮播图" label-width="150px">
          <el-col :span="8">
                  <el-upload
  class="avatar-uploader"
  :action="action"
  :headers="token"
  :data='dataList'
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="image_url" :src="image_url" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="cancelCarousel">取 消</el-button>
        <el-button type="primary" @click="submitCarouselInfo">确 定</el-button>
      </div>
  </el-dialog>

      <el-dialog :title="form_title_add"  :visible.sync="dialogFormVisibleAdd" @close="cancelCarouselAdd">
      <el-form :model="form_add" :rules="rules" ref="form_add">
        <el-form-item label="名称" label-width="150px" prop="name">
          <el-col :span="8">
              <el-input v-model="form_add.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="轮播图内容" label-width="150px">
          <el-col :span="8">
            <el-input v-model="form_add.content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="启用情况" label-width="150px" prop="is_enabled">
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
        <el-form-item label="上传轮播图" label-width="150px" prop="image_url">
          <el-col :span="8">
                  <el-upload
  class="avatar-uploader"
  :action="action"
  :headers="token"
  :data='dataList'
  :show-file-list="false"
  :on-success="handleAvatarSuccessAdd"
  :before-upload="beforeAvatarUploadAdd">
  <img v-if="image_url" :src="image_url" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="cancelCarouselAdd">取 消</el-button>
        <el-button type="primary" @click="submitCarouselInfoAdd('form_add')">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>
    
<script>
import{
getCarousel,
getCarouselInfo,
updateCarouselInfo,
addCarousel
} from '../../../global/api/systemApi.js';
var $this = this;
export default {
  name: 'carousel',
  inject:['reload'],
  data () {
      return {
        token:{'Authorization':"Bearer " + $this.$store.state.token},
        total:0,
        countPage:0,
        form_title:'修改详情',
        form_title_add:'新增轮播图',
        dialogFormVisible:false,
        dialogFormVisibleAdd:false,
        action:'',
        requestData:{
            page:1,
            pageSize:10,
        },
        tableData:[],
        totalCount:0,
        options:[
            {id:'1',name:'未启用'},
            {id:'2',name:'已启用'}
        ],
        form:{
            id:0,
            name:'',
            content:'',
            is_enabled:'',
            image_url:'',
            add_by:''
        },
        form_add:{
            name:'',
            content:'',
            is_enabled:'',
            image_url:'',
            add_by:''
        },
        dataList:{
            name:'file',
            type:'carousel',
            other:''
        },
        image_url:'',
        // 表单验证
        rules:{
            name: [
                { required: true, message: '请输入轮播图名称', trigger: 'blur' },
            ],
            is_enabled: [
                { required: true, message: '是否开启为必填', trigger: 'change' },
            ],
            image_url: [
                { required: true, message: '请上传轮播图'},
            ]
        }
      };
  },
  computed: {},
  created(){
        // 初始化列表
        $this.getList()
        $this.action = $this.globalBaseUrl + '/' + 'upload'
  },
  methods:{
      handleSizeChange(val){
        $this.requestData.pageSize = val
        $this.getList()
      },
      handleCurrentChange(val){
        $this.requestData.page = val
        $this.getList()
      },
      // 获取列表
      getList(){
            let page = $this.requestData.page
            let pageSize = $this.requestData.pageSize
            getCarousel(page,pageSize).then(res=>{
                if(res.code == 200){
                    $this.total = res.data.count
                    res.data.list.map(function(val,key){
                    // 序号
                    val.sort = key * this.page + 1
                    val.url = $this.globalBaseUrl + '/' + val.image_url
                    },{
                      page:this.requestData.page
                    })
                    $this.tableData = res.data.list
                    $this.countPage = Math.ceil(parseInt($this.totalCount) / parseInt($this.requestData.pageSize))
                }
            })
      },
      // 打开详情编辑
      detail(index,id){
          getCarouselInfo(id).then(res => {
              if(res.code == 200){
                $this.form.id = res.data.id
                $this.form.name = res.data.name
                $this.form.is_enabled = res.data.is_enabled
                $this.image_url = $this.globalBaseUrl + '/' + res.data.image_url
                $this.form.content = res.data.content
                $this.form.add_by = res.data.add_by
                $this.form.image_url = res.data.image_url
                $this.dialogFormVisible = true
              }
          })
      },
      // 关闭回调
      cancelCarousel(){
          $this.dialogFormVisible = false
          $this.getList()
      },
      // 编辑提交
      submitCarouselInfo(){
          updateCarouselInfo($this.form).then(res=>{
              if(res.code == 200 ){
                this.$message({
                    message  : '修改成功',
                    type     : "success"
                })
                $this.dialogFormVisible = false
              }
          })
      },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      let id = $this.form.id
      let str = JSON.stringify({update_by:JSON.parse(this.$store.state.userInfo).user_name,id:id})
      $this.dataList.other = str
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 10
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return type && isLt5M
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
        if(res.code === 200){
            $this.image_url = $this.globalBaseUrl + '/' + res.data.url
            $this.form.image_url = res.data.url
        }
    },
    // 打开添加窗口
    openDialog(){
        $this.dialogFormVisibleAdd = true
    },
    // 关闭添加窗口
    cancelCarouselAdd(){
        // 清除表单验证并且重置表单
        this.$refs['form_add'].resetFields();
        $this.getList()
        $this.dialogFormVisibleAdd = false
    },
    // 新增提交窗口
    submitCarouselInfoAdd(formName){
        $this.$refs[formName].validate((valid) => {
          // 验证表单后的操作
          if (valid) {
            $this.form_add.add_by = JSON.parse(this.$store.state.userInfo).user_name
            addCarousel($this.form_add).then(res => {
                if(res.code == 200){
                    this.$message({
                        message  : '新增成功',
                        type     : "success",
                        duration : 1500,
                    })
                    $this.cancelCarouselAdd();
                }
            })
          } else {
                this.$message({
                    message  : '请将表单填写完整',
                    type     : "error",
                    duration : 1000,
                })
          }
        });
 
    },
    // 新增的时候的成功回调
    handleAvatarSuccessAdd(res){
        if(res.code === 200){
            $this.image_url = $this.globalBaseUrl + '/' + res.data.url
            $this.form_add.image_url = res.data.url
        }
    },
    // 上传前格式和图片大小限制
    beforeAvatarUploadAdd(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 10
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return type && isLt5M
    },
  },
  // 监听器
  watch : {
      'form_add.image_url':{
       handler(newVal,oldVal){
            this.$nextTick( ()=> {
                this.$refs['form_add'].clearValidate(['image_url']);
            })
       },
       deep: true
      }
  },
  components: {},
  beforeCreate() {
      $this = this;
  },
}
</script>