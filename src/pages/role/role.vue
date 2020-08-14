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
    <span class="custom-tree-node" slot-scope="{node}">
      <span style="font-size:14px">
        {{ node.label }}&nbsp;&nbsp;&nbsp;<i class="el-icon-edit" @click.stop="editRule(node)"></i>&nbsp;&nbsp;&nbsp;<i class="el-icon-remove" @click.stop="delRule(node)"></i>&nbsp;&nbsp;&nbsp;
        <i class="el-icon-circle-plus" v-if="showIcon(node)" @click.stop="addRule(node)"></i>
      </span>       
    </span>
</el-tree>
<el-dialog title="" :visible.sync="modalBool">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modalBool = false">取 消</el-button>
    <el-button type="primary" @click="modalBool = false">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import {getRuleByRole,getRole,getRule,changeRoleRule,delRule} from '../../../global/api.js';
var $this = {};
  export default {
    data() {
      return {
        tree:[],
        props: {
          label: 'label',
          children: 'childNode',
          disabled: $this.changeSelected
        },
        count: 1,
        options: [],
        roleValue:'',
        selected:[],
        button: false,
        systemNodeFlag: false,
        modalBool:false,
              gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
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
          let ruleArr = [];
          for(let i in res.data) {  
              ruleArr.push(parseInt(res.data[i].id))
          };  
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
          // 将半选中的和选中的合并
          let changeRuleArr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
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
          changeRoleRule(params).then(res => {
            $this.button = false
            if(res.code === 200){
              this.$message({
                type: 'esuccess',
                message: '修改成功',
                duration: 1500
              }) 
            }
          })
        }).catch(() => {
        });
      },
      changeSelected(){
          // 禁用超级管理员可选择
          if(parseInt($this.roleValue) === 1){
            return true
          }else{
            return false
          }
      },
      // 修改权限
      editRule(e){
        alert(e.data.id)
      },
      // 删除权限
      delRule(e){
        this.$confirm('确定删除菜单以及下面所有的子菜单吗？' , '提示' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
        })
      },
      // 增加权限
      addRule(e){
        alert(e.data.id)
      },
      // 展示添加图标
      showIcon(e){
        console.log(e.data);
        if(e.data.childNode !== undefined || parseInt(e.data.pid) === 0){
          return true
        }else{
          return false
        }
      }
    }
  };
</script>