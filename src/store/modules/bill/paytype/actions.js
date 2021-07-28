/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 16:36:26
 */
import actionTypes from './action-types'
import payType from '../../../../api/bill/paytype'

export default {
  // 查询
  [actionTypes.PAYTYPE_SELECT](context, params) {
    return new Promise((resolve, reject) => {
      payType.select(params)
        .then(result => {
          resolve(result)
        })
        .catch(error => reject(error))
    })
  },
  // 新建
  [actionTypes.PAYTYPE_CREATE](context, params) {
    return new Promise((resolve, reject) => {
      payType.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 编辑
  [actionTypes.PAYTYPE_EDIT](context, params) {
    return new Promise((resolve, reject) => {
      payType.edit(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 删除
  [actionTypes.PAYTYPE_DELETE](context, params) {
    return new Promise((resolve, reject) => {
      payType.delete(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
}