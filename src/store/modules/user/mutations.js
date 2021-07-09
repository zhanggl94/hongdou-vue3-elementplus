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
    state.id = data.id
    state.username = data.username
  },
}
