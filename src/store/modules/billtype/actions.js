/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-19 17:26:41
 */
import actionTypes from './action-types'
import billtype from '../../../api/billtype'

export default {
  [actionTypes.CREATE](context, params) {
    return new Promise((resolve, reject) => {
      billtype.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  [actionTypes.SELECT](context, params) {
    return new Promise((resolve, reject) => {
      billtype.select(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}