const config = require("./config");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const postcssAspectRatioMini = require("postcss-aspect-ratio-mini");
const postcssPxToViewport = require("postcss-px-to-viewport");
const postcssRetina = require("postcss-retina");
const postcssViewportUnits = require("postcss-viewport-units");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "chunk.[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]-[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: "postcss",
            options: {
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 3 versions",
                    "iOS >= 7",
                    "Android >= 4.1",
                    "ie >= 6",
                    "Firefox >= 20",
                    "Chrome >= 20",
                    "Safari >=2",
                    "Opera >=20"
                  ]
                }),
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: config.viewportWidth, // (Number) The width of the viewport.
                  viewportHeight: config.viewportHeight, // (Number) The height of the viewport.
                  unitPrecision: config.unitPrecision, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: config.viewportUnit, // (String) Expected units.
                  selectorBlackList: config.selectorBlackList, // (Array) The selectors to ignore and leave as px.
                  minPixelValue: config.minPixelValue, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: config.mediaQuery // (Boolean) Allow px to be converted in media queries.
                }),
                postcssRetina(),
                postcssPresetEnv(/* options */),
                postcssViewportUnits({})
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              strictMath: true
              //noIeCompat: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]-[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: "postcss",
            options: {
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 3 versions",
                    "iOS >= 7",
                    "Android >= 4.1",
                    "ie >= 6",
                    "Firefox >= 20",
                    "Chrome >= 20",
                    "Safari >=2",
                    "Opera >=20"
                  ]
                }),
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: config.viewportWidth, // (Number) The width of the viewport.
                  viewportHeight: config.viewportHeight, // (Number) The height of the viewport.
                  unitPrecision: config.unitPrecision, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: config.viewportUnit, // (String) Expected units.
                  selectorBlackList: config.selectorBlackList, // (Array) The selectors to ignore and leave as px.
                  minPixelValue: config.minPixelValue, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: config.mediaQuery // (Boolean) Allow px to be converted in media queries.
                }),
                postcssRetina(),
                postcssPresetEnv(/* options */),
                postcssViewportUnits({})
              ]
            }
          }
        ]
      }
    ]
  }
});
