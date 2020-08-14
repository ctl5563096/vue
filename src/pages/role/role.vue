<style>
  .role .title{
    margin-bottom: 10px;
  }

  .role .select{
    margin-bottom: 10px;
  }
  .role .el-row{
      margin-bottom: 10px;
  }
</style>
<template>
<div class="role">
  <h1 class="title">权限管理</h1>
  <el-row>
    <el-button @click="changeRule()" :loading="button">修改角色权限</el-button>
  </el-row>
    <el-select v-model="roleValue" placeholder="请选择角色" class="select" @change="roleRule()">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.role"
      :value="item.id">
    </el-option>
  </el-select>
  <el-tree
  :data="tree"
  :props="props"
  :check-strictly="systemNodeFlag"
  node-key="id"
  :default-checked-keys="selected"
  :default-expand-all="true"
  :highlight-current="true"
  ref="tree"
  show-checkbox>
</el-tree>
</div>
</template>
<script>
import {getRuleByRole,getRole,getRule,changeRoleRule} from '../../../global/api.js';
var $this = {};
  export default {
    data() {
      return {
        tree:[],
        props: {
          label: 'label',
          children: 'childNode'
        },
        count: 1,
        options: [],
        roleValue:'',
        selected:[],
        button: false,
        systemNodeFlag: false
    }},
    beforeCreate() {
        $this = this;
    },
    created(){
      // 获取所有的角色
      getRole().then(res => {
        $this.options = res.data  
      });
      // 获取所有的权限
      getRule().then(res => {
        $this.tree = res.data
      })
  },
    methods: {
      // 获取角色的权限
      roleRule(){
        getRuleByRole($this.roleValue).then(res => {
          $this.systemNodeFlag = true
          console.log($this.systemNodeFlag);
          let ruleArr = [];
          for(let i in res.data) {  
              ruleArr.push(parseInt(res.data[i].id))
          };  
          console.log(ruleArr);
          $this.selected = ruleArr
          // 需要更新dom
          this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys($this.selected) //给树节点赋值
              this.systemNodeFlag = false //重点： 赋值完成后 设置为false
          })
        });
      },
      // 提交改变权限
      changeRule(){
        this.$confirm('确定改变角色权限？' , '提示' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let changeRuleArr = $this.$refs.tree.getCheckedKeys();
          if($this.roleValue === ''){
            this.$message({
              type: 'error',
              message: '请选择角色',
              duration: 1000
            }) 
            return false
          }
          let params = {};
          params.changeRuleArr = changeRuleArr
          params.id = $this.roleValue
          $this.button = true
          console.log(params);
          return
          changeRoleRule(params).then(res => {
            $this.button = false
            this.$message({
              type: 'esuccess',
              message: '修改成功',
              duration: 1500
            }) 
          })
        }).catch(() => {
        });
      },
    }
  };
</script>