
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: 'index.html',
      chunks: ['app']
    }),
    new ModuleFederationPlugin({
      name: "appRemote",
      remotes: {
        zComp: 'zComp'
      },
      shared: ['vue']
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "../"),
    port: 9988,
    open: !true
  }
}