<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
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
                <el-table-column prop="contract_id" label="合同编号"  width="230" fixed></el-table-column>
                <el-table-column prop="propose_cus" label="客户名称"  width="150" fixed></el-table-column>
                <el-table-column prop="contract_type" label="合同类型"  width="150"  :formatter="contractTypeFormatter" :filters="tableSetting.contractTypeFilters" :filter-method="contractTypeFilterTag" filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="contract_on_date" label="合同签订日期"  width="150"></el-table-column>
                <el-table-column prop="contract_amt" label="合同金额"  width="150"></el-table-column>
                <el-table-column prop="contract_agree_amt" label="合同约定金额"  width="150"></el-table-column>
                <el-table-column prop="contract_begin_date" label="合同开始日期"  width="150"></el-table-column>
                <el-table-column prop="contract_end_date" label="合同结束日期"  width="150"></el-table-column>
                <el-table-column prop="contract_ispay" label="是否付清"  width="150" :formatter="contractIspayFormatter" :filters="tableSetting.IspayFilters" :filter-method="IspayFilterTag" filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="contract_isinv" label="是否开票"  width="150" :formatter="contractIsinvFormatter" :filters="tableSetting.IsinvFilters" :filter-method="IsinvFilterTag" filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="contract_remark" label="合同备注"  width="230"></el-table-column>
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
            <el-form  ref="editForm" :model="editForm" label-width="120px" :rules="editSetting.rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="cus_id">
                            <el-cascader placeholder="选择客户名称" filterable :options="editSetting.cusName"  v-model="editForm.cus_id"></el-cascader>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同类型" prop="contract_type">
                            <el-select v-model="editForm.contract_type" placeholder="选择合同类型">
                                <el-option v-for="(item,index) in editSetting.contractType " :key="`opt_${index}`" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同签订日期" prop="contract_on_date">
                            <el-date-picker type="date" placeholder="选择签订日期" v-model="editForm.contract_on_date" style="width: 100%;" ></el-date-picker>
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
                            <el-date-picker type="date" placeholder="选择开始日期" v-model="editForm.contract_begin_date" style="width: 100%;"></el-date-picker>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同结束日期" prop="contract_end_date">
                            <el-date-picker type="date" placeholder="选择结束日期" v-model="editForm.contract_end_date" style="width: 100%;"></el-date-picker>
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
                            contract_remark:'',
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
                    IspayFilters:[
                        { text: '未付清', value: '0' }, 
                        { text: '已付清', value: '1' },
                    ],
                    IsinvFilters:[
                        { text: '未开票', value: '0' }, 
                        { text: '已开票', value: '1' },
                    ],
                    contractTypeFilters:[
                        { text: '销售合同', value: '0' },
                        { text: '维护合同', value: '1' },
                        { text: '增值合同', value: '2' },
                        { text: 'webapp合同', value: '3' },
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
                    contractType:[
                        {
                            label:'销售合同',
                            value:'0'
                        },
                        {
                            label:'维护合同',
                            value:'1'
                        },
                        {
                            label:'增值合同',
                            value:'2'
                        },
                        {
                            label:'webapp合同',
                            value:'3'
                        }
                    ],
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
                    rules:{
                        cus_id:[
                            { required: true, message: '请选择客户名称', trigger: 'change' }
                        ],
                        contract_id:[
                            { required: true, message: '请选择合同编号', trigger: 'change' }
                        ],
                        contract_on_date:[
                            { type: 'date', required: true, message: '请选择签订日期', trigger: ['blur', 'change']  }
                        ],
                        contract_amt:[
                            { required: true, validator: this.checkNum , trigger: 'blur' },
                        ],
                        contract_agree_amt:[
                            { required: true, validator: this.checkNum , trigger: 'blur'  },
                        ],
                        contract_begin_date:[
                            { type: 'date', required: true, message: '请选择合同开始日期', trigger: ['blur', 'change'] }
                        ],
                        contract_end_date:[
                            { type: 'date', required: true, message: '请选择合同结束日期', trigger: ['blur', 'change'] }
                        ],
                    }
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
                switch (row.contract_type) {
                    case '0':
                        return '销售合同';
                        break;
                    case '1':
                        return '维护合同';
                        break;
                    case '2':
                        return '增值合同';
                        break;
                    case '3':
                        return 'webapp合同';
                        break;
                    default:
                        return '未知合同类型';
                }
            },
            contractIspayFormatter(row, column) {
                switch (row.contract_ispay) {
                    case '0':
                        return '未付清';
                        break;
                    case '1':
                        return '已付清';
                        break;
                    default:
                        return '未知付款状态';
                }
            },
            contractIsinvFormatter(row,column){
                switch (row.contract_isinv) {
                    case '0':
                        return '未开票';
                        break;
                    case '1':
                        return '已开票';
                        break;
                    default:
                        return '未知开票状态';
                }
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
            checkNum(rule, value, callback){
                if(!value){
                    return callback(new Error('请输入金额'));
                }
                if(!(/^[0-9]+$/).test(value)){
                    return callback(new Error('金额必须为数字'));
                }
                callback();
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
    .table{
        width: 100%;
        font-size: 14px;
        
    }
    .red{
        color: #ff0000;
    }
</style>