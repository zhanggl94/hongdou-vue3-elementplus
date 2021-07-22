/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-22 09:00:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-22 09:00:45
 */
import muTypes from './mutation-types'

export default {
    // 重新给List赋值
    [muTypes.SETBILLTYPELIST](state, list) {
        state.list = list
    },
}