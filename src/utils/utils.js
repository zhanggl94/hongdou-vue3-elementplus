/*
 * @Descripttion: 一些常用的类
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 22:18:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-23 14:42:15
 */

export const setToken = (token) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')

// string的空值校验
export const validateStrNull = (message, rule, value, callback) => {
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

// 获取汽车品牌查询信息列表
export const getCarBrandSearchList = list => list.reduce(
    (acc, curr) => {
        const list = [];
        for (const key in curr) {
            const carBrand = {
                key: '',
                isShow: true,
                value: '',
                title: '',
                width: 200
            }
            switch (key) {
                case 'id':
                    carBrand.isShow = false
                    break;
                case 'brand':
                    carBrand.title = '品牌'
                    break;
                case 'note':
                    carBrand.title = '备注'
                    carBrand.width = 400
                    break;
            }
            carBrand.key = key
            carBrand.value = curr[key]
            list.push(carBrand)
        }
        if (list.length)
            acc.push(list)
        return acc
    }, [])