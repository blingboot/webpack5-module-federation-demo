
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    zLib: "./src/utils.js"
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "zLib",
      library: { type: "var", name: "zLib" },
      filename: "zLib.js",
      exposes: {
        utils: "./src/utils.js"
      }
    })
  ]
}