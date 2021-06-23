/*
 * @Descripttion: store user index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 17:37:42
 */

import { Store } from 'vuex'
import user from './modules/user'
import message from './modules/message'
import tags from './modules/tags'

export default new Store({
  state: {
    collapse: false
  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse
    }
  },
  modules: {
    user,
    message,
    tags,
  }
})
