const path = require('path')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    zLib: "./src/index"
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:8888/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "zLibRemote",
      library: { type: "var", name: "zLib" },
      filename: "zLib-remote-entry.js",
      exposes: {
        utils: "./src/utils.js"
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "../"),
    port: 8888,
    open: !true
  }
}