/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 14:30:36
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-09 17:44:08
 */

import axios from 'axios'
import baseurl from '../api/base'
import routerPath from '../router/path'
import { setToken, getToken } from '../utils/utils'
import router from '../router'
import { ElMessage, ElLoading } from 'element-plus'

axios.defaults.timeout = 2000 * 10 // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json' // 请求头

// 请求拦截器
axios.interceptors.request.use(config => {
    showLoading()
    console.log('axios interceptors config: ', config)
    // 登录或者注册时，不传递Token
    if (!config.url.endsWith(baseurl.signin) && !config.url.endsWith(baseurl.signin)) {
        axios.headers['Authorization'] = getToken() // Token
    }
    return config
}, error => Promise.error(error))

// 响应拦截器
axios.interceptors.response.use(res => {
    hideLoading()
    if (res.status === 200) {
        if ((res?.data?.jwtToken && !getToken()) || (res?.data?.isRefreshClientToken)) {
            setToken(res.data.jwtToken)
        }
        return Promise.resolve(res)
    }
    else {
        return Promise.reject(res)
    }
}, err => {
    hideLoading()
    const { response } = err
    if (response) { // 请求已发出，但是不在2xx的范围 
        errHandle(response.status, response.data.message)
        return Promise.reject(response)
    } else {
        //
        // TODO: 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        // if (!window.navigator.onLine) {
        //     store.commit('changeNetwork', false);
        // } else {
        //     return Promise.reject(err);
        // }
        return Promise.reject(response)
    }
})

// 错误处理
const errHandle = (status, other) => {
    switch (status) {
        // 未登录，跳转到登陆页面
        case 401:
            if (other) {
                ElMessage.error(other)
            } else {
                ElMessage.error('请登陆')
            }
            setTimeout(() => {
                toRouter(routerPath.signin)
            }, 1000);
            break
        // 权限不足
        case 403:
            ElMessage.error('权限不足')
            toRouter(routerPath.to403)
            break;
        // 404请求不存在
        case 404:
            ElMessage.error('页面不存在')
            toRouter(routerPath.to404)
            break;
        default:
            console.error(other)
            ElMessage.error(other)
    }
}

// 路由跳转
const toRouter = (path) => {
    router.replace({
        path,
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

let loadingInstance = null;

// 显示全局loading
const showLoading = () => {
    loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgb(255,255,255,0.7)'
    })
}

// 关闭全局loading
const hideLoading = () => {
    loadingInstance.close()
}

export default axios