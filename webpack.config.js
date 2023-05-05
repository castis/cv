const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.ts", "./src/index.scss"],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target: "es6",
              module: "es2015",
            },
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "index.css" }),
    new CopyPlugin({ patterns: [{ from: "./public/" }] }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },
  optimization: {
    minimize: false,
    runtimeChunk: false,
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    iife: false,
  },
};
