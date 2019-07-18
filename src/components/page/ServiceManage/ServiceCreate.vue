<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>服务单管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增服务单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="createService" :model="form" label-width="120px" :rules="rules">
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="客户名称" prop="cus_id">
                                <el-cascader placeholder="选择客户名称" filterable :options="cusName"  v-model="form.cus_id"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="显示过期合同" >
                                <el-radio label="0" v-model="status.showAllContract" border>否</el-radio>
                                <el-radio label="1" v-model="status.showAllContract" border>是</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24">
                            <el-form-item label="合同编号" prop="contract_id">
                                <el-cascader placeholder="选择合同编号" filterable :options="contractNo"  v-model="form.contract_id"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="实施类型" prop="service_type">
                                <el-select v-model="form.service_type" placeholder="选择实施类型">
                                    <el-option v-for="item in service_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="实施开始日期" prop="service_begin_date">
                                <el-date-picker type="date" placeholder="选择开始日期" v-model="form.service_begin_date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="实施结束日期" prop="service_end_date">
                                <el-date-picker type="date" placeholder="选择结束日期" v-model="form.service_end_date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="服务内容" prop="contract_remark">
                                <el-input type="textarea" rows="5" v-model.trim="form.contract_remark" placeholder="请填写服务内容"  maxlength="200" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center" >
                            <el-form-item size="large" >
                                <el-button type="primary" @click="onSubmit('createService')":loading="submitBottom.isLoading">{{ submitBottom.text }}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                service_type:[
                    {
                        value:'0',
                        label:'安装'
                    },
                    {
                        value:'1',
                        label:'售后'
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
                contractNo:[
                    {
                        value: '0',
                        label:'销售合同',
                        children:[
                            {
                                value: '123456',
                                label:'123456'
                            },
                            {
                                value: '123123',
                                label:'123123'
                            }
                        ]
                    },
                    {
                        value: '1',
                        label:'维护合同',
                        children:[
                            {
                                value:'1234567',
                                label:'1234567'
                            },
                            {
                                value:'12344321',
                                label:'12344321'
                            }
                        ]
                    },
                    {
                        value: '2',
                        label:'增值合同'
                    },
                    {
                        value: '3',
                        label:'webapp合同'
                    }
                ],
                submitBottom:{
                    text:'提交',
                    isLoading:false
                },
                status:{
                    showAllContract:'0'
                },
                form: {
                    cus_id: '',
                    contract_id: '',
                    service_type: '',
                    service_begin_date: '',
                    service_end_date: '',
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                },
                rules:{
                    cus_id:[
                        { required: true, message: '请选择客户名称', trigger: 'change' }
                    ],
                    contract_id:[
                        { required: true, message: '请选择合同编号', trigger: 'change' }
                    ],
                    service_type:[
                        { required: true, message: '请选择合同编号', trigger: 'change' }
                    ],
                    service_begin_date:[
                        { type: 'date', required: true, message: '请选择服务开始日期', trigger: ['blur', 'change']  }
                    ],
                    service_end_date:[
                        { type: 'date', required: true, message: '请选择服务结束日期', trigger: ['blur', 'change']  }
                    ],
                    contract_remark:[
                        { required: true, message: '请填写服务内容', trigger: 'blur' }
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
            }
        },
        watch:{
            'status.showAllContract':function(newVal,oldVal){
                if(newVal === '1'){
                    console.dir('getAllContract');
                }
            }
        }
    }
</script>
<style type="text/css">
    .form-box{
        margin:0 auto;
    }
</style>