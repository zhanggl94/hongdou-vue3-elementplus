/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-28 16:19:48
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-16 16:17:20
 */

import axios from '../../../request/axios'
import base from '../../base'

export default {
    select: (params) => axios.get(base.management + base.carBrand.select, { params }),
    create: (params) => axios.post(base.management + base.carBrand.create, params),
    edit: (params) => axios.put(base.management + base.carBrand.edit, params),
    delete: (params) => axios.delete(base.management + base.carBrand.delete, { data: params }),
  }