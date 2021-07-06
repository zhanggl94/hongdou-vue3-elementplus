/*
 * @Descripttion: 一些常用的类
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 22:18:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-06 17:59:31
 */

/**
 * 用户名称校验
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @returns
 */
export const validateUsername = (rule, value, cb) => {
  if (!value) {
    return cb(new Error('用户名不能为空'))
  }
}

/**
 * 密码校验
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @returns
 */
export const validatePassword = (rule, value, cb) => {
  if (!value) {
    return cb(new Error('密码不能为空'))
  }
}