/*
 * @Descripttion: user mutations
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-19 06:22:06
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 16:44:22
 */

import userMUTypes from './mutation-types'

export default {
  [userMUTypes.SET_USERINFO](state, data) {
    this.commit(userMUTypes.SET_USERNAME, data.username)
    this.commit(userMUTypes.SET_TOKEN, data.token)
  },
  [userMUTypes.SET_USERNAME](state, username) {
    state.username = username
    localStorage.setItem('username', username)
  },
  [userMUTypes.SET_TOKEN](state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  [userMUTypes.CLEAR_USERINFO](state) {
    if (state) {
      state = null;
    }
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }
}
