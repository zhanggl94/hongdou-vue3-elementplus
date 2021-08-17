/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-17 17:47:23
 */
import actionTypes from './action-types'
import car from '../../../../../api/bill/car/car'

export default {
  // 查询
  [actionTypes.CAR_SELECT](context, params) {
    return new Promise((resolve, reject) => {
      car.select(params)
        .then(result => {
          resolve(result)
        })
        .catch(error => reject(error))
    })
  },
  // 新建
  [actionTypes.CAR_CREATE](context, params) {
    return new Promise((resolve, reject) => {
      car.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 编辑
  [actionTypes.CAR_EDIT](context, params) {
    return new Promise((resolve, reject) => {
      car.edit(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  // 删除
  [actionTypes.CAR_DELETE](context, params) {
    return new Promise((resolve, reject) => {
      car.delete(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
}