<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>服务单管理</el-breadcrumb-item>
                <el-breadcrumb-item>服务单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchSetting.searchData.select_cate" placeholder="字段名称" class="handle-select mr10">
                    <el-option :label="items.label" :value="items.value" v-for="(items,indexs) in searchSetting.options" :key="`opt_${indexs}`"></el-option>
                </el-select>
                <el-input v-model="searchSetting.searchData.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableSetting.tableData" border class="table" ref="serviceManageTab"  style="width:100%;" highlight-current-row  row-key="id">
                <el-table-column prop="cus_name" label="客户名称"  width="150" fixed  align="center"></el-table-column>
                <el-table-column prop="contract_id" label="合同编号"  width="230" fixed align="center"></el-table-column>
                <el-table-column prop="service_id" label="服务单编号"  width="180" fixed align="center"></el-table-column>
                <el-table-column prop="staff_name" label="实施员名称"  width="100" fixed="right" align="center"></el-table-column>
                <el-table-column prop="service_type" label="实施类型"  width="100"  :formatter="serviceType" :filters="serviceTypeFilters" :filter-method="serviceTypeFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                <el-table-column prop="service_begin_date" label="实施日期"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="service_end_date" label="结束日期"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="service_remark" label="服务内容"  width="200" align="center">
                     <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_remark }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-button type="success" round size="large">点击查看服务内容</el-button>
                            </div>
                        </el-popover>
                    </template>     
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">作废</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableSetting.totalPage">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="status.editVisible" width="40%">
            <el-form  ref="editForm" :model="editForm" label-width="120px" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称">
                            <el-cascader placeholder="选择客户名称" filterable :options="cusName"  v-model="editForm.cus_id" disabled></el-cascader>
                        </el-form-item>       
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同编号">
                            <el-input v-model.trim="editForm.contract_id" disabled></el-input>
                        </el-form-item>       
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实施类型">
                            <el-select v-model="editForm.service_type" placeholder="选择实施类型" disabled>
                                <el-option v-for="item in serviceTypeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>       
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实施开始日期" prop="service_begin_date">
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="editForm.service_begin_date" style="width: 100%;"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实施结束日期" prop="service_end_date">
                            <el-date-picker type="date" placeholder="选择结束日期" v-model="editForm.service_end_date" style="width: 100%;"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="服务内容" prop="contract_remark">
                            <el-input type="textarea" rows="5" v-model.trim="editForm.contract_remark" placeholder="请填写服务内容"  maxlength="200" show-word-limit></el-input>
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
            <div class="del-dialog-cnt">作废不可恢复，是否确定作废？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="status.delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { serviceTabRules } from '@/until/rules';
    import { serviceTypeFilters } from '@/until/filters';
    import { serviceTypeFormatter } from '@/until/formatter';
    import { serviceTypeOptions } from '@/until/options';
    export default {
        data() {
            return {
                cusName:[
                    {
                        value: '1',
                        label: '重庆永利',
                    },
                    {
                        value: '2',
                        label: '宁波伟捷包装' 
                    },
                    {
                        value: '3',
                        label: '上海' 
                    },
                ],
                tableSetting:{
                    tableData:[
                        {
                            cus_id:'1',
                            cus_name:'重庆永利',
                            contract_id:'LP2019-X001-2019071801',
                            service_id:'20190701010102',
                            staff_name:'百事可乐',
                            service_type:'0',
                            service_begin_date:'2019-06-18',
                            service_end_date:'2019-12-31',
                            service_remark:'这是服务内容信息这是服务内容信息这是服务内容信息',
                        },
                        {
                            cus_id:'2',
                            cus_name:'宁波伟捷包装',
                            contract_id:'LP2019-X001-2019071801',
                            service_id:'20190701010102',
                            staff_name:'百事可乐',
                            service_type:'1',
                            service_begin_date:'2019-07-18',
                            service_end_date:'2019-12-31',
                            service_remark:'这是服务内容信息这是服务内容信息这是服务内容信息',
                        },
                        {
                            cus_id:'3',
                            cus_name:'上海',
                            contract_id:'LP2019-X001-2019071801',
                            service_id:'20190701010102',
                            staff_name:'百事可乐',
                            service_type:'1',
                            service_begin_date:'2019-07-18',
                            service_end_date:'2019-12-31',
                            service_remark:'这是服务内容信息这是服务内容信息这是服务内容信息',
                        },
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
                            value:'cus_name',
                            label:'客户名称'
                        },
                        {
                            value:'contract_id',
                            label:'合同编号'
                        },
                        {
                            value:'service_id',
                            label:'服务单编号'
                        },
                        {
                            value:'staff_name',
                            label:'实施员姓名'
                        }
                    ]
                },
                editForm:{},
                status:{
                    stripe:true,
                    highlight:true,
                    showSubTable:false,
                    delVisible:false,
                    editVisible:false
                },
            }
        },
        created() {
            this.getData();
        },
        computed:{
            rules(){
                return serviceTabRules;
            },
            serviceTypeFilters(){
                return serviceTypeFilters;
            },
            serviceTypeOpt(){
                return serviceTypeOptions;
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
               
            },
            // 搜索
            search() {
               
            },
            serviceType(row, column) {
                return serviceTypeFormatter(row.service_type);
            },
            serviceTypeFilterTag(value, row) {
                return row.service_type === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableSetting.tableData[index];
                this.editForm = Object.assign({},this.editForm,item);
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

</style>
<style>
    .el-popover {
        background: #ffec0d;
    }
    .current-row > td {
       background: rgba(0, 158, 250, 0.219) !important;
    }
</style>