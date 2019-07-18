<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>客户列表</el-breadcrumb-item>
                <el-breadcrumb-item>客户编辑</el-breadcrumb-item>
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
                            <el-form-item label="QQ号" >
                                <el-input v-model.trim="form.contact_qq_no" placeholder="请输入QQ号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="微信号" >
                                <el-input v-model.trim="form.contact_wx_no" placeholder="请输入微信号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="传真" >
                                <el-input v-model.trim="form.contact_subfaxno" placeholder="请输入传真"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="角色权限" prop="role_name">
                                <el-select v-model="form.role_name" placeholder="请选择权限分组">
                                    <el-option v-for="item in authority" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                                <el-input v-model.trim="form.client_version" placeholder="请输入客户端版本" maxlength="10" show-word-limit></el-input>
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
                                <el-input v-model.number="form.serve_amt" placeholder="请输入服务费"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="缴费状态" required>
                                <el-select v-model="form.cus_invstate" placeholder="请选择缴费状态">
                                    <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                            <el-form-item label="向日葵识别码" prop="sun_logno">
                                <el-input v-model.trim="form.sun_logno" placeholder="请输入向日葵识别码" maxlength="30" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="向日葵验证码" prop="sun_logpwd">
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
    export default {
        data(){
            return {
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
                regionData: regionData,
                selectedOptions: [],
                authority:[
                    {
                        value:'1',
                        label:'管理员'
                    },
                    {
                        value:'2',
                        label:'财务人员'
                    },
                    {
                        value:'3',
                        label:'实施员'
                    },
                ],
                payment:[
                    {
                        value:'0',
                        label:'欠费'
                    },
                    {
                        value:'1',
                        label:'已缴费'
                    }
                ],
                
                form: {
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
                },
                
                rules:{
                    propose_cus:[
                        { required: true, message: '请输入客户名称', trigger: 'blur' }
                    ],
                    propose_cus_abbr:[
                        { required: true, validator: this.checkAbbr, trigger: 'blur' }
                    ],
                    contact_person:[
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    contact_tel_no:[
                        { required: true, validator: this.checkPhone, trigger: 'blur' }
                    ],
                    role_name:[
                        { required: true, message: '请选择用户权限', trigger: 'blur' }
                    ],
                    contract_date:[
                        {  required: true, message: '请选择合同日期', trigger: ['blur', 'change'] }
                    ],
                    finish_date:[
                        {  required: true, message: '请选择完工日期', trigger: ['blur', 'change'] }
                    ],
                    server_ip:[
                        { required: true, validator: this.checkIP, trigger: 'blur' }
                    ],
                    server_pwd:[
                        { required: true, message: '请输入服务器密码', trigger: 'blur' }
                    ],
                    db_pwd:[
                        { required: true, message: '请输入数据库密码', trigger: 'blur' }
                    ],
                    client_version:[
                        { required: true, message: '请输入客户端版本号', trigger: 'blur' }
                    ],
                    cus_area:[
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    cus_address:[
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    serve_amt:[
                        { required: true, message: '请输入缴费金额', trigger: 'blur' },
                        { type: 'number', message: '缴费金额必须为数字'}
                    ],
                    nextinv_date:[
                        { required: true, message: '请选择缴费日期', trigger: ['blur', 'change'] }
                    ],
                    sun_logno:[
                        { required: true, message: '请输入向日葵识别码', trigger: 'blur' }
                    ],
                    sun_logpwd:[
                        { required: true, message: '请输入向日葵验证码', trigger: 'blur' }
                    ]
                }
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
                //this.$message.success('提交成功！');
            },
            handleChange(value){
                console.dir(value);
                console.dir(this.form.cus_area);
            },
            checkPhone(rule, value, callback){
                if (!value) {
                    return callback(new Error('请输入联系电话'));
                }
                if(!(/^1[3456789]\d{9}$/.test(value))){ 
                    return callback(new Error('请输入正确的联系电话'));
                }
                callback();
            },
            checkIP(rule, value, callback){
                if(!value){
                    return callback(new Error('请输入数据库IP地址'));
                }
                if(!(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(value)){
                    return callback(new Error('请输入正确的IP地址'));
                }
                callback();
            },
            checkAbbr(rule, value, callback){
                if(!value){
                    return callback(new Error('请输入客户英文缩写'));
                }
                if(!(/^[a-zA-Z]+$/).test(value)){
                    return callback(new Error('请输入正确的客户英文缩写'));
                }
                callback();
            }
        }
    }
</script>
<style type="text/css">
    .form-box{
        margin:0 auto;
    }
</style>