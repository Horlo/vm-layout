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
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 9192,
            name: 'imgs/[name].[ext]'
          }
        }]
      },
      {
        // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
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
}

webpack_config.plugins = webpack_config.plugins.concat(entryConfig.htmlWebpackPlugin());
module.exports = webpack_config

