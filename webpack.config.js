const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css'
})

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);

const CopyPlugin = require('copy-webpack-plugin');
const CopyPluginConfig = new CopyPlugin([
  {
    from: './src/imgs/',
    to: 'media/imgs/',
    toType: 'dir',
  },
  {
    from: './src/icons/',
    to: 'media/icons/',
    toType: 'dir',
  },
  {
    from: './src/favicon.ico',
    to: 'media/favicon.ico',
  },
]);


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  chunks: ['app'],
  template: './src/index.html',
  filename: 'index.html',
  inject: true,
  title: '5th-template',
});
const HtmlWebpackPluginConfigGallery = new HtmlWebpackPlugin({
  chunks: ['gallery'],
  template: './src/gallery.html',
  filename: 'gallery.html',
  inject: true,
  title: 'Gallery',
});
const HtmlWebpackPluginConfigGame = new HtmlWebpackPlugin({
  chunks: ['game'],
  template: './src/game.html',
  filename: 'game.html',
  inject: true,
  title: 'Game',
});

module.exports = {
  mode: 'development',
  entry: {
    app: './src/scripts/index.js',
    gallery: './src/scripts/gallery/gallery.js',
    game: './src/scripts/game/game.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    library: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {loader: "babel-loader"}
      },
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
    HtmlWebpackPluginConfigGallery,
    HtmlWebpackPluginConfigGame,
    new webpack.HashedModuleIdsPlugin(),
    MiniCssExtractPluginConfig,
    CopyPluginConfig
  ],
  devServer: {
    compress: true,
    port: 5000,
  },
};
