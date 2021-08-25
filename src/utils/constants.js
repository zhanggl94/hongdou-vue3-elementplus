/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-21 08:58:36
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-25 19:32:48
 */
export default {
    formMode: { // 表单模式
        create: 0,
        edit: 1,
        readonly: 2
    },
    confirmType: { // popconfirm 提示框类型
        info: {
            type: 'info',
            title: '提示',
            iconClass: 'el-icon-info',
        },
        warning: {
            type: 'warning',
            title: '警告',
            iconClass: 'el-icon-warning',
        }
    },
    pageSizeDefault: 10,
    queryListTarget: {
        car: 'car',
        brand: 'brand',
        payType: 'payType',
        billType: 'billType',
    }
}