/*
 * @Descripttion: store user index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-20 00:13:24
 */

import { Store } from 'vuex'
import user from './modules/user'

export default new Store({
  modules: {
    user
  }
})
