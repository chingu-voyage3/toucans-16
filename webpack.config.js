const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?https://localhost:8080",
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
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
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
        }
        ]
    }
};
