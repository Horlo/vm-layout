const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entryConfig = require('./entry.config');
const optimization = require('./optimization.config');

let webpack_config = {
  // 多入口文件
  entry: {
    // index: './src/entry/index.js',
    ...entryConfig.entry(),
  },
  //打包输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: "./",
  },
  //解析规则
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ]
      },
      {
        // 解决html 内img src路径问题
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        //图片解析打包
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=8192&name=./img/[name].[hash:6].[ext]',
      },
      {
        // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'file?name=./fonts/[name].[ext]',
      },
    ]
  },
  devServer: { //配置此静态文件服务器，可以用来预览打包后项目
    contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
    host: 'localhost', //主机地址
    port: 9090, //端口号
    compress: true, //开发服务器是否启动gzip等压缩
    open: true, // 开启浏览器
    hot: true, // 开启热更新
    publicPath: "/"
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, 'src/pages', 'index.html'), //模板
    //     filename: 'index.html',
    //     hash: true, //防止缓存
    //     minify: {
    //         removeAttributeQuotes: false //压缩 去掉引号
    //     },
    //     chunks: ['index']
    // }),
    // css配置
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      filename: 'css/[name].css',
    }),
    // 清空dist
    new CleanWebpackPlugin(['dist']),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 静态资源拷贝
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/static'),
      to: './static'
    }]),
  ],
  optimization,
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     cacheGroups: {
  //       // 提取 node_modules 中代码
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all"
  //       },
  //       commons: {
  //         // async 设置提取异步代码中的公用代码
  //         chunks: "async",
  //         name: 'commons-async',
  //         /**
  //          * minSize 默认为 30000
  //          * 想要使代码拆分真的按照我们的设置来
  //          * 需要减小 minSize
  //          */
  //         minSize: 0,
  //         // 至少为两个 chunks 的公用代码
  //         minChunks: 2
  //       },
  //       // styles: {
  //       //   name: 'styles',
  //       //   test: /\.(css|less)$/,
  //       //   chunks: 'all',
  //       //   enforce: true
  //       // }
  //     }
  //   },
  //   /**
  //    * 对应原来的 minchunks: Infinity
  //    * 提取 webpack 运行时代码
  //    * 直接置为 true 或设置 name
  //    */
  //   runtimeChunk: {
  //     name: 'manifest'
  //   }

  // }
}

webpack_config.plugins = webpack_config.plugins.concat(entryConfig.htmlWebpackPlugin());
module.exports = webpack_config

