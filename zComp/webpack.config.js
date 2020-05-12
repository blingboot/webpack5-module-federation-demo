const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    'zComp': "./src/index"
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:7788/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
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
      chunks: ['zComp']
    }),
    new ModuleFederationPlugin({
      name: "zCompRemote",
      library: { type: "var", name: "zComp" },
      filename: "zComp-remote-entry.js",
      exposes: {
        myButton: "./src/myButton.vue",
        EleInput: './node_modules/element-ui/packages/input/src/input.vue'
      },
      remotes: {
        zLib: 'zLib'
      },
      shared: ['vue']
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "../"),
    port: 7788,
    open: !true
  }
}