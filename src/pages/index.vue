<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .header{
    width: 50%;
  }

  .el-image{
    width: 100%;height: 100%;
  }

   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<template>
  <div id="index">
    <el-row>
    <div id='header'>
    <el-col :span="12" :offset="6">
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item,index) in carouselList" :key="index">
      <div style="width: 100%;height: 100%;">
        <el-image :src="item.image_url"></el-image>
      </div>
    </el-carousel-item>
    </el-carousel>
    </el-col>
    </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <highcharts :options="chartOptions"></highcharts>
        </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getCarouselList
} from '../../global/api.js';
var $this = {};
export default {
  name: 'index',
  inject:['reload'],
  data(){
    return{
      carouselList:{},
      chartOptions: {
        series: [{
          data: [1, 2, 3] // sample data
        }]
      }
    }
  },
  created(){
      // 初始化获取轮播图列表
      $this.getList()
  },
  methods:{
    getList(){
      getCarouselList().then(res => {
        if(res.code == 200){
          res.data.map(function(val,key){
              // 序号
              val.image_url = $this.globalBaseUrl + '/' + val.image_url
          })
          $this.carouselList = res.data
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