const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
const env = dotenv.config();
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const paths = require("./tasks/path.config");

const checkBoolean = (str) => (str == "true" ? true : str == "false" || str == "" ? false : str);

const environment = process.env.NODE_ENV;
const mode = environment;
const devtool = environment === "development" ? checkBoolean(process.env.DEV_DEVTOOL) : checkBoolean(process.env.PRD_DEVTOOL);
const watch = environment === "development" ? checkBoolean(process.env.DEV_WATCH) : checkBoolean(process.env.PRD_WATCH);
const buildRoot = process.env.DEV_ROOT;
const development = process.env.NODE_ENV === "development";
const cssOutput = development ? "expanded" : "compressed";

module.exports = {
  stats: {
    // colors: false,
    hash: false,
    version: false,
    chunks: false,
    entrypoints: false,
    modules: false,
    assets: true,
  },
  mode,
  devtool: devtool,
  watch,
  entry: {
    "js/app": paths.src.js + "/index.js",
    "css/app": paths.src.css + "/app.scss",
  },
  output: {
    path: paths.dist.assets,
    filename: "./[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "string-replace-loader",
            options: {
              search: `/${buildRoot}/`,
              replace: "/",
              flags: "g",
            },
          },
          {
            loader: "glob-import-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: development,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      grid: true,
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "string-replace-loader",
            options: {
              search: `/${buildRoot}/`,
              replace: "/",
              flags: "g",
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: development,
              sassOptions: {
                outputStyle: cssOutput,
              },
              additionalData: (content, loaderContext) => {
                const { rootContext } = loaderContext;
                const sepConversion = rootContext.split(path.sep).join("/");
                content = content.replace(/"\/node_modules/g, '"' + sepConversion + "/node_modules");
                return content;
              },
            },
          },
          {
            loader: "glob-import-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "./[name].css",
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("DonePlugin", () => {
          console.log("");
        });
      },
    },
  ],
  target: ["web", "es5"],
};
