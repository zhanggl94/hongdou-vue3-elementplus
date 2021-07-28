/*
 * @Descripttion: store user index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 16:26:04
 */

import { Store } from 'vuex'
import user from './modules/user'
import message from './modules/message'
import tags from './modules/tags'
import billType from './modules/bill/billtype'
import payType from './modules/bill/paytype'
import carBrand from './modules/bill/carbrand'

export default new Store({
  state: {
    collapse: false,
    loading: false
  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse
    },
    startLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    }
  },
  modules: {
    user,
    message,
    tags,
    billType,
    payType,
    carBrand,
  }
})
