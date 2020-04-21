const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    'zComp': "./src/main"
  },
  output: {
    filename: '[name].js',
    publicPath: '/zComp/dist/'
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
    new ModuleFederationPlugin({
      name: "zComp",
      library: { type: "var", name: "zComp" },
      filename: "zComp.js",
      exposes: {
        myButton: "./src/myButton.vue",
        myInput: './src/myInput.vue'
      },
      shared: ['vue']
    })
  ]
}