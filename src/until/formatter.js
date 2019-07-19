export function contractType ( type ){
	switch (type) {
        case '0':
            return '销售合同';
            break;
        case '1':
            return '维护合同';
            break;
        case '2':
            return '增值合同';
            break;
        case '3':
            return 'webapp合同';
            break;
        default:
            return '未知合同类型';
    }
};
export function contractIspay( ispay ){
	switch (ispay) {
        case '0':
            return '未付清';
            break;
        case '1':
            return '已付清';
            break;
        default:
            return '未知付款状态';
    }
};
export function contractIsinv( isinv ){
	switch (isinv) {
        case '0':
            return '未开票';
            break;
        case '1':
            return '已开票';
            break;
        default:
            return '未知开票状态';
    }
};
export function roleTypeFormatter( type ){
    switch (type) {
        case '100':
            return '管理员';
            break;
        case '200':
            return '财务人员';
            break;
        case '300':
            return '实施员';
            break;
        default:
            return '未知权限分组';
    }
};
export function invStateFormatter( state ){
    switch (state) {
        case '0':
            return '欠费';
            break;
        case '1':
            return '已缴费';
            break;
        default:
            return '未知缴费状态';
    }
};
export function serviceTypeFormatter( type ){
    switch (type) {
        case '0':
            return '安装';
            break;
        case '1':
            return '售后';
            break;
        default:
            return '未知实施类型';
    }
}
