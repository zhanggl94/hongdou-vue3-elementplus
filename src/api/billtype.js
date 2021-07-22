/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 06:09:41
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-22 16:19:24
 */
import axios from '../request/axios'
import base from './base'

export default {
  select: (params) => axios.get(base.management + base.billType.select, { params }),
  create: (params) => axios.post(base.management + base.billType.create, params),
  edit: (params) => axios.put(base.management + base.billType.edit, params),
  delete: (params) => axios.delete(base.management + base.billType.delete, { data: params }),
}
