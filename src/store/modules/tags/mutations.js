/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 17:24:35
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-24 17:15:53
 */

import tagsMUTypes from './mutation-types'

export default {
    [tagsMUTypes.SET](state, data) {
        state.tagList.push(data)
    },
    [tagsMUTypes.DELETE](state, data) {
        // if (state.tagList.length) {
            state.tagList.splice(data.index, 1)
        // }
    }
}