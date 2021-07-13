/*
 * @Descripttion: 一些常用的类
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 22:18:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-13 17:48:46
 */

export const setToken = (token) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')

// 空值校验
export const validateNull = (message, rule, value, callback) => {
    if (!value.trim()) callback(new Error(message))
    callback()
}
// 两次输入密码校验
export const validateConfirmPassword = (value, rule, confirmValue, callback) => {
    if (!confirmValue.trim()) {
        callback(new Error('请再次输入密码'))
    } else if (confirmValue !== value) {
        callback(new Error('两次输入密码不一致'))
    }
    callback()
}