module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: config => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            // 打包文件大小配置
            config.performance = {
                maxEntrypointSize: 10000000,
                maxAssetSize: 30000000
            }
        }
    },
    //本地能跑打包后在本地不能跑也是跨域
    //但是本地打包完能跑到了服务器不能, 只能说可能是跨域.
/*     devServer: {
        proxy: {
            '/api': {
                target: 'http://8.130.48.246:3000/',//这里填入你要请求的接口的前缀
                ws: true,//代理websocked
                changeOrigin: true,//虚拟的站点需要更管origin
                secure: false,     //是否https接口
                pathRewrite: {
                    '^/api': ''//重写路径
                }
            }
        }
    } */

}