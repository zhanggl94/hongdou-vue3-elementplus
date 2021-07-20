/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 06:09:41
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-20 17:24:01
 */
import axios from '../request/axios'
import base from './base'

export default {
  select: (params) => axios.get(base.management + base.billtype.select, { params }),
  create: (params) => axios.post(base.management + base.billtype.create, params)
}
