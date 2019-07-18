<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管理员</el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="createEngr" :model="form" label-width="120px" :rules="rules" status-icon>
                    <el-form-item label="管理员姓名" prop="staff_realname">
                        <el-input v-model.trim="form.staff_realname"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名称" prop="staff_name">
                        <el-input v-model.trim="form.staff_name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="staff_pwd">
                        <el-input v-model.trim="form.staff_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirm_pwd">
                        <el-input v-model.trim="form.confirm_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="请选择权限" prop="role_name">
                        <el-select v-model.trim="form.role_name" placeholder="请选择权限分组">
                            <el-option v-for="item in authority" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请选择权限" prop="role_name">
                        <el-select v-model.trim="form.role_name" placeholder="请选择权限分组">
                            <el-option v-for="item in authority" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="large">
                        <el-button type="primary" @click="onSubmit('createEngr')" :Loading="submitBottom.isLoading">{{submitBottom.text}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
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
                rules:{
                    staff_realname:[
                        { required: true, message: '请输入管理员名称', trigger: 'blur' }
                    ],
                    staff_name:[
                        { required: true, message: '请输入管理员登录名称', trigger: 'blur' }
                    ],
                    staff_pwd:[
                        { required: true, validator: this.checkPass, trigger: 'blur' }
                    ],
                    confirm_pwd:[
                        { required: true, validator: this.checkConfirmPass, trigger: 'blur' }
                    ],
                    role_name:[
                        { required: true, message: '请选择管理员权限', trigger: 'blur' }
                    ]
                },
                form: {
                    staff_realname: '',
                    staff_name: '',
                    staff_pwd: '',
                    confirm_pwd: '',
                    role_name: ''
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
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
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
        }
    }
</script>
<style type="text/css">
    .form-box{
        margin:0 auto;
    }
</style>