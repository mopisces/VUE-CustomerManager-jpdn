<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>合同管理</el-breadcrumb-item>
                <el-breadcrumb-item>合同列表</el-breadcrumb-item>
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
                <el-table-column prop="contract_id" label="合同编号"  width="230" fixed align="center"></el-table-column>
                <el-table-column prop="propose_cus" label="客户名称"  width="150" fixed align="center"></el-table-column>
                <el-table-column prop="contract_type" label="合同类型"  width="150"  :formatter="contractTypeFormatter" :filters="contractTypeFilters" :filter-method="contractTypeFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                <el-table-column prop="contract_on_date" label="合同签订日期"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="contract_amt" label="合同金额"  width="150" align="center"></el-table-column>
                <el-table-column prop="contract_agree_amt" label="合同约定金额"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="contract_begin_date" label="合同开始日期"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="contract_end_date" label="合同结束日期"  width="150" sortable align="center"></el-table-column>
                <el-table-column prop="contract_ispay" label="付款状态"  width="150" :formatter="contractIspayFormatter" :filters="IspayFilters" :filter-method="IspayFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                <el-table-column prop="contract_isinv" label="开票状态"  width="150" :formatter="contractIsinvFormatter" :filters="IsinvFilters" :filter-method="IsinvFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                <el-table-column prop="contract_remark" label="合同备注"  width="230" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top" v-if=" scope.row.contract_remark != '' ">
                            <p>{{ scope.row.contract_remark }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-button type="success" round size="large">点击查看详细备注</el-button>
                            </div>
                        </el-popover>
                    </template>                
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
            <el-form  ref="editForm" :model="editForm" label-width="120px" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="cus_id">
                            <el-cascader placeholder="选择客户名称" filterable :options="editSetting.cusName"  v-model="editForm.cus_id"></el-cascader>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同类型" prop="contract_type">
                            <el-select v-model="editForm.contract_type" placeholder="选择合同类型">
                                <el-option v-for="(item,index) in contractType " :key="`opt_${index}`" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同签订日期" prop="contract_on_date">
                            <el-date-picker type="date" placeholder="选择签订日期" v-model="editForm.contract_on_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同金额" prop="contract_amt">
                            <el-input v-model.trim="editForm.contract_amt"></el-input>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同约定金额" prop="contract_agree_amt">
                            <el-input v-model.trim="editForm.contract_agree_amt"></el-input>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同开始日期" prop="contract_begin_date">
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="editForm.contract_begin_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同结束日期" prop="contract_end_date">
                            <el-date-picker type="date" placeholder="选择结束日期" v-model="editForm.contract_end_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="合同备注">
                            <el-input type="textarea" rows="5" v-model.trim="editForm.contract_remark" placeholder="合同备注" maxlength="200" show-word-limit></el-input>
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
    import { contractTabRules } from '@/until/rules';
    import { contractTypeOptions } from '@/until/options';
    import { contractType, contractIspay, contractIsinv  } from '@/until/formatter';
    import { contractTypeFilters, IspayFilters, IsinvFilters } from '@/until/filters';
    export default {
        data() {
            return {
                tableSetting:{
                    tableData:[
                        {
                            contract_id:'LP2019-X001-2019071801',
                            propose_cus:'重庆永利',
                            cus_id:'1',
                            contract_type:'0',
                            contract_on_date:'2017-07-18',
                            contract_begin_date:'2017-06-18',
                            contract_end_date:'2017-08-18',
                            contract_ispay:'1',
                            contract_isinv:'1',
                            contract_checked:'0',
                            contract_remark:'ssssss',
                            contract_amt:'5000',
                            contract_agree_amt:'5000'
                        },
                        {
                            contract_id:'LP2019-X001-2019071801',
                            propose_cus:'重庆永利',
                            cus_id:'2',
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
            }
        },
        created() {
            this.getData();
        },
        computed:{
            contractType(){
                return contractTypeOptions;
            },
            rules(){
                return contractTabRules;
            },
            IspayFilters(){
                return IspayFilters;
            },
            contractTypeFilters(){
                return contractTypeFilters;
            },
            IsinvFilters(){
                return IsinvFilters;
            }

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
            IspayFilterTag(value, row){
                return row.contract_ispay === value;
            },
            IsinvFilterTag(value, row){
                return row.contract_isinv === value;
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
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.$set(this.tableSetting.tableData, this.idx, this.editForm);
                        this.status.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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