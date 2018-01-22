const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(mp3|jpg|png|svg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" }
            }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"])
    ]
};
