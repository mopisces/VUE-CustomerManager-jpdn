<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="createCus" :model="form" label-width="120px" :rules="rules">
                    <el-row>
                        <el-col :span="12" >
                            <el-form-item label="客户名称" prop="propose_cus">
                                <el-input v-model.trim="form.propose_cus" placeholder="请输入客户名称" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="英文缩写" prop="propose_cus_abbr">
                                <el-input v-model.trim="form.propose_cus_abbr" placeholder="请输入英文缩写" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="12">
                            <el-form-item label="联系人" prop="contact_person">
                                <el-input v-model.trim="form.contact_person" placeholder="请输入联系人" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话" prop="contact_tel_no">
                                <el-input v-model.trim="form.contact_tel_no" placeholder="请输入联系电话" maxlength="11" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="12">
                            <el-form-item label="QQ号" prop="contact_qq_no">
                                <el-input v-model.trim="form.contact_qq_no" placeholder="请输入QQ号" maxlength="11" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="微信号" prop="contact_wx_no">
                                <el-input v-model.trim="form.contact_wx_no" placeholder="请输入微信号" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="传真" prop="contact_subfaxno">
                                <el-input v-model.trim="form.contact_subfaxno" placeholder="请输入传真" maxlength="13" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="角色权限" prop="role_name">
                                <el-select v-model="form.role_name" placeholder="请选择权限分组">
                                    <el-option v-for="item in authorityTypeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同日期" prop="contract_date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.contract_date" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完工日期" prop="finish_date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.finish_date" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="服务器IP" prop="server_ip">
                                <el-input v-model.trim="form.server_ip" placeholder="请输入服务器IP" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="服务器密码" prop="server_pwd">
                                <el-input v-model.trim="form.server_pwd" placeholder="请输入服务器密码" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col> 
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="数据库密码" prop="db_pwd">
                                <el-input v-model.trim="form.db_pwd" placeholder="请输入数据库密码" maxlength="20" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户端版本" prop="client_version">
                                <el-select v-model="form.client_version" placeholder="请选择权限分组">
                                    <el-option v-for="item in clientVersionOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="区域" prop="cus_area">
                                <el-cascader :options="regionData" v-model="form.cus_area" @change="handleChange"></el-cascader> 
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="详细地址" prop="cus_address">
                                <el-input v-model.trim="form.cus_address" placeholder="请输入详细地址" maxlength="50" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="服务费" prop="serve_amt">
                                <el-input v-model.trim="form.serve_amt" placeholder="请输入服务费"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="缴费状态" required>
                                <el-select v-model="form.cus_invstate" placeholder="请选择缴费状态">
                                    <el-option v-for="item in paymentTypeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="缴费日期" prop="nextinv_date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.nextinv_date" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="向日葵识别码" >
                                <el-input v-model.trim="form.sun_logno" placeholder="请输入向日葵识别码" maxlength="30" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="向日葵验证码" >
                                <el-input v-model.trim="form.sun_logpwd" placeholder="请输入向日葵验证码" maxlength="10" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="客户备注" >
                                <el-input type="textarea" rows="5" v-model="form.cus_remark" placeholder="客户备注" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="客户备注2" >
                               <el-input type="textarea" rows="5" v-model="form.cus_remark2" placeholder="客户备注2" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="客户备注3" >
                                <el-input type="textarea" rows="5" v-model="form.cus_remark3" placeholder="客户备注3" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center" >
                            <el-form-item size="large" >
                                <el-button type="primary" @click="onSubmit('createCus')":loading="submitBottom.isLoading">{{ submitBottom.text }}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data';
    import { cusTabRules } from '@/until/rules';
    import { authorityTypeOptions, paymentTypeOptions, clientVersionOptions } from '@/until/options';
    export default {
        data(){
            return {
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
                regionData: regionData,
                form: {
                    propose_cus: '',
                    propose_cus_abbr: '',
                    contact_person: '',
                    contact_tel_no: '',
                    contact_qq_no: '',
                    contact_wx_no: '',
                    role_name: '',
                    contact_subfaxno: '',
                    contract_date: '',
                    finish_date: '',
                    server_ip: '',
                    server_pwd: '',
                    db_pwd: '',
                    client_version: '',
                    cus_area: [],
                    cus_address: '',
                    cus_invstate: '',
                    nextinv_date: '',
                    serve_amt: '',
                    sun_logno: '',
                    sun_logpwd: '',
                    cus_remark: '',
                    cus_remark2: '',
                    cus_remark3: '',
                },
                
            }
        },
        created(){
            //this.rules = cusTabRules;
            //this.paymentTypeOpt = paymentTypeOptions;
            //this.clientVersionOpt = clientVersionOptions;
        },
        computed:{
            authorityTypeOpt(){
                return authorityTypeOptions;
            },
            paymentTypeOpt(){
                return paymentTypeOptions;
            },
            clientVersionOpt(){
                return clientVersionOptions;
            },
            rules(){
                return cusTabRules;
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitBottom.text  = "提交中";
                        this.submitBottom.isLoading = true;
                        this.$message.success('提交成功！');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleChange(value){
                console.dir(value);
            }
        }
    }
</script>
<style type="text/css">
    .form-box{
        margin:0 auto;
    }
</style>