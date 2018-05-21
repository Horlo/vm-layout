const fs = require('fs');
const path = require("path");
const files = fs.readdirSync(path.resolve(__dirname, 'src/pages'));//这个同步读取带后缀的文件名数组
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry() {
    //入口动态注入
    let entry = {}
    files.forEach((file, index) => {
      let _file = file.replace('.html', '');
      entry[_file] = `./src/entry/${_file}.js`
    })
    return entry;
  },
  htmlWebpackPlugin() {
    //模板动态注入
    let arr = [];
    files.forEach((file, index) => {
      let _file = file.replace('.html', '');
      let obj = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages', file), //模板
        filename: file,
        hash: true, //防止缓存
        minify: {
          removeAttributeQuotes: false //压缩 去掉引号
        },
        chunks: [_file, 'vendors', 'commons-async','manifest']
      });
      arr.push(obj);
    })
    return arr;
  }
}

