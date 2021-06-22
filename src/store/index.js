/*
 * @Descripttion: store user index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-22 15:38:21
 */

import { Store } from 'vuex'
import user from './modules/user'
import message from './modules/message'

export default new Store({
  state: {
    collapse: false,
    tagList: [],
  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse
    }
  },
  modules: {
    user,
    message
  }
})
