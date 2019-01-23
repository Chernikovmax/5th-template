const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css'
})

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({

  template: './src/index.html',
  filename: 'index.html',
  inject: true,
  title: '5th-template',
});

module.exports = {
  mode: 'development',
  entry: {
    app: './src/scripts/index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    library: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    CleanWebpackPluginConfig,
    HtmlWebpackPluginConfig,
    new webpack.HashedModuleIdsPlugin(),
    MiniCssExtractPluginConfig,
  ],
  devServer: {
  compress: true,
  port: 5000,
  },
};
