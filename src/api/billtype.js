/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhanggl
 * @Date: 2021-07-18 06:09:41
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-18 06:09:45
 */
import axios from '../request/axios'
import base from './base'

export default {
  select: (params) => axios.get(base.billtype.select, { params }),
  create: (params) => axios.post(base.billtype.create, params)
}
