<style scoped>
  .el-pagination{
    float: right;
  } 
  #footer{
    margin-top: 50px
  }
</style>
<template>
  <div id="carousel">
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
  </div>
</template>
    
<script>
import{
getCarousel
} from '../../../global/api/systemApi.js';
var $this = this;
export default {
  name: 'carousel',
  inject:['reload'],
  data () {
      return {
        total:0,
        countPage:0,
        requestData:{
            page:1,
            pageSize:10,
        },
        tableData:[],
        totalCount:0,
      };
  },
  computed: {},
  created(){
        // 初始化列表
        $this.getList()
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
      // 点击查看大图
      checkBigImage(url){
          console.log(url);
      }
  },
  components: {},
  beforeCreate() {
      $this = this;
  },
}
</script>