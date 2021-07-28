/*
 * @Descripttion: router index
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 17:00:17
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import routePath from './path'
import { getToken } from '../utils/utils'
import store from '../store'

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
          title: '主页',
          needSignin: true,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: routePath.message,
        name: 'Message',
        meta: {
          title: '消息',
          needSignin: true,
        },
        component: () => import(/* webpackChunkName: "message" */ '../views/Message.vue')
      },
      {
        path: routePath.billType,
        name: 'BillType',
        meta: {
          title: '账单类型',
          needSignin: true,
        },
        component: () => import(/* webpackChunkName: "billtype" */ '../views/bill/billtype/BillType.vue')
      },
      {
        path: routePath.payType,
        name: 'PayType',
        meta: {
          title: '支付类型',
          needSignin: true,
        },
        component: () => import(/* webpackChunkName: "billtype" */ '../views/bill/paytype/PayType.vue')
      },
      {
        path: routePath.carBrand,
        name: 'CarBrand',
        meta: {
          title: '汽车品牌',
          needSignin: true,
        },
        component: () => import(/* webpackChunkName: "billtype" */ '../views/bill/car/carbrand/CarBrand.vue')
      },
      {
        path: routePath.to403,
        name: '403',
        meta: {
          title: '没有权限',
          needSignin: true,
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
    path: routePath.signin,
    name: 'Signin',
    meta: {
      title: '登录',
      needSignin: false,
    },
    component: () =>
      import(/* webpackChunkName: "Signin" */ '../views/Signin.vue')
  },
  {
    path: routePath.signup,
    name: 'Signup',
    meta: {
      title: '注册',
      needSignin: false,
    },
    component: () =>
      import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由拦截器：
router.beforeEach((to, from, next) => {
  if (to.meta.needSignin && (!getToken() || !store.state.user.username || !store.state.user.id)) { // 页面没有Token或者用户名ID为空时，需要跳转到登陆页
    router.push({
      path: routePath.signin,
      query: {
        redirect: to.fullPath // 登录后跳转到该页面
      }
    })
  } else {
    next()
  }
})

export default router
