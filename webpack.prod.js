const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
 const TerserPlugin = require('terser-webpack-plugin');
 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({}),
      '...',
    ],
  },
});
