const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
});

const cleanPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // for webpack-dev-middleware
        // publicPath: '/',
        // One of the below
        // publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
        // publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
        // publicPath: '/assets/', // server-relative
        // publicPath: 'assets/', // relative to HTML page
        // publicPath: '../assets/', // relative to HTML page
        // publicPath: '', // relative to HTML page (same directory)
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                      loader: 'style-loader' // creates style nodes from JS strings
                    }, 
                    {
                      loader: 'css-loader' // translates CSS into CommonJS
                    }, 
                    {
                      loader: 'less-loader',options: { // compiles Less to CSS
                        strictMath: true,
                        //noIeCompat: false
                      }
                    }, 
                    {
                      loader: 'postcss-loader',options: {
                        sourceMap: true,
                        plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
                      }
                    }
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
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          // optipng.enabled: false will disable optipng
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: '65-90',
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          // the webp option will enable WEBP
                          webp: {
                            quality: 75
                          }
                        }
                      }
                ]
              },
              {
                 test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: [
                   'file-loader'
                 ]
            },
            {
              test: /\.(csv|tsv)$/,
              use: [
                'csv-loader'
              ]
            },
            {
              test: /\.xml$/,
              use: [
                'xml-loader'
              ]
            }
        ]
    },
    plugins: [
        cleanPlugin,
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};
