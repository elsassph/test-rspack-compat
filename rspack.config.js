const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
    concatenateModules: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          target: "es5",
          jsc: {
            externalHelpers: true,
          },
          env: {
            mode: "usage",
            coreJs: "3.37.1",
          },
        },
        type: "javascript/auto",
      },
      // {
      //   test: /\.js$/,
      //   include: [/@lightningjs/],
      //   loader: "builtin:swc-loader",
      //   options: {
      //     target: "es5",
      //     jsc: {
      //       externalHelpers: true,
      //     },
      //     env: {
      //       mode: "usage",
      //       coreJs: "3.37.1",
      //     },
      //   },
      //   type: "javascript/auto",
      // },
    ],
  },
  ignoreWarnings: [
    /the request of a dependency is an expression/,
    (warning) => true,
  ],
  plugins: [new HtmlWebpackPlugin()],
};
