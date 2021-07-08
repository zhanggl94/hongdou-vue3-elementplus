/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 17:02:51
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 17:02:59
 */
module.exports = {
    lintOnSave: false,
    devServer: {
      //开发环境下设置为编译好以后直接打开浏览器浏览
      open: true,
    },
    configureWebpack: (config) => {
      //调试JS
      config.devtool = "source-map"
    },
    css: {
      //查看CSS属于哪个css文件
      sourceMap: true,
    },
  }