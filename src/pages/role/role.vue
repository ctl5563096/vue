<style>
.role .title {
    margin-bottom: 10px;
}

.role .select {
    margin-bottom: 10px;
}

.role .el-row {
    margin-bottom: 10px;
}

.role .rule_input_width {
    width: 300px
}
</style>
<template>
<div class="role">
    <h1 class="title">权限管理</h1>
    <el-row>
        <el-button @click="changeRule()" :loading="button">修改角色权限</el-button>
    </el-row>
    <el-select v-model="roleValue" placeholder="请选择角色" class="select" @change="roleRule()">
        <el-option v-for="item in options" :key="item.id" :label="item.role" :value="item.id">
        </el-option>
    </el-select>
    <el-tree :data="tree" :props="props" :check-strictly="systemNodeFlag" node-key="id" :default-checked-keys="selected" :default-expand-all="true" :highlight-current="true" ref="tree" show-checkbox>
        <span class="custom-tree-node" slot-scope="{node}">
            <span style="font-size:14px">
                {{ node.label }}&nbsp;&nbsp;&nbsp;<i class="el-icon-edit" @click.stop="editRule(node)"></i>&nbsp;&nbsp;&nbsp;<i class="el-icon-remove" @click.stop="delRule(node)"></i>&nbsp;&nbsp;&nbsp;
                <i class="el-icon-circle-plus" v-if="showIcon(node)" @click.stop="addRule(node)"></i>
            </span>
        </span>
    </el-tree>
    <el-dialog :title="title" :visible.sync="modalBool" @close="reset">
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="权限名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off" type="text" class="rule_input_width"></el-input>
            </el-form-item>
            <el-form-item label="是否顶级权限" :label-width="formLabelWidth" prop="is_top">
                <el-radio-group v-model="form.is_top" @change="changePid">
                    <el-radio label="1">否</el-radio>
                    <el-radio label="2">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为菜单" :label-width="formLabelWidth" prop="is_menu">
                <el-radio-group v-model="form.is_menu" @change="showInput">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="页面路径" :label-width="formLabelWidth" v-show="is_show_input" prop="url">
                <el-input v-model="form.url" autocomplete="off" type="text" class="rule_input_width"></el-input>
            </el-form-item>
            <el-form-item label="icon图标" :label-width="formLabelWidth" prop="icon">
                <el-input v-model="form.icon" autocomplete="off" type="text" class="rule_input_width"></el-input>
            </el-form-item>
            <el-form-item label="控制器" :label-width="formLabelWidth" prop="controller">
                <el-input v-model="form.controller" autocomplete="off" type="text" class="rule_input_width"></el-input>
            </el-form-item>
            <el-form-item label="方法" :label-width="formLabelWidth" prop="action">
                <el-input v-model="form.action" autocomplete="off" type="text" class="rule_input_width"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalBool = false">取 消</el-button>
            <el-button type="primary" @click="addNewRule('ruleForm')" :loading="button">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    getRuleByRole,
    getRole,
    getRule,
    changeRoleRule,
    delRule,
    addRule,
    getRuleDetail,
    editRule
} from '../../../global/api.js';
var $this = {};
export default {
    data() {
        // 验证url输入框
        let validateUrl = (rule, value, callback) => {
            if (parseInt(this.form.is_menu) == 2 && value === '') {
                callback(new Error('此为菜单栏,请输入页面url'));
            } else {
                callback();
            }
        };
        return {
            tree: [],
            props: {
                label: 'label',
                children: 'childNode',
                disabled: $this.changeSelected
            },
            count: 1,
            options: [],
            roleValue: '',
            selected: [],
            button: false,
            systemNodeFlag: false,
            modalBool: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                url: '',
                is_menu: '0',
                icon: "",
                is_top: '1',
                pid: 0,
                controller: '',
                action: ''
            },
            addForm: {
                name: '',
                url: '',
                is_menu: '0',
                icon: "",
                is_top: '1',
                pid: 0,
                controller: '',
                action: ''
            },
            formLabelWidth: '120px',
            formInputWidth: '300px',
            is_show_input: false,
            node: {},
            rules: {
                name: [{
                    required: true,
                    message: '请输入权限名称',
                    trigger: 'blur'
                }, ],
                url: [{
                    validator: validateUrl,
                    trigger: 'blur'
                }],
                is_show: [],
                is_top: [],
                icon: [],
                controller: [],
                action: []
            },
            topArr: [],
            title: '添加权限',
            status: '',
            ruleId: ''
        }
    },
    beforeCreate() {
        $this = this;
    },
    created() {
        // 获取所有的角色
        getRole().then(res => {
            $this.options = res.data
        });
        // 获取所有的权限
        getRule().then(res => {
            $this.tree = res.data
            // 把所有的顶级菜单放进一个数组,方便下面判断是否显示添加图标
            res.data.forEach(function (item, index) {
                $this.topArr.push(parseInt(item.id))
            })
        })
    },
    methods: {
        // 获取角色的权限
        roleRule() {
            getRuleByRole($this.roleValue).then(res => {
                $this.systemNodeFlag = true
                let ruleArr = [];
                for (let i in res.data) {
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
        changeRule() {
            this.$confirm('确定改变角色权限？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                // 将半选中的和选中的合并
                let changeRuleArr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
                if ($this.roleValue === '') {
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
                    if (res.code === 200) {
                        this.$message({
                            type: 'esuccess',
                            message: '修改成功',
                            duration: 1500
                        })
                    }
                })
            }).catch(() => {});
        },
        changeSelected() {
            // 禁用超级管理员可选择
            if (parseInt($this.roleValue) === 1) {
                return true
            } else {
                return false
            }
        },
        // 修改权限
        editRule(e) {
            getRuleDetail(e.data.id).then(res => {
                if (res.code === 200) {
                    $this.title = "修改权限"
                    $this.modalBool = true
                    $this.status = 'edit'
                    $this.form.name = res.data[0].rule_name
                    $this.ruleId = res.data[0].id
                    $this.form.pid = res.data[0].pid
                    $this.form.is_menu = res.data[0].is_menu
                    $this.form.icon = res.data[0].icon
                    $this.form.url = res.data[0].url
                    $this.form.action = res.data[0].action
                    $this.form.controller = res.data[0].controller
                    if (res.data[0].pid == 0) {
                        $this.form.is_top = '2'
                    } else {
                        $this.form.is_top = '1'
                    }
                    if (res.data[0].is_menu == 1) {
                        $this.is_show_input = true
                    }
                }
            })
        },
        // 删除权限
        delRule(e) {
            this.$confirm('确定删除菜单以及下面所有的子菜单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                console.log(e.data.id);
                delRule(e.data.id).then(res => {
                    if(res.code === 200){
                        $this.$message({
                            type: 'success',
                            message: '删除成功',
                            duration: 1500
                        })
                        getRule().then(res => {
                                    $this.tree = res.data
                                    $this.modalBool = false
                        })
                    }else{
                            $this.$message({
                            type: 'error',
                            message: '删除失败',
                            duration: 1500
                        })
                    }
                })
            })
        },
        // 增加权限
        addRule(e) {
            $this.form = $this.addForm
            $this.modalBool = true
            $this.title = '添加权限'
            $this.status = 'add'
            $this.node = e
            if (parseInt($this.form.is_top) === 1) {
                $this.form.pid = e.data.id
            }
        },
        // 展示添加图标
        showIcon(e) {
            if (parseInt(e.data.pid) === 0 || $this.topArr.includes(parseInt(e.data.pid))) {
                return true
            } else {
                return false
            }
        },
        // 判断是否展示url输入框
        showInput() {
            if ($this.form.is_menu == 0) {
                $this.is_show_input = false
                $this.form.url = ''
            } else if ($this.form.is_menu == 1) {
                $this.is_show_input = true
                $this.form.url = ''
            }
        },
        // 确定关闭对话框回调
        addNewRule(formName) {
            // 判断是添加还是修改
            if ($this.status === 'add') {
                $this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 删除不必要参数
                        delete $this.form.is_top
                        addRule($this.form).then(res => {
                            if (parseInt(res.code) === 200) {
                                getRule().then(res => {
                                    $this.tree = res.data
                                    $this.modalBool = false
                                })
                            }
                        })
                    } else {
                        $this.$message({
                            type: 'error',
                            message: '提交失败,请修改',
                            duration: 1500
                        })
                    }
                });
            } else if ($this.status === 'edit') {
                if ($this.ruleId === '') {
                    $this.$message({
                        type: 'error',
                        message: '系统错误，请联系管理员',
                        duration: 1500
                    })
                    return false
                }
                $this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 删除不必要参数
                        delete $this.form.is_top
                        let params = $this.form
                        params.id = $this.ruleId
                        editRule(params).then(res => {
                            if (parseInt(res.code) === 200) {
                                getRule().then(res => {
                                    $this.$message({
                                        type: 'success',
                                        message: '修改成功',
                                        duration: 1500
                                    })
                                    $this.tree = res.data
                                    $this.modalBool = false
                                })
                            }
                        })
                    } else {
                        $this.$message({
                            type: 'error',
                            message: '提交失败,请修改',
                            duration: 1500
                        })
                    }
                });
            }
        },
        // 防止改变顶级菜单
        changePid() {
            // 判断是否为顶级菜单
            if (parseInt($this.form.is_top) === 1) {
                $this.form.pid = $this.node.data.id
            } else if (parseInt($this.form.is_top) === 2) {
                $this.form.pid = 0
            }
        },
        // 关闭dialog对话框时触发事件
        reset() {
            $this.$refs.ruleForm.resetFields()
            $this.status = ''
            $this.title = '添加权限'
            $this.is_show_input = false
        }
    }
};
</script>
