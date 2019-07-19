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
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="管理员姓名" prop="staff_realname">
                                <el-input v-model.trim="form.staff_realname" maxlength="10" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="登录名称" prop="staff_name">
                                <el-input v-model.trim="form.staff_name" maxlength="10" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="登录密码" prop="staff_pwd">
                                <el-input v-model.trim="form.staff_pwd" maxlength="12" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="确认密码" prop="confirm_pwd">
                                <el-input v-model.trim="form.confirm_pwd" maxlength="12" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="请选择权限" prop="role_name">
                                <el-select v-model.trim="form.role_name" placeholder="请选择权限分组">
                                    <el-option v-for="item in authorityType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item  size="large">
                                <el-button type="primary" @click="onSubmit()" :Loading="submitBottom.isLoading">{{submitBottom.text}}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>                    
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { authorityTypeOptions } from '@/until/options';
    import { engrTabRules } from '@/until/rules';
    export default {
        data(){
            return {
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
                defaultRules:{
                    confirm_pwd:[
                        { required: true, message: '请确认密码' },
                        { validator: this.checkConfirmPass, trigger: 'blur' }
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
        created(){
            //this.authorityType = authorityTypeOptions;
            //this.rules = Object.assign({},this.rules,engrTabRules);
        },
        computed:{
            authorityType(){
                return authorityTypeOptions;
            },
            rules(){
                console.dir(Object.assign({},this.defaultRules,engrTabRules));
                return Object.assign({},this.defaultRules,engrTabRules);
            }
        },
        methods: {
            onSubmit() {
                this.$refs['createEngr'].validate((valid) => {
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
<style scoped>
    .form-box{
        margin:0 auto;
    }
</style>