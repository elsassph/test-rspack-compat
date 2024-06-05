const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  // mode: "development",
  mode: "production",
  entry: "./src/index.ts",
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    maxEntrypointSize: 100 * 1024,
    maxAssetSize: 100 * 1024,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/render-drivers/, (data) => {
      if (data.dependencies.length > 0) {
        delete data.dependencies[0].critical;
      }
      return data;
    }),
    new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
};
