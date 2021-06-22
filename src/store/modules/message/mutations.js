/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-22 13:55:54
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-22 13:55:55
 */

import messageMUTypes from './mutation-types'

export default {
    [messageMUTypes.ADD_MESSAGE](state, data) {
        state.messageList.push(data)
    }
}