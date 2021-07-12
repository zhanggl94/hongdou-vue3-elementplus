/*
 * @Descripttion: 一些常用的类
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 22:18:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-12 14:53:27
 */

export const setToken = (token) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')