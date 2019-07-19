<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" >
                <el-breadcrumb-item>合同管理</el-breadcrumb-item>
                <el-breadcrumb-item>合同审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="handle-box">
                <el-select v-model="searchSetting.searchData.select_cate" placeholder="字段名称" class="handle-select mr10">
                    <el-option :label="items.label" :value="items.value" v-for="(items,indexs) in searchSetting.options" :key="`opt_${indexs}`"></el-option>
                </el-select>
                <el-input v-model="searchSetting.searchData.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableSetting.tableData" border class="table" ref="cusManageTab"  style="width:100%;" :highlight-current-row="status.highlight" >
                <el-table-column prop="contract_id" label="合同编号"  width="230" fixed  align="center"></el-table-column>
                <el-table-column prop="propose_cus" label="客户名称"  width="150" fixed  align="center"></el-table-column>
                <el-table-column prop="contract_type" label="合同类型"  width="150"  :formatter="contractTypeFormatter" :filters="tableSetting.contractTypeFilters" :filter-method="contractTypeFilterTag" filter-placement="bottom-end"  align="center"></el-table-column>
                <el-table-column prop="contract_on_date" label="合同签订日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="contract_amt" label="合同金额"  width="150"  align="center"></el-table-column>
                <el-table-column prop="contract_agree_amt" label="合同约定金额"  width="150"  align="center"></el-table-column>
                <el-table-column prop="contract_begin_date" label="合同开始日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="contract_end_date" label="合同结束日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="contract_ispay" label="是否付清"  width="150" :formatter="contractIspayFormatter"  align="center" ></el-table-column>
                <el-table-column prop="contract_isinv" label="是否开票"  width="150" :formatter="contractIsinvFormatter"  align="center"></el-table-column>
                <el-table-column prop="contract_remark" label="合同备注"  width="150"  align="center"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger"  @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableSetting.totalPage">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="editForm.contract_id" :visible.sync="status.editVisible" width="40%">
            <el-form  ref="editForm" :model="editForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称">
                            <el-input v-model.trim="editForm.propose_cus" :disabled="true"></el-input>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同类型">
                            <el-select v-model="editForm.contract_type" disabled placeholder="请选择">
                                <el-option v-for="item in editSetting.contractTypeOpt" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同签订日期">
                            <el-input v-model.trim="editForm.contract_on_date" :disabled="true" suffix-icon="el-icon-date"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同金额">
                            <el-input v-model.trim="editForm.contract_amt" :disabled="true"></el-input>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同约定金额">
                            <el-input v-model.trim="editForm.contract_agree_amt" :disabled="true"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同开始日期">
                            <el-input v-model.trim="editForm.contract_begin_date" :disabled="true" suffix-icon="el-icon-date"></el-input>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同结束日期">
                            <el-input v-model.trim="editForm.contract_end_date" :disabled="true" suffix-icon="el-icon-date"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="审核状态">
                            <el-radio v-model="editForm.contract_checked" label="0" border>未通过</el-radio>
                            <el-radio v-model="editForm.contract_checked" label="1" border>通过</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="status.editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '@/store/store';
    import { contractType,contractIspay,contractIsinv  } from '@/until/formatter';
    import { contractTypeFilters } from '@/until/filters';
    import { contractTypeOptions } from '@/until/options';
    export default {
        data() {
            return {
                tableSetting:{
                    tableData:[
                        {
                            contract_id:'LP2019-X001-2019071801',
                            propose_cus:'重庆永利',
                            contract_type:'0',
                            contract_on_date:'2017-07-18',
                            contract_begin_date:'2017-06-18',
                            contract_end_date:'2017-08-18',
                            contract_ispay:'1',
                            contract_isinv:'1',
                            contract_checked:'0',
                            contract_remark:'',
                            contract_amt:'5000',
                            contract_agree_amt:'5000'
                        },
                        {
                            contract_id:'LP2019-X001-2019071801',
                            propose_cus:'重庆永利',
                            contract_type:'1',
                            contract_on_date:'2017-07-18',
                            contract_begin_date:'2017-06-18',
                            contract_end_date:'2017-08-18',
                            contract_ispay:'1',
                            contract_isinv:'1',
                            contract_checked:'0',
                            contract_remark:'',
                            contract_amt:'5000',
                            contract_agree_amt:'5000'
                        }

                    ],
                    contractTypeFilters:[],
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
                            value:'propose_cus',
                            label:'客户名称'
                        },
                        {
                            value:'contract_on_date',
                            label:'合同签订日期'
                        }
                    ]
                },
                editSetting:{
                    contractTypeOpt:[], 
                },
                editForm: {
                    contract_id: '',
                    propose_cus: '',
                    contract_type: '',
                    contract_on_date:'',
                    contract_amt:'',
                    contract_agree_amt:'',
                    contract_begin_date:'',
                    contract_end_date:'',
                    contract_remark:''
                },
                status:{
                    editVisible:false,
                    highlight:true,
                },
                idx: -1,//选中行的索引
            }
        },
        created() {
            this.tableSetting.contractTypeFilters = contractTypeFilters;
            this.editSetting.contractTypeOpt = contractTypeOptions
            this.getData();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
               console.dir('getData');
            },
            search() {
                console.dir('search');
            },
            contractTypeFormatter(row, column){
                return contractType(row.contract_type);
            },
            contractIspayFormatter(row, column) {
                return contractIspay(row.contract_ispay);
            },
            contractIsinvFormatter(row,column){
                return contractIsinv(row.contract_isinv);
            },
            contractTypeFilterTag(value, row){
                return row.contract_type === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableSetting.tableData[index];
                this.editForm = Object.assign({},this.editForm,item);
                this.status.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableSetting.tableData, this.idx, this.editForm);
                this.status.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
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
    .el-table__header th, .el-table__header tr {
        border:1px solid #F00;
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