/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 14:11:28
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 16:29:34
 */
import base from './base'
import axios from '../request/axios'

export default {
    signin: (param) => axios.post(base.management + base.signin, JSON.stringify(param))
}