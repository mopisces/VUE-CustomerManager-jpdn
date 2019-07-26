const checkNum = (rule, value, callback) =>{
    if( !(/^[0-9]+$/).test(value) ){
        return callback(new Error('该值必须为数字'));
    }
    callback();
};
const checkAbbr = (rule, value, callback) =>{
	if( !(/^[a-zA-Z]{1,20}$/).test(value) ){
        return callback(new Error('请输入正确的客户英文缩写'));
    }
    callback();
};
const checkPhone = (rule, value, callback) =>{
	if( !(/^1(3|4|5|6|7|8|9)\d{9}$/).test(value) ){
        return callback(new Error('请输入正确的联系电话'));
    }
    callback();
};
const checkFax = (rule, value, callback) =>{
    if(value !== ''){
        if( !(/^(\d{3,4}-)?\d{7,8}$/).test(value)){
            return callback(new Error('请输入正确的传真'));
        }    
    }
    callback();
};
const checkWX = (rule, value, callback) =>{
    if(value !== ''){
        if( !(/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/).test(value)){
            return callback(new Error('请输入正确的微信号'));
        }
    }
    callback();
};
const checkQQ = (rule, value, callback)=>{
    if(value !== ''){
        if( !(/^[0-9]{5,11}$/).test(value) ){
            return callback(new Error('QQ格式错误'));
        }
    }
    callback();
};
const checkIP = (rule, value, callback) =>{
	if( !(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(value) ){
        return callback(new Error('请输入正确的IP地址'));
    }
    callback();
};
const checkPass = (rule, value, callback) =>{
    if( !(/^[a-zA-Z0-9]+$/).test(value) ){
        return callback(new Error('登录密码不能有特殊字符!'));
    }
    callback();
};
const checkRole = (rule, value, callback) =>{
	if( !(/^[0-9]{3}$/).test(value) ){
        return callback(new Error('权限不在范围内'));
    }
    callback();
};
const checkClientVersion = (rule, value, callback) =>{
	if( value != 'V2' && value != 'V3' ){
		return callback(new Error('版本号错误'));
	}
	callback();
}
const contractTabRules = {
 	cus_id:[
        { required: true, message: '请选择客户名称', trigger: 'blur' }
    ],
    contract_id:[
        { required: true, message: '请选择合同编号', trigger: 'change' }
    ],
    contract_on_date:[
        { type: 'string', required: true, message: '请选择签订日期', trigger: ['blur', 'change']  }
    ],
    contract_amt:[
    	{ required: true, message: '请输入合同金额'},
        { validator: checkNum  , trigger: 'blur' }
    ],
    contract_agree_amt:[
    	{ required: true, message: '请输入合同约定金额' },
    	{ validator: checkNum , trigger: 'blur' }
    ],
    contract_begin_date:[
        { type: 'string', required: true, message: '请选择合同开始日期', trigger: ['blur', 'change'] }
    ],
    contract_end_date:[
        { type: 'string', required: true, message: '请选择合同结束日期', trigger: ['blur', 'change'] }
    ],
};
const cusTabRules = {
    customer_id:[
        {required: true, message: '客户ID为空哦~', trigger: 'blur'}
    ],
	propose_cus:[
        { required: true, message: '请输入客户名称', trigger: 'blur' }
    ],
    propose_cus_abbr:[
    	{ required: true, message: '请输入客户英文缩写' },
        { max: 20, message: '英文缩写长度不超过20位' },
        { validator: checkAbbr, trigger: 'blur' }
    ],
    contact_person:[
        { required: true, message: '请输入联系人', trigger: 'blur' }
    ],
    contact_tel_no:[
    	{  required: true, message: '请输入联系电话' },
        {  validator: checkPhone, trigger: 'blur' }
    ],
    role_name:[
        { required: true, message: '请选择用户权限', trigger: 'blur' }
    ],
    contact_subfaxno:[
        { validator: checkFax, trigger: 'blur' }
    ],
    contact_qq_no:[
        { validator: checkQQ, trigger: 'blur'},
    ],
    contact_wx_no:[
        { validator: checkWX, trigger: 'blur'}
    ],
    contract_date:[
        {  type: 'string', required: true, message: '请选择合同日期', trigger: ['blur', 'change'] }
    ],
    finish_date:[
        {  type: 'string', required: true, message: '请选择完工日期', trigger: ['blur', 'change'] }
    ],
    server_ip:[
    	{ required: true, message: '请输入IP地址' },
        { validator: checkIP, trigger: 'blur' }
    ],
    server_pwd:[
        { required: true, message: '请输入服务器密码', trigger: 'blur' },
        { max: 20, message: '服务器密码长度不超过20位' }
    ],
    db_pwd:[
        { required: true, message: '请输入数据库密码', trigger: 'blur' },
        { max: 20, message: '数据库密码长度不超过20位' }
    ],
    client_version:[
        { required: true, message: '请选择客户端版本号' },
        { validator: checkClientVersion , trigger: 'blur' }
    ],
    cus_area:[
        { required: true, message: '请选择区域', trigger: 'change' }
    ],
    cus_address:[
        { required: true, message: '请输入详细地址', trigger: 'blur' }
    ],
    serve_amt:[
    	{ required: true, message: '请输入服务费'},
        { validator: checkNum, trigger: 'blur' }
    ],
    nextinv_date:[
        { type:'string' , required: true, message: '请选择缴费日期', trigger: ['blur', 'change'] }
    ]
};
const engrTabRules = {
    staff_realname:[
        { required: true, message: '请输入管理员名称', trigger: 'blur' },
        { max: 10, message: '真实姓名长度不超过10个中文字' }
    ],
    staff_name:[
        { required: true, message: '请输入管理员登录名称', trigger: 'blur' },
        { min: 6, max: 12, message: '登录名长度在6到12位之间' }
    ],
    staff_pwd:[
        { required: true, message: '请输入登录密码' },
        { validator: checkPass, trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度在6到12位之间' }
    ],
    role_name:[
        { required: true, message: '请选择管理员权限', trigger: 'blur' },
        { validator: checkRole, message: '权限不在范围内'}
    ]
};
const serviceTabRules = {
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
	    { type: 'string', required: true, message: '请选择服务开始日期', trigger: ['blur', 'change']  }
	],
	service_end_date:[
	    { type: 'string', required: true, message: '请选择服务结束日期', trigger: ['blur', 'change']  }
	],
	contract_remark:[
	    { required: true, message: '请填写服务内容', trigger: 'blur' }
	]
};
export { contractTabRules, cusTabRules, engrTabRules, serviceTabRules }; 
