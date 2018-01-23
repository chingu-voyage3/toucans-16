const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRootPlugin = require("html-webpack-react-root-plugin");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
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
	new HtmlWebpackPlugin({
      		title: "MomenClone",
      		filename: "index.html",
		chunks: ["main", "common"]
    	}),
	new ReactRootPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
		name: "common"
        })
    ]
};
