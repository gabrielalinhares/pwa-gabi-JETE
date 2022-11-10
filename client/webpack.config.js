const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // adding pluggings
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        short_name: "JATE",
        name: "Just Another Text Editor",
        description: "PWA Text editor that can be used offline ",
        background_color: "#92b7e4",
        theme_color: "#245da3",
        publicPath: "/",
        start_url: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // finish pluggings
    ],

    module: {
      rules: [
        // adding rules
        new InjectManifest({
          swSrc: "./src-sw.js",
          swDest: "service-worker.js",
        }),
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },

        // end rules
      ],
    },
  };
};
