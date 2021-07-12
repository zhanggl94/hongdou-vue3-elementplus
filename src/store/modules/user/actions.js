/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 16:31:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-12 13:39:37
 */

import mutationTypes from './mutation-types'
import actionTypes from './action-types'
import user from '../../../api/user'

export default {
  // 登录
  async [actionTypes.SIGNIN]({ commit }, params) {
    return new Promise((resolve, reject) => {
      user.signin(params)
        .then(result => {
          if (result?.data?.data)
            commit(mutationTypes.SET_USERINFO, result.data.data)
          resolve(result)
        }).catch(err => {
          reject(err)
        })
    })
  },

  // 注册
  async [actionTypes.SIGNUP]({ commit }, params) {
    return new Promise((resolve, reject) => {
      user.signup(params)
        .then(result => {
          if (result?.data?.data)
            commit(mutationTypes.SET_USERINFO, result.data.data)
          resolve(result)
        })
        .catch(err => {
          console.log('signup err', err)
          reject(err)
        })
    })
  }
}