/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 06:09:41
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 16:39:35
 */
import axios from '../../request/axios'
import base from '../base'

export default {
  select: (params) => axios.get(base.management + base.payType.select, { params }),
  create: (params) => axios.post(base.management + base.payType.create, params),
  edit: (params) => axios.put(base.management + base.payType.edit, params),
  delete: (params) => axios.delete(base.management + base.payType.delete, { data: params }),
}
