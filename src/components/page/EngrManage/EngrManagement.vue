<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>实施员管理</el-breadcrumb-item>
                <el-breadcrumb-item>实施员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchSetting.searchData.select_cate" placeholder="字段名称" class="handle-select mr10">
                    <el-option :label="items.label" :value="items.value" v-for="(items,indexs) in searchSetting.options"></el-option>
                </el-select>
                <el-input v-model="searchSetting.searchData.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableSetting.tableData" border class="table" ref="engrManageTab"  style="width:100%;" :highlight-current-row="status.highlight"  row-key="id" >
                <el-table-column prop="staff_realname" label="管理员姓名"  width="235"></el-table-column>
                <el-table-column prop="staff_name" label="登录名称"  width="235"></el-table-column>
                <el-table-column prop="staff_pwd" label="登录密码"  width="235"></el-table-column>
                <el-table-column prop="role_name" label="权限分组"  width="235" :formatter="formatter" :filters="tableSetting.filters" :filter-method="filterTag" filter-placement="bottom-end"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableSetting.totalPage">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="status.editVisible" width="30%">
            <el-form  ref="editForm" :model="editForm" label-width="100px" :rules="rules">
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="管理员姓名">
                            <el-input v-model.trim="editForm.staff_realname" maxlength="10" show-word-limit></el-input>
                        </el-form-item>       
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="登录名称">
                            <el-input v-model.trim="editForm.staff_name"></el-input>
                        </el-form-item>       
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="登录密码" prop="staff_pwd">
                            <el-input v-model.trim="editForm.staff_pwd"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row v-if="editSetting.showConfirmInput">
                    <el-col :span="15">
                        <el-form-item label="确认密码" prop="confirm_pwd" > 
                            <el-input v-model.trim="editForm.confirm_pwd"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="请选择权限" prop="role_name">
                            <el-select v-model.trim="editForm.role_name" placeholder="请选择权限分组">
                                <el-option v-for="item in editSetting.authority" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="status.editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
       <el-dialog title="提示" :visible.sync="status.delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="status.delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableSetting:{
                    tableData:[
                        {
                            staff_realname:'芬达',
                            staff_name:'fenda',
                            staff_pwd:'123456',
                            role_name:'200'
                        },
                        {
                            staff_realname:'雪碧',
                            staff_name:'xuebi',
                            staff_pwd:'sssssaaa',
                            role_name:'100'
                        },
                        {
                            staff_realname:'可乐',
                            staff_name:'kele',
                            staff_pwd:'sssssaaa',
                            role_name:'300'
                        },
                    ],
                    filters:[
                        { text: '管理员', value: '100' }, 
                        { text: '财务人员', value: '200' },
                        { text: '实施员', value: '300' }
                    ],
                    curPage: 1,
                    totalPage:100,
                },
                searchSetting:{
                    searchData:{
                        select_cate:'',
                        select_word:'',
                    },
                    options:[
                        {
                            value:'staff_realname',
                            label:'管理员姓名'
                        },
                        {
                            value:'staff_name',
                            label:'登录名称'
                        }
                    ]
                },
                editSetting:{
                    authority:[
                        {
                            value:'100',
                            label:'管理员'
                        },
                        {
                            value:'200',
                            label:'财务人员'
                        },
                        {
                            value:'300',
                            label:'实施员'
                        }
                    ],
                    showConfirmInput:false
                },
                editForm: {
                    staff_realname: '',
                    staff_name: '',
                    staff_pwd: '',
                    role_name:''
                },
                status:{
                    stripe:true,
                    highlight:true,
                    showSubTable:false,
                    editVisible: false,
                    delVisible: false,
                },
                idx: -1,//选中行的索引
                rules:{
                    staff_pwd:[
                        { validator: this.checkPass, trigger: 'blur' }
                    ],
                    confirm_pwd:[
                        { validator: this.checkConfirmPass, trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            checkPass(rule, value, callback){
                if (!value) {
                    return callback(new Error('请输入管理员登录密码'));
                }
                if(!(/^[a-zA-Z0-9]+$/.test(value))){
                    return callback(new Error('登录密码不能有特殊字符!'));
                }
                callback();
            },
            checkConfirmPass(rule, value, callback){
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                }
                if(value !== this.form.staff_pwd){
                    return callback(new Error('两次输入密码不一致!'));
                }
                callback();
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
               /* if (process.env.NODE_ENV === 'development') {
                    this.url = './static/vuetable.json';
                };
                
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })*/
            },
            search() {
                //this.is_search = true;
            },
            formatter(row, column) {
                switch (row.role_name) {
                    case '100':
                        return '管理员';
                        break;
                    case '200':
                        return '财务人员';
                        break;
                    case '300':
                        return '实施员';
                        break;
                    default:
                        return '未知权限分组';
                }
                return row.role_name;
            },
            filterTag(value, row) {
                return row.role_name === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableSetting.tableData[index];
                this.editForm = {
                    staff_realname: item.staff_realname,
                    staff_name: item.staff_name,
                    staff_pwd: item.staff_pwd,
                    role_name: item.role_name
                }
                this.status.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.status.delVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableSetting.tableData, this.idx, this.editForm);
                this.status.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableSetting.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.status.delVisible = false;
            }
        },
        watch:{
            'editForm.staff_pwd':function(newVal,oldVal){
                if(newVal != this.tableSetting.tableData[this.idx].staff_pwd){
                    this.editSetting.showConfirmInput = true
                }else{
                    this.editSetting.showConfirmInput = false
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .el-table .warning-row {
        background: oldlace;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>