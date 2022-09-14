const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],

  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },

  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    // },
    // runtimeChunk: 'single',
  },
};