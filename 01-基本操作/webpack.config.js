const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /* 打包的入口文件，从哪个js文件开始打包 */
  entry: './src/index.js',

  /* 打包生成的js文件放在哪里 */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    clean: true  // 打包前清理dist文件夹
  },

  /* 使用插件，插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。 */
  plugins: [
    /* html-webpack-plugin用于将所有打包后得到的资源，注入到指定的html文件并生成html */
    new HtmlWebpackPlugin({
      template: './index.html',  // 打包注入的html模板
      filename: 'index.html', // 打包生成的文件名
      inject: 'body' // 设置所有资源文件注入模板的位置。可以设置的值
      // true|'head'|'body'|false，默认值为 true
    })
  ],

  /* 如果js运行报错，可以在浏览器控制台查看正确的报错位置 */
  devtool: 'inline-source-map',

  /* npx webpack --watch 能够在文件更改之后自动打包文件 */
  /* 但是浏览器需要重新刷新，怎么自动刷新，用 webpack-dev-server */
  devServer: {
    /* 告知 webpack-dev-server ，将 dist 目录下的文件作为 web 服务的根目录 */
    /* webpack-dev-server 会将指定文件夹的资源放在本地的一个指定的服务器上 */
    /* webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server根路径上的真实文件一样 */
    static: './dist'
  },

  mode: 'development'  // 生产模式或者开发模式
  // development, production 或 none 默认值为 production
};