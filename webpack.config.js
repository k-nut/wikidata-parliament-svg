const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: "./app/app.js",
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader",
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ]
};
