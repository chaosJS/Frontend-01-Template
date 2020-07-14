const path = require('path')
module.exports = {
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'create' }]
            ]
          }
        }
      }
    ]
  },
  mode: 'development',
  optimization: {
    minimize: false
  },
  devServer: {
    // 只在内存中打包运行
    port: 3000,
    // hmr
    hot: true,
    open: true
  }
}
