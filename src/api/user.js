/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 14:11:28
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-20 15:34:24
 */
import base from './base'
import axios from '../request/axios'

export default {
  // 登录
  signin: (params) => axios.post(base.management + base.signin, params),

  // 注册
  signup: (params) => axios.post(base.management + base.signup, params),

  // 编辑
  edit: (params) => axios.put(base.management + base.userEdit, params),
}