const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  entry: "./src/main.js",
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [CssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyPlugin({ patterns: [{ from: "./src/public", to: "public/" }] }),
    new CssExtractPlugin(),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool:
    process.env.NODE_ENV === "production" ? "hidden-source-map" : "source-map",
};
