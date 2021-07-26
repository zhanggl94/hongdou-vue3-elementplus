/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 16:31:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-13 09:40:04
 */

import mutationTypes from './mutation-types'
import actionTypes from './action-types'
import user from '../../../api/user'

export default {
  // 登录
  [actionTypes.SIGNIN]({ commit }, params) {
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
  [actionTypes.SIGNUP]({ commit }, params) {
    return new Promise((resolve, reject) => {
      user.signup(params)
        .then(result => {
          if (result?.data?.code)
            commit(mutationTypes.SET_USERINFO, result.data.data)
          resolve(result)
        })
        .catch(err => {
          console.error('signup err', err)
          reject(err)
        })
    })
  },

  // 编辑
  [actionTypes.USER_EDIT](context, params) {
    return new Promise((resolve, reject) => {
      user.edit(params)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}