<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>合同管理</el-breadcrumb-item>
                <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <el-tabs v-model="message">
                <el-tab-pane label="未缴费合同" name="pay">
                    <el-table :data="unpayData"  style="width: 100%">
                        <el-table-column type="expand"  align="center">
                            <template slot-scope="props">
                                <el-form label-position="left" class="demo-table-expand">
                                    <el-form-item label="签订日期">
                                        <span>{{ props.row.contract_on_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同金额">
                                        <span>{{ props.row.contract_amt }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同约定金额">
                                        <span>{{ props.row.contract_agree_amt }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同开始日期">
                                        <span>{{ props.row.contract_begin_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="选择结束日期">
                                        <span>{{ props.row.contract_end_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同备注">
                                        <span>{{ props.row.contract_remark }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户名称" prop="propose_cus" width="150"></el-table-column>
                        <el-table-column label="合同编号" prop="contract_id"  align="center"></el-table-column>
                        <el-table-column label="合同类型" :formatter="contractTypeFormatter" prop="contract_type" :filters="contractTypeFilters" :filter-method="contractTypeFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                        <el-table-column width="120" label="操作"  align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" @click="handlePay(scope.$index, scope.row)">付清</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="未开票合同" name="inv">
                    <template v-if="message === 'inv'">
                        <el-table :data="uninvData  "  style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" class="demo-table-expand">
                                    <el-form-item label="签订日期">
                                        <span>{{ props.row.contract_on_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同金额">
                                        <span>{{ props.row.contract_amt }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同约定金额">
                                        <span>{{ props.row.contract_agree_amt }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同开始日期">
                                        <span>{{ props.row.contract_begin_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="选择结束日期">
                                        <span>{{ props.row.contract_end_date }}</span>
                                    </el-form-item>
                                    <el-form-item label="合同备注">
                                        <span>{{ props.row.contract_remark }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户名称" prop="propose_cus"></el-table-column>
                        <el-table-column label="合同编号" prop="contract_id"  align="center"></el-table-column>
                        <el-table-column label="合同类型" :formatter="contractTypeFormatter" prop="contract_type" :filters="contractTypeFilters" :filter-method="contractTypeFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                        <el-table-column label="缴费状态" prop="contract_ispay" :formatter="contractIspayFormatter"  align="center"></el-table-column>
                        <el-table-column width="120" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" @click="handleInv(scope.$index, scope.row)">开票</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store';
    import { contractType,contractIspay } from '@/until/formatter';
    import { contractTypeFilters } from '@/until/filters';
    export default {
        data() {
            return {
                message: 'pay',
                showHeader: false,
                tableSetting:{},
                unpayData:[
                    {
                        contract_id:'LP2019-X001-2019071801',
                        propose_cus:'重庆永利unpayData',
                        cus_id:'1',
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
                        propose_cus:'重庆永利unpayData',
                        cus_id:'1',
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
                    },
                ],
                uninvData:[
                    {
                        contract_id:'LP2019-X001-2019071801',
                        propose_cus:'重庆永利uninvData',
                        cus_id:'1',
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
                        propose_cus:'重庆永利uninvData',
                        cus_id:'1',
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
                    },

                ]
            }
        },
        created(){

        },
        computed:{
            contractTypeFilters(){
                return contractTypeFilters;
            }
        },
        methods: {
            handlePay(index, row){
                this.$confirm('将' + row.contract_id + '合同标记为已缴费?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.unpayData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    })
                })
            },
            handleInv(index, row){
                this.$confirm('将' + row.contract_id + '合同标记为已开票?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.uninvData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    })
                })
            },
            contractTypeFormatter(row, column){
                return contractType(row.contract_type);
            },
            contractIspayFormatter(row, column){
                return contractIspay(row.contract_ispay);
            },
            contractTypeFilterTag(value, row){
                return row.contract_type === value;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>
