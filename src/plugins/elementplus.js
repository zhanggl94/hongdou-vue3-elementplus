/*
 * @Descripttion: element plus plugin config
 * @Version:
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-26 16:38:22
 */

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'  //element-plus
import 'element-plus/lib/theme-chalk/index.css'

export default app => {
  app.use(ElementPlus, { locale })
}
