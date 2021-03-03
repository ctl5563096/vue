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
</style>
<template>
  <div id="user">
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
      carouselList:{}
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