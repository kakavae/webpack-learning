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
    filename: 'scripts/[name].[contenthash].js',

    /* 所有的js文件引入的公共前缀 --- cdn部署之后的位置 */
    publicPath: 'http://localhost:8080/'
  },

  // 生产模式或者开发模式
  // development, production 或 none 默认值为 production
  mode: 'production',

  /* 优化配置---压缩css */
  optimization: {
    minimizer: [
      /* css压缩 */
      new CssMinimizerPlugin(),
      /* js压缩 */
      new TerserPlugin()
    ]
  },

  /* 去掉性能提示 */
  performance: {
    hints: false
  }
}