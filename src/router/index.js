/*
 * @Descripttion: router index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 15:45:17
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import routePath from './path'

const routes = [
  {
    path: routePath.home,
    redirect: routePath.dashboard,
  },
  {
    path: routePath.home,
    name: 'Home',
    component: Home,
    children: [
      {
        path: routePath.dashboard,
        name: 'Dashboard',
        meta: {
          title: '主页'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: routePath.message,
        name: 'Message',
        meta: {
          title: '消息'
        },
        component: () => import(/* webpackChunkName: "message" */ '../views/Message.vue')
      },
      {
        path: routePath.billtype,
        name: 'BillType',
        meta: {
          title: '账单类型'
        },
        component: () => import(/* webpackChunkName: "billtype" */ '../views/bill/billtype/BillType.vue')
      },
      {
        path: routePath.to403,
        name: '403',
        meta: {
          title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */
          '../views/403.vue')
      },
      {
        path: routePath.to404,
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
    path: routePath.singin,
    name: 'Signin',
    meta: {
      title: '登录'
    },
    component: () =>
      import(/* webpackChunkName: "Signin" */ '../views/Signin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
