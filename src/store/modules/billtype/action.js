/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 05:59:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-18 06:03:41
 */
import actionTypes from './action-types'
import billtype from '../../../api/billtype'

export default {
  [actionTypes.CREATE](params) {
    return new Promise((resolve, reject) => {
      billtype.create(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  },
  [actionTypes.SELECT](params) {
    return new Promise((resolve, reject) => {
      billtype.select(params)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}