<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>客户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="handle-box">
                <el-select v-model="searchSetting.searchData.select_cate" placeholder="字段名称" class="handle-select mr10">
                    <el-option :label="items.label" :value="items.value" v-for="(items,indexs) in searchSetting.options"></el-option>
                </el-select>
                <el-input v-model="searchSetting.searchData.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableSetting.tableData" border class="table" ref="cusManageTab"  style="width:100%;" :highlight-current-row="status.highlight" :row-style="rowStyle">
                <el-table-column prop="propose_cus" label="客户名称"  width="150" fixed></el-table-column>
                <el-table-column prop="propose_cus_abbr" label="英文缩写"  width="150"></el-table-column>
                <el-table-column prop="contact_person" label="联系人"  width="150"></el-table-column>
                <el-table-column prop="contact_tel_no" label="联系电话"  width="150"></el-table-column>
                <el-table-column prop="contact_qq_no" label="QQ号"  width="150"></el-table-column>
                <el-table-column prop="contact_wx_no" label="微信号"  width="150"></el-table-column>
                <el-table-column prop="contact_subfaxno" label="传真"  width="150"></el-table-column>
                <el-table-column prop="role_name" label="权限分组"  width="150" :formatter="roleFormatter" :filters="tableSetting.roleFilters" :filter-method="roleFilterTag" filter-placement="bottom-end"></el-table-column>
                <el-table-column prop="contract_date" label="合同日期"  width="150"></el-table-column>
                <el-table-column prop="finish_date" label="完工日期"  width="150"></el-table-column>
                <el-table-column prop="server_ip" label="服务器IP"  width="150"></el-table-column>
                <el-table-column prop="server_pwd" label="服务器密码"  width="150"></el-table-column>
                <el-table-column prop="db_pwd" label="数据库密码"  width="150"></el-table-column>
                <el-table-column prop="client_version" label="客户端版本"  width="150"></el-table-column>
                <el-table-column prop="cus_area" label="区域"  width="200" :formatter="areaFormatter"></el-table-column>
                <el-table-column prop="cus_address" label="详细地址"  width="250"></el-table-column>
                <el-table-column prop="cus_invstate" label="缴费状态"  width="150" :formatter="invstateFormatter" :filters="tableSetting.invstateFilters" :filter-method="invstateFilterTag"></el-table-column>
                <el-table-column prop="nextinv_date" label="缴费日期"  width="150"></el-table-column>
                <el-table-column prop="serve_amt" label="缴费金额"  width="150"></el-table-column>
                <el-table-column prop="sun_logno" label="向日葵识别码"  width="150"></el-table-column>
                <el-table-column prop="sun_logpwd" label="向日葵验证码"  width="200"></el-table-column>
                <el-table-column prop="cus_remark" label="客户备注"  width="235"></el-table-column>
                <el-table-column prop="cus_remark2" label="客户备注2"  width="235"></el-table-column>
                <el-table-column prop="cus_remark3" label="客户备注3"  width="235"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="tableSetting.totalPage">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import {CodeToText} from 'element-china-area-data';
    export default {
        data() {
            return {
                props: { multiple: true },
                options:[
                    {
                        value:'',
                        label:''
                    }
                ],
                tableSetting:{
                    rowStyle:'border:1px solid #F00;',
                    tableData:[
                        {
                            propose_cus:'天津某公司',
                            propose_cus_abbr:'CQYL',
                            contact_person:'陈总',
                            contact_tel_no:'13500000000',
                            contact_qq_no:'',
                            contact_wx_no:'',
                            role_name:'100',
                            contact_subfaxno:'',
                            contract_date:'2019-06-17',
                            finish_date:'2019-07-17',
                            server_ip:'127.0.0.1',
                            server_pwd:'123456',
                            db_pwd:'123456',
                            client_version:'01',
                            cus_area: ['120000','120100','120101'],
                            cus_address:'某某某某大街99999号',
                            cus_invstate:'0',
                            nextinv_date:'2019-07-17',
                            serve_amt:'5000',
                            sun_logno:'123456789012345678901234567890',
                            sun_logpwd:'1234567890'
                        },
                        {
                            propose_cus:'天津某公司',
                            propose_cus_abbr:'CQYL',
                            contact_person:'陈总',
                            contact_tel_no:'13500000000',
                            contact_qq_no:'',
                            contact_wx_no:'',
                            role_name:'100',
                            contact_subfaxno:'',
                            contract_date:'2019-06-17',
                            finish_date:'2019-07-17',
                            server_ip:'127.0.0.1',
                            server_pwd:'123456',
                            db_pwd:'123456',
                            client_version:'01',
                            cus_area: ['120000','120100','120101'],
                            cus_address:'某某某某大街99999号',
                            cus_invstate:'1',
                            nextinv_date:'2019-07-17',
                            serve_amt:'5000',
                            sun_logno:'123456789012345678901234567890',
                            sun_logpwd:'1234567890'
                        }

                    ],
                    roleFilters:[
                        { text: '管理员', value: '100' }, 
                        { text: '财务人员', value: '200' },
                        { text: '实施员', value: '300' }
                    ],
                    invstateFilters:[
                        { text: '欠费', value: '0' }, 
                        { text: '已缴费', value: '1' },
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
                            value:'propose_cus_abbr',
                            label:'英文缩写'
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
            rowStyle({row, rowIndex}){
                if(row.cus_invstate === '0'){
                    return 'background-color:#F00;';
                }
                //return 'background-color:#4095ff;';
                
            },
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
            roleFormatter(row, column) {
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
            },
            invstateFormatter(row, column) {
                switch (row.cus_invstate) {
                    case '0':
                        return '欠费';
                        break;
                    case '1':
                        return '已缴费';
                        break;
                    default:
                        return '未知缴费状态';
                }
            },
            areaFormatter(row,column){
                let area = '';
                for (var i = 0 ;i <= row.cus_area.length - 1 ; i++) {
                    area += CodeToText[row.cus_area[i]] + '/'
                }
                return area;
            },
            roleFilterTag(value, row){
                return row.role_name === value;
            },
            invstateFilterTag(value, row){
                return row.cus_invstate === value;
            },
            handleEdit(index, row) {
                this.$router.push('/cusEdit');
                /*this.idx = index;
                const item = this.tableSetting.tableData[index];
                this.editForm = {
                    staff_realname: item.staff_realname,
                    staff_name: item.staff_name,
                    staff_pwd: item.staff_pwd,
                    role_name: item.role_name
                }
                this.status.editVisible = true;*/
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableSetting.tableData, this.idx, this.editForm);
                this.status.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
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