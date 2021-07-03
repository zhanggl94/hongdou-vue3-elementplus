/*
 * @Descripttion: router index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-03 23:19:59
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          title: '主页'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: '/message',
        name: 'Message',
        meta: {
          title: '消息'
        },
        component: () => import(/* webpackChunkName: "message" */ '../views/Message.vue')
      },
      {
        path: '/billtype',
        name: 'BillType',
        meta: {
          title: '账单类型'
        },
        component: () => import(/* webpackChunkName: "billtype" */ '../views/bill/billtype/BillType.vue')
      },
      {
        path: '/permission',
        name: '403',
        meta: {
          title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */
          '../views/403.vue')
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面'
        },
        component: () => import(/* webpackChunkName: "404" */
          '../views/404.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
