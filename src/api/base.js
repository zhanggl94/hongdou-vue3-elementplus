/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 14:28:11
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-16 16:16:32
 */

export default {
    // management: 'http://localhost:3001/api',
    management: '/api', // 开发环境下，启用跨域时的baseurl
    signin: '/signin', // 登陆
    signup: '/signup', // 注册
    userEdit:'/user/edit', // 修改用户信息
    billType:{ // 账单类型
      select:'/billtype/select',
      create:'/billtype/create',
      edit:'/billtype/edit',
      delete:'/billtype/delete',
    },
    payType:{ // 支付类型
      select:'/paytype/select',
      create:'/paytype/create',
      edit:'/paytype/edit',
      delete:'/paytype/delete',
    },
    carBrand:{ // 汽车品牌
      select:'/carbrand/select',
      create:'/carbrand/create',
      edit:'/carbrand/edit',
      delete:'/carbrand/delete',
    },
    car:{ // 汽车信息
      select:'/car/select',
      create:'/car/create',
      edit:'/car/edit',
      delete:'/car/delete',
    },
}