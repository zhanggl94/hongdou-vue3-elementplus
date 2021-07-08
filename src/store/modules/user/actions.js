/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 16:31:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 16:46:08
 */

import mutationTYpes from './mutation-types'
import actionTypes from './action-types'
import user from '../../../api/user'

export default {
    async [actionTypes.SIGNIN]({ commit }, params) {
        await user.signin(params).then(data => {
            if (data) {
                commit(mutationTYpes.SET_USERINFO, data.params)
            }
        }).catch(err => {
            console.error(err);
        })
    }
}