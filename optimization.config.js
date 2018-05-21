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
    new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin
  ],
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: false,
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'initial',
        priority: -10,
        reuseExistingChunk: false,
        test: /node_modules\/(.*)\.js/
      },
      styles: {
        name: 'app.style',
        test: /\.(less|css)$/,
        chunks: 'all',
        minChunks: 1,
        reuseExistingChunk: true,
        enforce: true
      }
    }
  }
}

