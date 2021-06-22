/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-22 15:11:43
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-22 15:41:36
 */

export default {
    unReadMessageList(state) {
        return state.messageList.filter(item => item.status === '0')
    },
    readMessageList(state) {
        return state.messageList.filter(item => item.status === '1')
    },
    recycleMessageList(state) {
        return state.messageList.filter(item => item.status === '2')
    }
}