const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader' 
            },
            {
              loader: 'postcss-loader',options: {
                plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
              }
            },
            {
              loader: 'less-loader',options: {
                strictMath: true,
                //noIeCompat: false
              }
            }, 
        ]
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',options: {
                plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
              },
            },
        ]
      },
    ]
  },
});