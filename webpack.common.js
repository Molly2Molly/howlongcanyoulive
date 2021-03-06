const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

require("dotenv").config();

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  favicon: "./public/favicon.ico"
});

const cleanPlugin = new CleanWebpackPlugin(["dist/client"]);

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "[name].[hash:8].bundle.js",
    //chunkFilename: "[name].[hash:8].[chunkhash].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/client")
    // for webpack-dev-middleware
    // One of the below
    // publicPath: './',
    // publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
    // publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
    // publicPath: '/assets/', // server-relative
    // publicPath: 'assets/', // relative to HTML page
    // publicPath: '../assets/', // relative to HTML page
    // publicPath: '', // relative to HTML page (same directory)
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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
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
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  },
  plugins: [
    cleanPlugin,
    htmlPlugin,
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
