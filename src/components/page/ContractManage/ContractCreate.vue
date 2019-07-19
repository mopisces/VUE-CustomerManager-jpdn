<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>合同管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加合同</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="createContract" :model="form" label-width="120px" :rules="rules">
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="客户名称" prop="cus_id">
                                <el-cascader placeholder="选择客户名称" filterable :options="cusName"  v-model="form.cus_id"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24">
                            <el-form-item label="合同类型" prop="contract_id">
                                <el-select v-model="form.contract_id" placeholder="选择合同类型">
                                    <el-option v-for="(item,index) in contractTypeOpt " :key="`opt_${index}`" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="签订日期" prop="contract_on_date">
                                <el-date-picker type="date" placeholder="选择签订日期" v-model="form.contract_on_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同金额" prop="contract_amt">
                                <el-input v-model.trim="form.contract_amt" placeholder="请输入合同金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同约定金额" prop="contract_agree_amt">
                                <el-input v-model.trim="form.contract_agree_amt" placeholder="请输入约定金额"></el-input>
                            </el-form-item>
                        </el-col> 
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同开始日期" prop="contract_begin_date">
                                <el-date-picker type="date" placeholder="选择开始日期" v-model="form.contract_begin_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同结束日期" prop="contract_end_date">
                                <el-date-picker type="date" placeholder="选择结束日期" v-model="form.contract_end_date" style="width: 100%;"  value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="合同备注" prop="contract_remark" >
                                <el-input type="textarea" rows="5" v-model="form.contract_remark" placeholder="合同备注" maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center" >
                            <el-form-item size="large" >
                                <el-button type="primary" @click="onSubmit('createContract')":loading="submitBottom.isLoading">{{ submitBottom.text }}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { contractTypeOptions } from '@/until/options';
    import { contractTabRules } from '@/until/rules';
    export default {
        data(){
            return {
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
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
                form: {
                    cus_id:'',
                    contract_id:'',
                    contract_on_date:'',
                    contract_amt:'',
                    contract_agree_amt:'',
                    contract_begin_date:'',
                    contract_end_date:''
                },
            }
        },
        created(){
        },
        computed:{
            contractTypeOpt(){
                return contractTypeOptions;
            },
            rules(){
                return contractTabRules;
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
            change(value){
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