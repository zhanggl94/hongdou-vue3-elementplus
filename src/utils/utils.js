/*
 * @Descripttion: 一些常用的类
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 22:18:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-23 09:16:27
 */

export const setToken = (token) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')

// 空值校验
export const validateNull = (message, rule, value, callback) => {
    if (!value.trim()) callback(new Error(message))
    callback()
}

// 对Obejct的某个键值排序(升序)
export const compare = (key) => {
    return (obj1, obj2) => {
        const value1 = obj1[key]
        const value2 = obj2[key]
        if (value1 > value2)
            return 1
        else if (value1 < value2)
            return -1
        else
            return 0
    }
}