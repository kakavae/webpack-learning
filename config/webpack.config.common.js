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
  /* 打包的入口文件，从哪个js文件开始打包 */
  /* entry处代码分离--缺点：如果两个bundle import了相同的模块，这个模块会在两个bundle中都引入，造成重复，两个包都变很大，页面加载变慢 */
  /* index.bundle.js 与 another.bundle.js 共享的模块 lodash.js 被打包到一个单独的文件 shared.bundle.js 中 */
  // entry: {
  //   /* 配置dependOn选项，共享模块 */
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared'
  //   },

  //   another: {
  //     import: './src/js/another-module.js',
  //     dependOn: 'shared'
  //   },

  //   shared: 'lodash',
  // },

  entry: {
    index: './src/index.js',
    another: './src/js/another-module.js'
  },

  /* 打包生成的js文件放在哪里 */
  output: {
    path: path.resolve(__dirname, '../dist'),

    clean: true,  // 打包前清理dist文件夹

    /* 加载的文件打包后的存放位置 */
    /* 现在打包的图片就会存在images文件夹下面的指定文件名 */
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  /* 使用插件，插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。 */
  plugins: [
    /* html-webpack-plugin用于将所有打包后得到的资源，注入到指定的html文件并生成html */
    new HtmlWebpackPlugin({
      template: './index.html',  // 打包注入的html模板
      filename: 'index.html', // 打包生成的文件名
      inject: 'body' // 设置所有资源文件注入模板的位置。可以设置的值
      // true|'head'|'body'|false，默认值为 true
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    })
  ],

  /* npx webpack --watch 能够在文件更改之后自动打包文件 */
  /* 但是浏览器需要重新刷新，怎么自动刷新，用 webpack-dev-server */
  devServer: {
    /* 告知 webpack-dev-server ，将 dist 目录下的文件作为 web 服务的根目录 */
    /* webpack-dev-server 会将指定文件夹的资源放在本地的一个指定的服务器上 */
    /* webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server根路径上的真实文件一样 */
    static: '../dist'
  },

  /* 文件加载，加载js以外的其他文件 */
  /* 意思是：当你在js文件中import一个非js文件的时候，该如何去处理，加载路径？解析为dataURL?直接读取源文件？还是按大小不同进行不同的处理？ */
  module: {
    rules: [
      /* 1. 将一个单独的文件导出为URL */
      /* 遇到import的是一个jpg图片，实际上导出的就是图片的url */
      {
        test: /\.jpg$/,
        type: 'asset/resource'
        /* 指定当前资源打包后存放的位置，会覆盖 output.assetModuleFilename 选项 */,
        generator: {
          filename: 'images/[hash][ext]'
        }
      },

      /* 2. 默认使用base64编码指定文件的内容 */
      {
        test: /\.svg$/,
        type: 'asset/inline',
        /* 指定文件的编码格式 */
        /* 这个编码的性质div的background的url 好像不识别  */
        generator: {
          dataUrl: (content) => {
            return svgToMiniDataURI(content.toString())
          }
        }
      },

      /* 3. 加载文件资源源代码--文件是什么，就加载什么 */
      {
        test: /\.txt$/,
        type: 'asset/source'
      },

      /* 4.通用资源类型 asset , 在导出一个 data URI 和发送一个单独的文件之间自动选择。*/
      /* 默认小于8kb会被转换为dataURL */
      {
        test: /\.png$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // byte
          }
        }
      },

      /* 5. loader */
      /* 当你碰到「在 require() / import 语句中被解析为'.css' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下 */
      /* loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。 */
      /*       {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }, */
      /* 从右到左执行loader，将less文件转换为css样式 */
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      /* 单独分离css文件 */
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      /* 解析其他文件 */
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },

      /* 6. babel-loader */
      /* 将es6新语法转换为低版本的语法 */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  /* 优化配置---压缩css */
  optimization: {
    /* 模块chunk */
    splitChunks: {
      /* 对于第三方模块，一般不会发生变化，所以直接强缓存 */
      /* 缓存就是在本地的服务器里面取资源的时候也走强缓存 */
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  }
};