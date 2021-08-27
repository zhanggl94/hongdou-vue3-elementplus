/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-08 17:02:51
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-27 15:36:51
 */
module.exports = {
  lintOnSave: false,
  devServer: {
    //开发环境下设置为编译好以后直接打开浏览器浏览
    open: true,
    // 代理设置，解决开发环境下的跨域问题(由于后台处理跨域，所以这里暂时不使用了)
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/',  		// 要请求的域名(这里指的是hongdou-node工程的地址)
    //     pathRewrite: { '^/api': '/api' },			// 通过pathRewrite重写地址，将前缀/api转为/api（因为hongdou-node的路由中包括/api，所以此处也是/api）
    //     ws: false,							// 是否启用websockets
    //     changeOrigin: true					//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   }
    // }
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