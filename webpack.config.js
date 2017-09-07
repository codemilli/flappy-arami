/**
 * Created by hckrmoon on 7/30/17.
 */

const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const isProd = process.env.NODE_ENV === "production"


const webpackConfig = {
  entry: './static/js/dev/main.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [

  ]
}

if (isProd) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  )
} else {
}

module.exports = webpackConfig
