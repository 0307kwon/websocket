const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  devServer: {
    compress: true,
    hot: true,
    port: 9000,
  },
  plugins: [new BundleAnalyzerPlugin()],
});
