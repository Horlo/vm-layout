const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
  runtimeChunk: {
    name: 'manifest'
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin() // use OptimizeCSSAssetsPlugin
  ],
  splitChunks: {
    cacheGroups: {
      common: {
        chunks: "initial",
        name: "common",
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0
      },
      vendor: {
        test: /node_modules/,
        chunks: "initial",
        name: "vendor",
        priority: 10,
        enforce: true      
      }
    }
  }
}
