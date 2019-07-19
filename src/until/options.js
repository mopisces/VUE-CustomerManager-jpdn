const contractTypeOptions = [
	{
        label:'销售合同',
        value:'0'
    },
    {
        label:'维护合同',
        value:'1'
    },
    {
        label:'增值合同',
        value:'2'
    },
    {
        label:'webapp合同',
        value:'3'
    }
];
const authorityTypeOptions = [
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
    },
];
const paymentTypeOptions = [
	{
        value:'0',
        label:'欠费'
    },
    {
        value:'1',
        label:'已缴费'
    }
];
const serviceTypeOptions = [
	{
        value:'0',
        label:'安装'
    },
    {
        value:'1',
        label:'售后'
    }
];
const clientVersionOptions = [
	{
        value:'V2',
        label:'V2'
    },
    {
        value:'V3',
        label:'V3'
    }
];
export { contractTypeOptions, authorityTypeOptions, paymentTypeOptions, serviceTypeOptions, clientVersionOptions };