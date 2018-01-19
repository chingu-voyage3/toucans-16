const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "cheap-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new CompressionPlugin({
            test: /\.(png|mp3|js|css|html)$/,
            include: /\/src/,
            exclude: /\/node_modules/,
            cache: true,
            algorithm: "gzip",
            minRatio: 0.8
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
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
    }
};
