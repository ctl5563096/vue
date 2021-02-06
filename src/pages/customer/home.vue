 <style>
</style>
<template>
    <div id="homeCustomer">
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
              @click="detail(edit.$index, edit.row)">编辑</el-button>
            <!-- <el-button
              size="small"
              type="danger"
              @click="deleteData(edit.$index, edit.row)">删除</el-button> -->
        </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
import{
    getHomeCustomer
} from '../../../global/api/customerApi.js';
var $this = this;
export default {
    name: 'homeCustomer',
    inject:['reload'],
    data () {
        return {
            total:0,
            countPage:0,
            requestData:{
                page:1,
                pageSize:10,
                keywords:''
            },
            tableData:[],
            totalCount:0,
            options_params_origin:[]
        };
    },
    computed: {},
    created(){
        // 初始化列表
        $this.getList(),
        $this.options_params_origin = this.$store.state.parameter.customerOrigin
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
            getHomeCustomer(page,pageSize,keywords).then(res => {
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
        }
    },
    components: {},
    beforeCreate() {
        $this = this;
    },
}
</script>