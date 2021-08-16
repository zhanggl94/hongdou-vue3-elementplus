/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-08-16 16:15:40
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-16 16:17:21
 */

import axios from '../../../request/axios'
import base from '../../base'

export default {
    select: (params) => axios.get(base.management + base.car.select, { params }),
    create: (params) => axios.post(base.management + base.car.create, params),
    edit: (params) => axios.put(base.management + base.car.edit, params),
    delete: (params) => axios.delete(base.management + base.car.delete, { data: params }),
  }