const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
// const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        /* new CompressionPlugin({
            test: /\.(png|mp3|js|css|html)$/,
            include: /\/src/,
            exclude: /\/node_modules/,
            cache: true,
            algorithm: "gzip",
            minRatio: 0.8
        }), 
        new webpack.optimize.ModuleConcatenationPlugin() */
	new UglifyJsPlugin({
		sourceMap: true
	})
    ]
});
