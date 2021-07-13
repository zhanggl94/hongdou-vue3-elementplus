/*
 * @Descripttion: user mutations
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-19 06:22:06
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-12 14:49:17
 */

import userMUTypes from './mutation-types'
import { removeToken } from '../../../utils/utils'

export default {
  [userMUTypes.SET_USERINFO](state, data) {
    state.id = data.id
    state.username = data.username
    localStorage.setItem('id', state.id)
    localStorage.setItem('username', state.username)
  },
  [userMUTypes.CLEAR_USERINFO](state) {
    state.id = ''
    state.username = ''
    removeToken()
    localStorage.removeItem('id')
    localStorage.removeItem('username')
  }
}
