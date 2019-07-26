<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>客户列表</el-breadcrumb-item>
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
            <el-table :data="tableSetting.tableData" border class="table" ref="cusManageTab"  style="width:100%;" :highlight-current-row="status.highlight" :row-style="rowStyle">
                <el-table-column prop="propose_cus" label="客户名称"  width="150" fixed align="center"></el-table-column>
                <el-table-column prop="propose_cus_abbr" label="英文缩写"  width="150" align="center"></el-table-column>
                <el-table-column prop="contact_person" label="联系人"  width="150" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="focus" placement="top">
                            <p>QQ号: {{ scope.row.contact_qq_no }}</p>
                            <p>微信号: {{ scope.row.contact_wx_no }}</p>
                            <p>传真: {{ scope.row.contact_subfaxno }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-button type="success" round size="large">{{ scope.row.contact_person }}</el-button>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column >
                <el-table-column prop="contact_tel_no" label="联系电话"  width="150" align="center"></el-table-column>
                <!-- <el-table-column prop="contact_qq_no" label="QQ号"  width="150"></el-table-column>
                <el-table-column prop="contact_wx_no" label="微信号"  width="150"></el-table-column>
                <el-table-column prop="contact_subfaxno" label="传真"  width="150"></el-table-column> -->
                <el-table-column prop="role_name" label="权限分组"  width="150" :formatter="roleFormatter" :filters="roleFilters" :filter-method="roleFilterTag" filter-placement="bottom-end" align="center"></el-table-column>
                <el-table-column prop="contract_date" label="合同日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="finish_date" label="完工日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="server_ip" label="服务器IP"  width="150" align="center"></el-table-column>
                <el-table-column prop="server_pwd" label="服务器密码"  width="150" align="center"></el-table-column>
                <el-table-column prop="db_pwd" label="数据库密码"  width="150" align="center"></el-table-column>
                <el-table-column prop="client_version" label="客户端版本"  width="150" :filters="clientVFilters" :filter-method="clientVFilterTag"  align="center"></el-table-column>
                <el-table-column prop="cus_area" label="区域"  width="200" :formatter="areaFormatter" align="center"></el-table-column>
                <el-table-column prop="cus_address" label="详细地址"  width="250" align="center"></el-table-column>
                <el-table-column prop="cus_invstate" label="缴费状态"  width="150" :formatter="paymentFormatter" :filters="paymentFilters" :filter-method="paymentFilterTag" align="center"></el-table-column>
                <el-table-column prop="nextinv_date" label="缴费日期"  width="150" sortable  align="center"></el-table-column>
                <el-table-column prop="serve_amt" label="缴费金额"  width="150" align="center"></el-table-column>
                <el-table-column prop="sun_logno" label="向日葵识别码"  width="270" align="center"></el-table-column>
                <el-table-column prop="sun_logpwd" label="向日葵验证码"  width="150" align="center"></el-table-column>
                <el-table-column prop="cus_remark" label="客户备注"  width="230" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top" v-if=" (scope.row.cus_remark != '' || scope.row.cus_remark2 != '' || scope.row.cus_remark != '')">
                            <p>{{ scope.row.cus_remark }}</p>
                            <p>{{ scope.row.cus_remark2 }}</p>
                            <p>{{ scope.row.cus_remark3 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-button type="success" round size="large">点击查看详细备注</el-button>
                            </div>
                        </el-popover>
                    </template>                    
                </el-table-column>
                <!-- <el-table-column prop="cus_remark2" label="客户备注2"  width="230" align="center"></el-table-column>
                <el-table-column prop="cus_remark3" label="客户备注3"  width="230" align="center"></el-table-column> -->
                <el-table-column align="center" label="操作" fixed="right" width="200" >
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
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="status.delVisible" width="300px" center>
            <div class="del-dialog-cnt">作废不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="status.delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {CodeToText} from 'element-china-area-data';
    import store from '@/store/store';
    import { IsinvFilters, roleTypeFilters, paymentTypeFilters, clientVersionFilters } from '@/until/filters';
    import { authorityTypeOptions } from '@/until/options';
    import { roleTypeFormatter, invStateFormatter } from '@/until/formatter';
    export default {
        data() {
            return {
                tableSetting:{
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
                            client_version:'V2',
                            cus_area: ['120000','120100','120101'],
                            cus_address:'某某某某大街99999号',
                            cus_invstate:'0',
                            nextinv_date:'2019-07-17',
                            serve_amt:'5000',
                            sun_logno:'123456789012345678901234567890',
                            sun_logpwd:'1234567890',
                            cus_remark:'',
                            cus_remark2:'',
                            cus_remark3:''
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
                            client_version:'V3',
                            cus_area: ['120000','120100','120101'],
                            cus_address:'某某某某大街99999号',
                            cus_invstate:'1',
                            nextinv_date:'2019-07-17',
                            serve_amt:'5000',
                            sun_logno:'123456789012345678901234567890',
                            sun_logpwd:'1234567890',
                            cus_remark:'adawdsdaqaa',
                            cus_remark2:'',
                            cus_remark3:'asdqwcadw'
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
                            value:'propose_cus_abbr',
                            label:'英文缩写'
                        }
                    ]
                },
                editSetting:{
                    showConfirmInput:false
                },
                status:{
                    stripe:true,
                    highlight:true,
                    delVisible:false,
                },
                idx: -1,//选中行的索引
            }
        },
        created() {
            this.getData();
        },
        computed:{
            roleFilters(){
                return roleTypeFilters;
            },
            paymentFilters(){
                return paymentTypeFilters;
            },
            clientVFilters(){
                return clientVersionFilters;
            }
        },
        methods: {
            rowStyle({row, rowIndex}){
                if(row.cus_invstate === '0'){
                    return 'background-color:#ede188;';
                }
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取数据
            getData() {

            },
            // 搜索
            search() {
                //this.is_search = true;
            },
            roleFormatter(row, column) {
                return roleTypeFormatter(row.role_name);
            },
            paymentFormatter(row, column) {
                return invStateFormatter(row.cus_invstate);
            },
            areaFormatter(row,column){
                let area = '';
                for (var i = 0 ;i <= row.cus_area.length - 1 ; i++) {
                    area += CodeToText[row.cus_area[i]] + '/'
                }
                return area;
            },
            clientVFilterTag( value, row ){
                return row.client_version === value;
            },
            roleFilterTag(value, row){
                return row.role_name === value;
            },
            paymentFilterTag(value, row){
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
            handleDelete(index, row){
                this.idx = index;
                this.status.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                this.tableSetting.tableData.splice(this.idx, 1);
                this.$message.success('废弃成功');
                this.status.delVisible = false;
                this.$set(this.tableSetting.tableData);
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
</style>
<style>
    .el-popover {
        background: #ffec0d;
    }
</style>