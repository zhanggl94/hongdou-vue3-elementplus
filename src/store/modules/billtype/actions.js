/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-22 17:52:31
 */
import actionTypes from './action-types'
import billType from '../../../api/billtype'
import muTypes from './mutation-types'
import { compare } from '../../../utils/utils'

export default {
  // 查询
  [actionTypes.BILLTYPE_SELECT]({ commit }, params) {
    return new Promise((resolve, reject) => {
      billType.select(params)
        .then(result => {
          if (result.data.isOk) {
            const list = result.data.data.sort(compare('sort'))
            commit(muTypes.SETBILLTYPELIST, list)
          }
          resolve(result)
        })
        .catch(error => reject(error))
    })
  },
  // 新建
  [actionTypes.BILLTYPE_CREATE](context, params) {
    return new Promise((resolve, reject) => {
      billType.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 编辑
  [actionTypes.BILLTYPE_EDIT](context, params) {
    return new Promise((resolve, reject) => {
      billType.edit(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 删除
  [actionTypes.BILLTYPE_DELETE](context, params) {
    return new Promise((resolve, reject) => {
      billType.delete(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
}