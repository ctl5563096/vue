 <style>
</style>
<template>
  <div id="home">
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="房屋地址:">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="入住人身份证:">
            <span>{{ props.row.id_card }}</span>
          </el-form-item>
          <el-form-item label="楼层:">
            <span>{{ props.row.floor }}</span>
          </el-form-item>
          <el-form-item label="租金:">
            <span>{{ props.row.money / 100 }}</span>
          </el-form-item>
          <el-form-item label="本月是否支付租金:">
            <span>{{ props.row.pay }}</span>
          </el-form-item>
          <el-form-item label="房间面积:">
            <span>{{ props.row.size }}</span>
          </el-form-item>
          <el-form-item label="合同开始时间:">
            <span>{{ props.row.in_time }}</span>
          </el-form-item>
          <el-form-item label="合同结束时间:">
            <span>{{ props.row.out_time }}</span>
          </el-form-item>
          <el-form-item label="负责人:">
            <span>{{ props.row.charger }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="序号"
      prop="sort">
    </el-table-column>
    <el-table-column
      label="租客真实姓名"
      prop="real_name">
    </el-table-column>
    <el-table-column
      label="客户联系方式"
      prop="phone_num">
    </el-table-column>
    <el-table-column
      label="顾客来源"
      prop="origin">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import{
    getHomeList,
} from '../../../global/api/homeApi.js';
var $this = this;
export default {
  name: 'home',
  inject:['reload'],
  data () {
    return {
      tableData:[],
    }
  },
  computed: {},
  created(){
        // 初始化列表
        let params = this.$route.query
        let id = params.id
        $this.getList(id)
  },
  methods:{
      // 获取列表详情
      getList(id){
          getHomeList(id).then(res => {
              if(res.code == 200){
                  res.data.list.map(function(val,key){
                  // 序号
                  val.sort = key + 1
                  })
                  $this.tableData = res.data.list
              }
          })
      },
  },
  components: {},
  beforeCreate() {
      $this = this;
  },
}
</script>