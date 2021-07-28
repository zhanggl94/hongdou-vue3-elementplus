/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-22 17:52:31
 */
import actionTypes from './action-types'
import carBrand from '../../../api/carbrand'

export default {
  // 查询
  [actionTypes.CARBRAND_SELECT](context, params) {
    return new Promise((resolve, reject) => {
      carBrand.select(params)
        .then(result => {
          resolve(result)
        })
        .catch(error => reject(error))
    })
  },
  // 新建
  [actionTypes.CARBRAND_CREATE](context, params) {
    return new Promise((resolve, reject) => {
      carBrand.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 编辑
  [actionTypes.CARBRAND_EDIT](context, params) {
    return new Promise((resolve, reject) => {
      carBrand.edit(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 删除
  [actionTypes.CARBRAND_DELETE](context, params) {
    return new Promise((resolve, reject) => {
      carBrand.delete(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
}