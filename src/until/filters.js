const contractTypeFilters = [
	{ text: '销售合同', value: '0' },
    { text: '维护合同', value: '1' },
    { text: '增值合同', value: '2' },
    { text: 'webapp合同', value: '3' },
];
const IspayFilters = [
	{ text: '未付清', value: '0' }, 
    { text: '已付清', value: '1' },
];
const IsinvFilters = [
	{ text: '未开票', value: '0' }, 
    { text: '已开票', value: '1' },
];
const roleTypeFilters = [
	{ text: '管理员', value: '100' }, 
	{ text: '财务人员', value: '200' },
	{ text: '实施员', value: '300' }
];
const serviceTypeFilters = [
	{ text: '实施', value: '0' }, 
    { text: '售后', value: '1' },
];
const paymentTypeFilters = [
	{ text: '欠费', value: '0' }, 
	{ text: '已缴费', value: '1' }
];
const clientVersionFilters = [
	{ text: 'V2', value:'V2'},
	{ text: 'V3', value:'V3'}
];
export { contractTypeFilters, IspayFilters, IsinvFilters, roleTypeFilters, serviceTypeFilters, paymentTypeFilters, clientVersionFilters };