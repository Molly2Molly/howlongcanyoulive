const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      hot: true,
      historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
            {
              loader: 'style-loader' 
            }, 
            {
              loader: 'css-loader' 
            }, 
            {
              loader: 'postcss-loader',options: {
                sourceMap: true,
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
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',options: {
              sourceMap: true,
              plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
            }
        }
        ]
      },
    ]
  },
});