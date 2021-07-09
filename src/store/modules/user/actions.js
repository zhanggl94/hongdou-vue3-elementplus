/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 16:31:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-09 16:14:56
 */

import mutationTYpes from './mutation-types'
import actionTypes from './action-types'
import user from '../../../api/user'

export default {
    async [actionTypes.SIGNIN]({ commit }, params) {
        try {
            const result = await user.signin(params)
            if (result?.data?.data) {
                commit(mutationTYpes.SET_USERINFO, result.data.data)
            }
            return result;
            // user.signin(params)
            // .then(data=>{
            //     if (data?.data?.data) {
            //         commit(mutationTYpes.SET_USERINFO, data.data.data)
            //     }
            // })
            // .catch(err=>{
            //     console.error(err)
            // })
        } catch (error) {
            console.error(error)
            throw error
        }
    },
}