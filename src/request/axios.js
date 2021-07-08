/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 14:30:36
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 17:25:50
 */
import axios from 'axios'
import baseurl from '../api/base'
import routerPath from '../router/path'
import store from '../store'
import router from '../router'
import { ElMessage } from 'element-plus'

axios.defaults.timeout = 2000 * 10 // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json' // 请求头

// 请求拦截器
axios.interceptors.request.use(config => {
    console.log('axios interceptors config: ', config)
    // 登录或者注册时，不传递Token
    if (!config.url.endsWith(baseurl.signin) && !config.url.endsWith(baseurl.signin)) {
        axios.headers['Authorization'] = store.user.token // Token
    }
    return config
}, error => Promise.error(error))

// 响应拦截器
axios.interceptors.response.use(res =>
    res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    , err => {
        const { response } = err
        if (response) { // 请求已发出，但是不在2xx的范围 
            errHandle(response.status, response.data.message)
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
        }
    })

// 错误处理
const errHandle = (status, other) => {
    switch (status) {
        // 未登录，跳转到登陆页面
        case 401:
            ElMessage.error('请登陆')
            toRouter(routerPath.signin)
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
            // ElMessage.error(other)
            console.error(other)
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

export default axios