/* 路径解析 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* svg压缩 */
const svgToMiniDataURI = require('mini-svg-data-uri')
/* 将css文件单独抽离出来的插件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* 压缩css文件, css-minimizer-webpack-plugin和style-loader不能同时使用，分开写loader也不行 */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
/* 导入解析json5文件的parse */
const json5 = require('json5')
/* 压缩js的包 */
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  /* 打包生成的js文件放在哪里 */
  output: {
    /* 打包的js缓存 */
    /* contenthash 如果打包生成的文件发生变化了，文件名就会变化，这样客户端请求缓存的时候，如果文件名没变，就会走缓存，否则返回新资源 */
    filename: 'scripts/[name].js',
  },

  /* 如果js运行报错，可以在浏览器控制台查看正确的报错位置 */
  /* 源码映射，可以将编译压缩后的代码再对应回未压缩的源码。 */
  devtool: 'inline-source-map',

  // 生产模式或者开发模式
  // development, production 或 none 默认值为 production
  mode: 'development'
}