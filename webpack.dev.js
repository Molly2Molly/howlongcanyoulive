const config = require("./config");
const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const autoprefixer = require("autoprefixer");
const postcssAspectRatioMini = require("postcss-aspect-ratio-mini");
const postcssPxToViewport = require("postcss-px-to-viewport");
const postcssRetina = require("postcss-retina");
const postcssViewportUnits = require("postcss-viewport-units");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist/client"),
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
            loader: "style-loader"
          },
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
              sourceMap: true,
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
          "style-loader",
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
              sourceMap: true,
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
