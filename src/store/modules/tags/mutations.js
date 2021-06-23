/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 17:24:35
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 17:24:36
 */

import tagsMUTypes from './mutation-types'

export default {
    [tagsMUTypes.ADD](state, data) {
        state.tagList.push(data)
    },
}